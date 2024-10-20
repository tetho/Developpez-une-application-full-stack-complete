package com.openclassrooms.mddapi.service;

import java.util.List;
import com.openclassrooms.mddapi.dto.CommentDTO;

public interface ICommentService {

	public CommentDTO getCommentById(Long id);
	
	public List<CommentDTO> getCommentsByPost(Long postId);
	
	public CommentDTO createComment(CommentDTO commentDTO);
	
	public void deleteComment(Long id);
}
