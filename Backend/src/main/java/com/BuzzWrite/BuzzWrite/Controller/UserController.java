package com.BuzzWrite.BuzzWrite.Controller;

import com.BuzzWrite.BuzzWrite.service.Model.User;
import com.BuzzWrite.BuzzWrite.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //  Edit user profile
    @PutMapping("/edit/{userId}")
    public ResponseEntity<User> editUser(
            @PathVariable Long userId,
            @RequestBody User updatedUser
    ) {
        User user = userService.editUser(userId, updatedUser);
        return ResponseEntity.ok(user);
    }

    // Get user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    // Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    // Get user by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Search authors (by full name or username)
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchAuthors(@RequestParam("q") String keyword) {
        List<User> authors = userService.searchAuthors(keyword);
        return ResponseEntity.ok(authors);
    }

    // Get all authors (or all users)
    @GetMapping("/allAuthor")
    public ResponseEntity<List<User>> getAllAuthors() {
        List<User> authors = userService.getAllAuthors();
        return ResponseEntity.ok(authors);
    }

   
     @GetMapping("/me")
     public ResponseEntity<User> getUserByToken(@RequestHeader("Authorization") String token) {
         String actualToken = token.replace("Bearer ", "");
         User user = userService.getUserByToken(actualToken);
         return ResponseEntity.ok(user);
     }
}




