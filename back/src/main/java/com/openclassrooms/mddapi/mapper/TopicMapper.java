package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.model.Topic;

@Mapper
public interface TopicMapper {

	TopicMapper INSTANCE = Mappers.getMapper(TopicMapper.class);

	TopicDTO toDTO(Topic topic);
    
	Topic toEntity(TopicDTO topicDTO);
}
