package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.dto.UserDTO;

public interface IUserService {

	public Optional<UserDTO> findByEmail(String email);
	
	public Optional<UserDTO> findByUsername(String username);
	
	public Optional<UserDTO> findByEmailOrUsername(String emailOrUsername);
	
	public UserDTO getUserById(Long id);
	
	public List<UserDTO> getAllUsers();
	
	public UserDTO createUser(UserDTO userDTO);
	
	public UserDTO updateUser(Long id, UserDTO userDTO);
	
	public void deleteUser(Long id);
}
