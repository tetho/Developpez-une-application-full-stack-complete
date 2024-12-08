package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PutMapping("")
    public ResponseEntity<UserDTO> update(Authentication authentication, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(authentication, userDTO));
    }
	
    @GetMapping("/topics")
    public List<TopicDTO> getSubscribedTopics(Authentication authentication) {
        return this.userService.getSubscribedTopics(authentication);
    }

    @PostMapping("/{id}/topics/{topicId}/subscribe")
    public ResponseEntity<Void> subscribeToTopic(@PathVariable Long topicId, Authentication authentication) {
        this.userService.subscribeToTopic(topicId, authentication);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/topics/{topicId}/unsubscribe")
    public ResponseEntity<Void> unsubscribeFromTopic(@PathVariable Long topicId, Authentication authentication) {
        this.userService.unsubscribeFromTopic(topicId, authentication);
        return ResponseEntity.ok().build();
    }
}
