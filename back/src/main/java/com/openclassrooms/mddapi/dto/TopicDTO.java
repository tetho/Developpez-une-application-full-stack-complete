package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TopicDTO {

	@JsonProperty("topic_id")
	private Long id;
	
	private String name;
	
    private List<PostDTO> posts;
	
	@JsonProperty("created_at")
	private LocalDateTime createdAt;
	
	@JsonProperty("updated_at")
	private LocalDateTime updatedAt;
}
