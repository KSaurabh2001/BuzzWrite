package com.BuzzWrite.BuzzWrite.service;

import java.util.List;

import com.BuzzWrite.BuzzWrite.service.Model.User;

public interface UserService {
	
	    User editUser(Long userId, User user);
	    User getUserByUsername(String username);
	    User getUserByToken(String token);
	    List<User> searchAuthors(String keyword);
	    List<User> getAllAuthors();
	    User getUserById(Long id);
	    User getUserByEmail(String email);
		

}
