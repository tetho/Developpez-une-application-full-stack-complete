package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class CommentDTO {

	@JsonProperty("comment_id")
	private Long id;
	
	@JsonProperty("post_id")
	private Long postId;
	
	@JsonProperty("user_id")
    private Long userId;
	
	private String text;
	
	@JsonProperty("created_at")
	private LocalDateTime createdAt;
	
	@JsonProperty("updated_at")
	private LocalDateTime updatedAt;
}
