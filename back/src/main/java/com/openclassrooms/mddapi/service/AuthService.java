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
            return false;
        }
	}

	@Override
	public void register(UserDTO user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.createUser(user);
	}
    
}
