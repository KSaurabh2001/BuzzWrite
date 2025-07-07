package com.BuzzWrite.BuzzWrite.service;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.BuzzWrite.BuzzWrite.Repository.PostRepository;
import com.BuzzWrite.BuzzWrite.Repository.UserRepository;
import com.BuzzWrite.BuzzWrite.service.Model.Post;
import com.BuzzWrite.BuzzWrite.service.Model.User;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    
    @Override
    public Post addBlog(Post post) {
    	
    	String username=post.getUsername();
    	User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    	post.setUser(user);
    	post.setCreatedAt(LocalDateTime.now());
    	post.setUpdatedAt(LocalDateTime.now());
    	user.getPost().add(post);
    	
    	
    	
    	return postRepository.save(post);
    }

    public void deleteBlog(Long postId) {
    	 Post post = postRepository.findById(postId)
    		        .orElseThrow(() -> new RuntimeException("Post not found"));

    		    String username = post.getUsername(); // get owning user

    		    User user = userRepository.findByUsername(username)
    		            .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

    		    user.getPost().remove(post); // remove from user's list (important!)
    		    post.setUser(null); 

    		    postRepository.delete(post); // now delete safely
    }

    @Override
    public Post updateBlog(Long postId, Post updatedPost) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(updatedPost.getTitle());
        post.setCategory(updatedPost.getCategory());
        post.setContent(updatedPost.getContent());
        post.setExcerpt(updatedPost.getExcerpt());
        post.setImageUrl(updatedPost.getImageUrl());
        post.setTags(updatedPost.getTags());
        post.setIsFeatured(updatedPost.getIsFeatured());
        post.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    @Override
    public List<Post> getFeaturedBlogs() {
        return postRepository.findByIsFeaturedTrue();
    }

    @Override
    public List<Post> getSavedBlogs(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getSavedPost();
    }

    @Override
    public List<Post> saveBlog(Long userId, Long postId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        if (!user.getSavedPost().contains(post)) {
            user.getSavedPost().add(post);
            userRepository.save(user);
        }
        
       return getSavedBlogs(userId);
        
    }

    @Override
    public List<Post> unsaveBlog(Long userId, Long postId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

        if (user.getSavedPost().contains(post)) {
            user.getSavedPost().remove(post);
            userRepository.save(user);
        }
        return getSavedBlogs(userId);
    }

    @Override
    public List<Post> getBlogsForCurrentUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    @Override
    public List<Post> searchBlogs(String keyword) {
        return postRepository.searchByTitleOrContent(keyword);
    }

    public List<Post> sortBlogs(String sortBy) {
        if (sortBy.equalsIgnoreCase("createdAt")) {
            return postRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")); // Latest first
        } else if (sortBy.equalsIgnoreCase("title")) {
            return postRepository.findAll(Sort.by(Sort.Direction.ASC, "title")); // A-Z
        } else {
            throw new IllegalArgumentException("Invalid sort parameter: " + sortBy);
        }
    }

    @Override
    public List<Post> getAllBlogs() {
        return postRepository.findAll();
    }

    @Override
    public Post getBlogById(Long postId) {
        return postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    @Override
    public List<Post> getBlogByCategory(String category) {
        return postRepository.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<Post> getAllBlogsByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }
}

