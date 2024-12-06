package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.dto.PostDTO;

public interface IPostService {

	public PostDTO getPostById(Long id);
	
	public List<PostDTO> getPosts();
	
	public List<PostDTO> getPostsByTopicId(Long topicId);
	
	public PostDTO createPost(PostDTO postDTO);
	
	public PostDTO updatePost(Long id, PostDTO postDTO);
	
	public void deletePost(Long id);
}
