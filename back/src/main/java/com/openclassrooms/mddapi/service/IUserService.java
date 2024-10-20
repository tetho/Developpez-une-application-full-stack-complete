package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.model.User;

public interface IUserService {

	public Optional<UserDTO> findByEmail(String email);
	
	public UserDTO getUserById(Long id);
	
	public List<UserDTO> getAllUsers();
	
	public UserDTO createUser(UserDTO userDTO);
	
	public void deleteUser(Long id);
}
