package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
public class TopicService implements ITopicService {

	@Autowired
    private TopicRepository topicRepository;

    private final TopicMapper topicMapper = TopicMapper.INSTANCE;

    @Override
    public TopicDTO getTopicById(Long id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        return topicMapper.toDTO(topic);
    }

    @Override
    public List<TopicDTO> getTopics() {
        List<Topic> topics = topicRepository.findAll();
        return topics.stream().map(topicMapper::toDTO)
                     .collect(Collectors.toList());
    }

    @Override
    public TopicDTO createTopic(TopicDTO topicDTO) {
        Topic topic = topicMapper.toEntity(topicDTO);
        Topic savedTopic = topicRepository.save(topic);
        return topicMapper.toDTO(savedTopic);
    }
    
    @Override
    public void deleteTopic(Long id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new RuntimeException("Topic not found"));
        topicRepository.delete(topic);
    }
}
