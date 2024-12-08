package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.TopicDTO;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.service.IUserService;

@RestController
@RequestMapping("/users")
public class UserController {

	private IUserService userService;
	
	@Autowired
	public UserController(IUserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/{id}")
	public UserDTO getUserById(@PathVariable Long id) {
		return this.userService.getUserById(id);
	}
	
    @GetMapping("/{id}/topics")
    public List<TopicDTO> getSubscribedTopics(@PathVariable Long id) {
        return this.userService.getSubscribedTopics(id);
    }

    @PostMapping("/{userId}/topics/{topicId}/subscribe")
    public ResponseEntity<Void> subscribeToTopic(@PathVariable Long userId, @PathVariable Long topicId) {
        this.userService.subscribeToTopic(userId, topicId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/topics/{topicId}/unsubscribe")
    public ResponseEntity<Void> unsubscribeFromTopic(@PathVariable Long userId, @PathVariable Long topicId) {
        this.userService.unsubscribeFromTopic(userId, topicId);
        return ResponseEntity.ok().build();
    }
}
