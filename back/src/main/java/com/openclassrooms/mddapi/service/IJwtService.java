package com.openclassrooms.mddapi.service;

import org.springframework.security.core.Authentication;

public interface IJwtService {

	public String generateToken(Authentication authentication);
}
