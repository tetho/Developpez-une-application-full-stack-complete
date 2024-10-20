package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.model.Post;

@Mapper
public interface PostMapper {

	PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

	PostDTO toDTO(Post post);
    
	Post toEntity(PostDTO postDTO);
}
