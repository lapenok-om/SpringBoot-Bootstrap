package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public String printUsers(Model model, @AuthenticationPrincipal User principal) {

        model.addAttribute("userPrincipal", principal);
        model.addAttribute("user", new User());
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("userNew", new User());
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin";
    }

    @PostMapping("/new")
    public String create(@ModelAttribute("userNew") User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getRoles());
        userService.addUser(user);
        return "redirect:/admin";
    }

    @PatchMapping("/edit")
    public String change(@ModelAttribute("user") User user) {
        if(!user.getPassword().equals(userService.getUserById(user.getId()).getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userService.changeUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
