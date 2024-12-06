package com.openclassrooms.mddapi.dto;

import lombok.Data;

@Data
public class AuthDTO {

	private String emailOrUsername;
	
	private String password;
}
