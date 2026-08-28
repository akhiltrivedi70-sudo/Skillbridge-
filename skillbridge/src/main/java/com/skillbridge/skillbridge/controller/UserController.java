package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.User;
import com.skillbridge.skillbridge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {
        Optional<User> user = userService.loginUser(loginData.get("email"), loginData.get("password"));
        if (user.isPresent()) {
            return "Login successful! Welcome " + user.get().getName();
        }
        return "Invalid email or password";
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}