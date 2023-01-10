package ru.kata.spring.boot_security.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserDao userDao;
    private final RoleDao roleDao;

    @Autowired
    public UserServiceImpl(UserDao userDao, RoleDao roleDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;

    }

    @Override
    public List<User> getUsers() {
        return userDao.listUsers();
    }

    @Override
    public void addUser(User user) {

        user.setRoles(user.getRoles().stream().map(role -> roleDao.getRoleByName(role.getName())).collect(Collectors.toSet()));
        System.out.println(user.getRoles());
        userDao.add(user);

    }

    @Override
    public User getUserById(Long id) {
        return userDao.getUserById(id);
    }

    @Override
    public void changeUser(User user) {
        user.setRoles(user.getRoles().stream().map(role -> roleDao.getRoleByName(role.getName())).collect(Collectors.toSet()));
        System.out.println(user.getRoles());
        userDao.changeUser(user);
    }

    @Override
    public void deleteUser(Long id) {
        userDao.deleteUser(id);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.getUserByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return (UserDetails) user;
    }
}
