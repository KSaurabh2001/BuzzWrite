package com.BuzzWrite.BuzzWrite.service;


import java.util.List;
import com.BuzzWrite.BuzzWrite.service.Model.Post;

public interface PostService {

    Post addBlog(Post post);
    void deleteBlog(Long postId);
    Post updateBlog(Long postId, Post post);

    List<Post> getFeaturedBlogs();
    List<Post> getSavedBlogs(Long userId);

    List<Post> saveBlog(Long userId, Long postId);
    List<Post> unsaveBlog(Long userId, Long postId);

    List<Post> getBlogsForCurrentUser(Long userId);
    List<Post> searchBlogs(String keyword);
    List<Post> sortBlogs(String sortBy);

    List<Post> getAllBlogs();
    Post getBlogById(Long postId);
    List<Post> getBlogByCategory(String category);
    List<Post> getAllBlogsByUserId(Long userId);
}