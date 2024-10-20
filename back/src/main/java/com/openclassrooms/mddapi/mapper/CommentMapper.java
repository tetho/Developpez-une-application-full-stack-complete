package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.model.Comment;

@Mapper
public interface CommentMapper {

	CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

	CommentDTO toDTO(Comment comment);
    
	Comment toEntity(CommentDTO commentDTO);
}
