package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;
    
    private final UserMapper userMapper = UserMapper.INSTANCE;
    private final TopicMapper topicMapper = TopicMapper.INSTANCE;

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User with email " + email + " not found");
        }
        return user.map(userMapper::toDTO);
    }
    
    @Override
    public Optional<UserDTO> findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new RuntimeException("User with username " + username + " not found");
        }
        return user.map(userMapper::toDTO);
    }
    
    @Override
    public Optional<UserDTO> findByEmailOrUsername(String emailOrUsername) {
        Optional<User> userByEmail = userRepository.findByEmail(emailOrUsername);
        if (userByEmail.isPresent()) {
            return userByEmail.map(userMapper::toDTO);
        } else {
            Optional<User> userByUsername = userRepository.findByUsername(emailOrUsername);
            if (userByUsername.isEmpty()) {
                throw new RuntimeException("User with email or username " + emailOrUsername + " not found");
            }
            return userByUsername.map(userMapper::toDTO);
        }
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
        return userMapper.toDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new RuntimeException("No users found");
        }
        return users.stream().map(userMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.toEntity(userDTO);
        if (!isPasswordValid(userDTO.getPassword())) {
            throw new RuntimeException("The password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.");
        }
        User savedUser = userRepository.save(user);
        return userMapper.toDTO(savedUser);
    }

    @Override
    public UserDTO updateUser(Authentication authentication, UserDTO userDTO) {
        String emailOrUsername = authentication.getName();
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User with authentication " + emailOrUsername + " not found"));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        User updatedUser = userRepository.save(user);
        return userMapper.toDTO(updatedUser);
    }

    @Override
    public UserDTO updateUser(String emailOrUsername, UserDTO userDTO) {
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User with email or username " + emailOrUsername + " not found"));
        
        if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getUsername() != null && !userDTO.getUsername().equals(user.getUsername())) {
            user.setUsername(userDTO.getUsername());
        }
        User updatedUser = userRepository.save(user);
        return userMapper.toDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User with ID " + id + " not found"));
        userRepository.delete(user);
    }
    
    private boolean isPasswordValid(String password) {
        String regex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        return password.matches(regex);
    }
    
    @Override
    public List<TopicDTO> getSubscribedTopics(Authentication authentication) {
        String emailOrUsername = authentication.getName();
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User with authentication " + emailOrUsername + " not found"));
        
        return user.getTopics()
                   .stream()
                   .map(topicMapper::toDTO)
                   .collect(Collectors.toList());
    }

    @Override
    public void subscribeToTopic(Long topicId, Authentication authentication) {
        String emailOrUsername = authentication.getName();
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User with authentication " + emailOrUsername + " not found"));
        
        Topic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new RuntimeException("Topic with ID " + topicId + " not found"));
        
        if (!user.getTopics().contains(topic)) {
            user.getTopics().add(topic);
            userRepository.save(user);
        }
    }

    @Override
    public void unsubscribeFromTopic(Long topicId, Authentication authentication) {
        String emailOrUsername = authentication.getName();
        User user = userRepository.findByEmail(emailOrUsername)
                .or(() -> userRepository.findByUsername(emailOrUsername))
                .orElseThrow(() -> new RuntimeException("User with authentication " + emailOrUsername + " not found"));
        
        Topic topic = topicRepository.findById(topicId)
            .orElseThrow(() -> new RuntimeException("Topic with ID " + topicId + " not found"));
        
        if (user.getTopics().contains(topic)) {
            user.getTopics().remove(topic);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User is not subscribed to the topic with ID " + topicId);
        }
    }
}
