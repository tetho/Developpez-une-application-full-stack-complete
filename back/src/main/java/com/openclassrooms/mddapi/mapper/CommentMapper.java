package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.model.Comment;

@Mapper
public interface CommentMapper {

	CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

	@Mapping(source = "user.id", target = "userId")
    @Mapping(source = "post.id", target = "postId")
	CommentDTO toDTO(Comment comment);
    
	@Mapping(source = "userId", target = "user.id")
    @Mapping(source = "postId", target = "post.id")
	Comment toEntity(CommentDTO commentDTO);
}
