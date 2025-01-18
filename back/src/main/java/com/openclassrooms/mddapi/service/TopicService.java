package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.stream.Collectors;
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
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic with ID " + id + " not found"));
        return topicMapper.toDTO(topic);
    }

    @Override
    public List<TopicDTO> getTopics() {
        List<Topic> topics = topicRepository.findAll();
        if (topics.isEmpty()) {
            throw new RuntimeException("No topics found");
        }
        return topics.stream().map(topicMapper::toDTO)
                     .collect(Collectors.toList());
    }

    @Override
    public TopicDTO createTopic(TopicDTO topicDTO) {
        if (topicDTO.getName() == null || topicDTO.getName().isEmpty()) {
            throw new RuntimeException("Topic name cannot be empty");
        }
        Topic topic = topicMapper.toEntity(topicDTO);
        Topic savedTopic = topicRepository.save(topic);
        return topicMapper.toDTO(savedTopic);
    }
    
    @Override
    public TopicDTO updateTopic(Long id, TopicDTO topicDTO) {
        if (topicDTO.getName() == null || topicDTO.getName().isEmpty()) {
            throw new RuntimeException("Topic name cannot be empty");
        }

        Topic existingTopic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic with ID " + id + " not found"));

        existingTopic.setName(topicDTO.getName());
        existingTopic.setDescription(topicDTO.getDescription());
        Topic updatedTopic = topicRepository.save(existingTopic);
        return topicMapper.toDTO(updatedTopic);
    }
    
    @Override
    public void deleteTopic(Long id) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic with ID " + id + " not found"));
        topicRepository.delete(topic);
    }
}
