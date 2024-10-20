package com.openclassrooms.mddapi.service;

import java.util.List;
import com.openclassrooms.mddapi.dto.TopicDTO;

public interface ITopicService {

	public TopicDTO getTopicById(Long id);
	
	public List<TopicDTO> getTopics();

	public TopicDTO createTopic(TopicDTO topicDTO);
	
	public void deleteTopic(final Long id);
}
