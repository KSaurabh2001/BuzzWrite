package com.BuzzWrite.BuzzWrite.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.BuzzWrite.BuzzWrite.Repository.UserRepository;
import com.BuzzWrite.BuzzWrite.jwt.JwtAuthenticationHelper;
import com.BuzzWrite.BuzzWrite.service.Model.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtAuthenticationHelper jwtService; // For token-based user lookup (optional)
    
    @Override
    public User editUser(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        BCryptPasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
		

        // Update only non-null fields
        if (updatedUser.getFullName() != null) user.setFullName(updatedUser.getFullName());
        if (updatedUser.getUsername() != null) user.setUsername(updatedUser.getUsername()); // ✅ important
        if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
        if (updatedUser.getGender() != null) user.setGender(updatedUser.getGender());
        if (updatedUser.getOccupation() != null) user.setOccupation(updatedUser.getOccupation());
        if (updatedUser.getBio() != null) user.setBio(updatedUser.getBio());
        if (updatedUser.getImage() != null) user.setImage(updatedUser.getImage());
        if (updatedUser.getDOB() != null) user.setDOB(updatedUser.getDOB());
        if (updatedUser.getAddress() != null) user.setAddress(updatedUser.getAddress());

        // Only update password if provided and different
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // ✅ secure
        }

        return userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User getUserByToken(String token) {
        String username = jwtService.getUsernameFromToken(token);
        return getUserByUsername(username);
    }

    @Override
    public List<User> searchAuthors(String keyword) {
        return userRepository.findByFullNameContainingIgnoreCaseOrUsernameContainingIgnoreCase(keyword, keyword);
    }

    @Override
    public List<User> getAllAuthors() {
        return userRepository.findAll(); // or filter only those who authored posts
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
