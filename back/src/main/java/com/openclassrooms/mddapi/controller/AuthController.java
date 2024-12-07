package com.openclassrooms.mddapi.controller;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.AuthDTO;
import com.openclassrooms.mddapi.dto.JwtDTO;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.service.AuthService;
import com.openclassrooms.mddapi.service.JwtService;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService;
	private final JwtService jwtService;
	private final UserService userService;

	@Autowired
	public AuthController(AuthService authService, JwtService jwtService, UserService userService) {
		this.authService = authService;
		this.jwtService = jwtService;
		this.userService = userService;
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserDTO user, BindingResult result) {
		if (result.hasErrors()) {
			String errorMessages = result.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
			return new ResponseEntity<>(errorMessages, HttpStatus.BAD_REQUEST);
		} else {
			authService.register(user);
			Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
			String token = jwtService.generateToken(authentication);
			JwtDTO jwtDTO = new JwtDTO();
			jwtDTO.setToken(token);
			return ResponseEntity.ok(jwtDTO);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody AuthDTO user) {
		boolean isAuthenticated = authService.authenticate(user.getUsername(), user.getPassword());
		if (isAuthenticated) { 
			Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
			String token = jwtService.generateToken(authentication);
			JwtDTO jwtDTO = new JwtDTO();
			jwtDTO.setToken(token);
			return ResponseEntity.ok(jwtDTO);
		} else {
			return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
		}
	}
	
	@GetMapping("/me")
	public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
		String emailOrUsername = authentication.getName();
        Optional<UserDTO> optionalUserDTO = userService.findByEmailOrUsername(emailOrUsername);
        if (optionalUserDTO.isPresent()) {
            UserDTO userDTO = optionalUserDTO.get();
            return ResponseEntity.ok(userDTO);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}