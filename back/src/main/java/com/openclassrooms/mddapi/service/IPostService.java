package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.openclassrooms.mddapi.dto.PostDTO;

public interface IPostService {

	public PostDTO getPostById(Long id);
	
	public List<PostDTO> getPosts();
	
	public List<PostDTO> getPostsByTopicId(Long topicId);
	
	public List<PostDTO> getPostsForSubscribedTopics(Authentication authentication);
	
	public PostDTO createPost(PostDTO postDTO, Authentication authentication);
	
	public PostDTO updatePost(Long id, PostDTO postDTO);
	
	public void deletePost(Long id);
}
