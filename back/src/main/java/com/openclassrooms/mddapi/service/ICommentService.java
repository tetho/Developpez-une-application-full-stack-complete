package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.openclassrooms.mddapi.dto.CommentDTO;

public interface ICommentService {

	public CommentDTO getCommentById(Long id);
	
	public List<CommentDTO> getCommentsByPostId(Long postId);
	
	public CommentDTO createComment(CommentDTO commentDTO, Authentication authentication);
	
	public CommentDTO updateComment(Long id, CommentDTO commentDTO);
	
	public void deleteComment(Long id);
}
