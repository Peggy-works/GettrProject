package com.example.gettrproject.repository;

import com.example.gettrproject.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    //Page<Comment> findByPostId(Long postId, Pageable pageable);
    //Optional<Comment> findByIdAndPostId(Long id, Long postId);
    void deleteAllByPostId(Long id);
}
