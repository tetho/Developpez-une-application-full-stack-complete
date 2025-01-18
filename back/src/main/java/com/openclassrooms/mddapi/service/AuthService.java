package com.openclassrooms.mddapi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.UserDTO;

@Service
public class AuthService implements IAuthService {

    private final IUserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    public AuthService(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean authenticate(String emailOrUsername, String password) {
        Optional<UserDTO> optionalUser = userService.findByEmailOrUsername(emailOrUsername);
        if (optionalUser.isPresent()) {
            UserDTO user = optionalUser.get();
            return passwordEncoder.matches(password, user.getPassword());
        } else {
            throw new RuntimeException("Authentication failed: User not found.");
        }
    }

    @Override
    public void register(UserDTO user) {
        if (user == null || user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Registration failed: Invalid user data or password.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try {
            userService.createUser(user);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred during user registration: " + e.getMessage(), e);
        }
    }
}
