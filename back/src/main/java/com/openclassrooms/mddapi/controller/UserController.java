package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.service.IUserService;

@RestController
@RequestMapping("/users")
public class UserController {

	private IUserService userService;
	
	@Autowired
	public UserController(IUserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/{id}")
	public UserDTO getUserById(@PathVariable Long id) {
		return this.userService.getUserById(id);
	}
}
