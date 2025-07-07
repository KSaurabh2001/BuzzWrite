package com.BuzzWrite.BuzzWrite.Repository;



import com.BuzzWrite.BuzzWrite.service.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByIsFeaturedTrue();

    List<Post> findByUserId(Long userId); // User's authored blogs

    List<Post> findByCategoryIgnoreCase(String category);

    // Search by title or content
    @Query("SELECT p FROM Post p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Post> searchByTitleOrContent(String keyword);
}
