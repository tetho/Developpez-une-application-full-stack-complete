package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.PostRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class PostService implements IPostService {

	@Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    private final PostMapper postMapper = PostMapper.INSTANCE;

    @Override
    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return postMapper.toDTO(post);
    }

    @Override
    public List<PostDTO> getPostsByTopic(Long topicId) {
        List<Post> posts = postRepository.findByTopicId(topicId);
        return posts.stream().map(postMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public PostDTO createPost(PostDTO postDTO) {
        Post post = postMapper.toEntity(postDTO);
        User user = userRepository.findById(postDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Topic topic = topicRepository.findById(postDTO.getTopicId()).orElseThrow(() -> new RuntimeException("Topic not found"));
        post.setUser(user);
        post.setTopic(topic);
        Post savedPost = postRepository.save(post);
        return postMapper.toDTO(savedPost);
    }
    
    @Override
    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}
