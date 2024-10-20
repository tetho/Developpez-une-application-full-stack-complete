package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class UserDTO {

	@JsonProperty("user_id")
    private Long id;
    
    private String username;
 
    private String email;
    
    private String role;
    
	@JsonProperty("created_at")
	private LocalDateTime createdAt;
	
	@JsonProperty("updated_at")
	private LocalDateTime updatedAt;
}
