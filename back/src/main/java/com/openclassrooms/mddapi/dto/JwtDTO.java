package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class JwtDTO {
	
	private String token;
	
	private UserDTO user;
}
