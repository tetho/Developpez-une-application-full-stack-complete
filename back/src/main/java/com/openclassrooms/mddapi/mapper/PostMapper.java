package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.model.Post;

@Mapper
public interface PostMapper {

	PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

	@Mapping(source = "user.id", target = "userId")
    @Mapping(source = "topic.id", target = "topicId")
	PostDTO toDTO(Post post);
    
	@Mapping(source = "userId", target = "user.id")
    @Mapping(source = "topicId", target = "topic.id")
	Post toEntity(PostDTO postDTO);
}
