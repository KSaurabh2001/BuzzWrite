package com.BuzzWrite.BuzzWrite.Controller;


import com.BuzzWrite.BuzzWrite.service.Model.Post;
import com.BuzzWrite.BuzzWrite.service.PostService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    //  Add a new blog
    @PostMapping("/add")
    public ResponseEntity<Post> addBlog(@RequestBody Post post) {
        Post createdPost = postService.addBlog(post);
        return ResponseEntity.ok(createdPost);
    }

    // Delete a blog
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long postId) {
        postService.deleteBlog(postId);
        return ResponseEntity.ok("Post deleted successfully");
    }
    // Update a blog
    @PutMapping("/update/{postId}")
    public ResponseEntity<Post> updateBlog(
            @PathVariable Long postId,
            @RequestBody Post updatedPost
    ) {
        Post updated = postService.updateBlog(postId, updatedPost);
        return ResponseEntity.ok(updated);
    }

    // Get all blogs
    @GetMapping("/allBlog")
    public ResponseEntity<List<Post>> getAllBlogs() {
        return ResponseEntity.ok(postService.getAllBlogs());
    }

    // Get featured blogs
    @GetMapping("/featured")
    public ResponseEntity<List<Post>> getFeaturedBlogs() {
        return ResponseEntity.ok(postService.getFeaturedBlogs());
    }

    // Get saved blogs for a user
    @GetMapping("/saved/{userId}")
    public ResponseEntity<List<Post>> getSavedBlogs(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getSavedBlogs(userId));
    }

    // Save a blog for a user
    @PostMapping("/save/{userId}/{postId}")
    public ResponseEntity<List<Post>> saveBlog(@PathVariable Long userId, @PathVariable Long postId) {
    	 return ResponseEntity.ok(postService.saveBlog(userId, postId));
    }

    // Unsave a blog for a user
    @DeleteMapping("/unsave/{userId}/{postId}")
    public ResponseEntity<List<Post>> unsaveBlog(@PathVariable Long userId, @PathVariable Long postId) {
        
        return ResponseEntity.ok(postService.unsaveBlog(userId, postId));
    }

    // Get blogs for current user (by user ID)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getBlogsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getBlogsForCurrentUser(userId));
    }

    // Search blogs by keyword
    @GetMapping("/search")
    public ResponseEntity<List<Post>> searchBlogs(@RequestParam("q") String keyword) {
        return ResponseEntity.ok(postService.searchBlogs(keyword));
    }

    // Sort blogs by a field
    @GetMapping("/sort")
    public ResponseEntity<List<Post>> sortBlogs(@RequestParam("by") String sortBy) {
        return ResponseEntity.ok(postService.sortBlogs(sortBy));
    }

    // Get blog by ID
    @GetMapping("/post/{postId}")
    public ResponseEntity<Post> getBlogById(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getBlogById(postId));
    }

    // Get blogs by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Post>> getBlogByCategory(@PathVariable String category) {
        return ResponseEntity.ok(postService.getBlogByCategory(category));
    }

    // Get all blogs by a user (author)
    @GetMapping("/author/{userId}")
    public ResponseEntity<List<Post>> getAllBlogsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getAllBlogsByUserId(userId));
    }
}
