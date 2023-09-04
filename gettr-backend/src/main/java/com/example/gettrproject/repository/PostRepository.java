package com.example.gettrproject.repository;

import com.example.gettrproject.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAll();

    @Query(value = "SELECT p FROM Post p ORDER BY p.id DESC")
    List<Post> findAllOrderedId();
}
