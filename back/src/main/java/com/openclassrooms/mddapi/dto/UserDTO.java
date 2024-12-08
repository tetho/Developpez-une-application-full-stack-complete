package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class UserDTO {

	@JsonProperty("user_id")
    private Long id;
    
    private String username;
 
    private String email;
    
	private String password;
    
	private List<TopicDTO> topics;
	
    @JsonProperty("created_at")
	private LocalDateTime createdAt;
	
	@JsonProperty("updated_at")
	private LocalDateTime updatedAt;
}
