package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Lob;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class PostDTO {

	@JsonProperty("post_id")
	private Long id;
	
	private String title;
	
	@Lob
    private String content;
    
    @JsonProperty("user_id")
    private Long userId;
    
    @JsonProperty("topic_id")
    private Long topicId;
    
    private List<CommentDTO> comments;
	
	@JsonProperty("created_at")
	private LocalDateTime createdAt;
	
	@JsonProperty("updated_at")
	private LocalDateTime updatedAt;
}
