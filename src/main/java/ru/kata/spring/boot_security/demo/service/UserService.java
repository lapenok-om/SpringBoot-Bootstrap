package ru.kata.spring.boot_security.demo.service;


import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getUsers();
    void addUser(User user);
    User getUserById(Long id);
    void changeUser(User user);
    void deleteUser(Long id);
}
