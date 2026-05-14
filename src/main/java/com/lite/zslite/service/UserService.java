package com.lite.zslite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.User;
import com.lite.zslite.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String register(User user) {
        if (userRepository.existsByemail(user.getEmail())) {
            return "Error: Email is already registered";
        }
        userRepository.save(user);
        return "User registered sucessfully!";
    }

    public List<User> getalluser() {
        return userRepository.findAll();

    }

    public User getUser(int uid) {
        return userRepository.findById(uid);
    }

    public String updateUser(User user, int uid) {
        if (userRepository.findById(uid) != null) {
            user.setId(uid); // ADD THIS: Forces Hibernate to update the existing ID rather than creating a
            // new one
            userRepository.save(user);
            return "Updated sucessfully!";
        }
        return "No User found.";
    }

    public User getUserByMail(String email) {
        return userRepository.findByEmail(email);
    }

    public String deleteUser(int id) {
        User user = userRepository.findById(id);
        if (user != null) {
            userRepository.delete(user);
            return "User deleted sucessfully";
        }
        return "Unable to delete user";
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

}
