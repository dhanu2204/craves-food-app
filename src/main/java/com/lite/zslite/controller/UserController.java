package com.lite.zslite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.lite.zslite.models.User;
import com.lite.zslite.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.register(user);
    }

    @GetMapping("user")
    public List<User> getallUser() {
        return userService.getalluser();
    }

    @GetMapping("user/{id}")
    public User getUserById(@PathVariable("id") int uid) {
        return userService.getUser(uid);
    }

    @PostMapping("user/{id}")
    public String updatUser(@RequestBody User user, @PathVariable("id") int uid) {
        return userService.updateUser(user, uid);
    }

    @GetMapping("user/email/{email}")
    public User getUserByMail(@PathVariable("email") String email) {
        return userService.getUserByMail(email);
    }

    @DeleteMapping("user/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getEmail(), user.getPassword());
    }
}
