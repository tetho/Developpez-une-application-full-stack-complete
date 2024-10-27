package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.UserDTO;

public interface IAuthService {

	public boolean authenticate(String email, String password);
	
	public void register(UserDTO user);
}
