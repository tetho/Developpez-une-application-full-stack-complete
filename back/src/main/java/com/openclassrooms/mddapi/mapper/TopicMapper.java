package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;

@Mapper
public interface TopicMapper {

	TopicMapper INSTANCE = Mappers.getMapper(TopicMapper.class);

    @Mapping(source = "description", target = "description")
	TopicDTO toDTO(Topic topic);
    
    @Mapping(source = "description", target = "description")
	Topic toEntity(TopicDTO topicDTO);
}
