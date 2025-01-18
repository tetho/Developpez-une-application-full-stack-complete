package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    private final CommentMapper commentMapper = CommentMapper.INSTANCE;

    @Override
    public CommentDTO getCommentById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        return commentMapper.toDTO(comment);
    }

    @Override
    public List<CommentDTO> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        if (comments.isEmpty()) {
            throw new RuntimeException("No comments found for this post.");
        }
        return comments.stream().map(commentMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public CommentDTO createComment(CommentDTO commentDTO, Authentication authentication) {
        if (commentDTO == null || commentDTO.getText() == null || commentDTO.getText().isEmpty()) {
            throw new RuntimeException("Invalid comment data.");
        }
        
        Comment comment = commentMapper.toEntity(commentDTO);
        Post post = postRepository.findById(commentDTO.getPostId()).orElseThrow(() -> new RuntimeException("Post not found"));
        
        String emailOrUsername = authentication.getName();
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        comment.setPost(post);
        comment.setUser(user);
        Comment savedComment = commentRepository.save(comment);
        
        return commentMapper.toDTO(savedComment);
    }

    @Override
    public CommentDTO updateComment(Long id, CommentDTO commentDTO) {
        if (commentDTO == null || commentDTO.getText() == null || commentDTO.getText().isEmpty()) {
            throw new RuntimeException("Invalid comment data.");
        }
        
        Comment existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        
        existingComment.setText(commentDTO.getText());
        Comment updatedComment = commentRepository.save(existingComment);
        
        return commentMapper.toDTO(updatedComment);
    }

    @Override
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        commentRepository.delete(comment);
    }
}
