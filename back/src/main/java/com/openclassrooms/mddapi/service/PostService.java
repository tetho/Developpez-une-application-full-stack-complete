package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.PostDTO;
import com.openclassrooms.mddapi.dto.TopicDTO;
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

    @Autowired
    private UserService userService;
    
    private final PostMapper postMapper = PostMapper.INSTANCE;

    @Override
    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        return postMapper.toDTO(post);
    }

    @Override
    public List<PostDTO> getPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(postMapper::toDTO)
                     .collect(Collectors.toList());
    }
    
    @Override
    public List<PostDTO> getPostsByTopicId(Long topicId) {
        List<Post> posts = postRepository.findByTopicId(topicId);
        return posts.stream().map(postMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<PostDTO> getPostsForSubscribedTopics(Authentication authentication, String sortOrder) {
        List<TopicDTO> subscribedTopics = userService.getSubscribedTopics(authentication);
        List<Long> subscribedTopicIds = subscribedTopics.stream()
                .map(TopicDTO::getId)
                .collect(Collectors.toList());
        List<Post> posts = postRepository.findByTopicIdIn(subscribedTopicIds);
        if ("desc".equalsIgnoreCase(sortOrder)) {
            posts.sort((p1, p2) -> p2.getUpdatedAt().compareTo(p1.getUpdatedAt()));
        } else {
            posts.sort((p1, p2) -> p1.getUpdatedAt().compareTo(p2.getUpdatedAt()));
        }
        return posts.stream()
                    .map(postMapper::toDTO)
                    .collect(Collectors.toList());
    }
    
    @Override
    public PostDTO createPost(PostDTO postDTO, Authentication authentication) {
        Post post = postMapper.toEntity(postDTO);
        String emailOrUsername = authentication.getName();
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User not found"));
        Topic topic = topicRepository.findById(postDTO.getTopicId()).orElseThrow(() -> new RuntimeException("Topic not found"));
        post.setUser(user);
        post.setTopic(topic);
        Post savedPost = postRepository.save(post);
        return postMapper.toDTO(savedPost);
    }
    
    @Override
    public PostDTO updatePost(Long id, PostDTO postDTO) {
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        existingPost.setTitle(postDTO.getTitle());
        existingPost.setContent(postDTO.getContent());
        Post updatedPost = postRepository.save(existingPost);
        return postMapper.toDTO(updatedPost);
    }
    
    @Override
    public void deletePost(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}
