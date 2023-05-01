package com.example.gettrproject.controller;

import com.example.gettrproject.entity.Post;
import com.example.gettrproject.repository.PostRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @GetMapping("getPosts")
    public Page<Post> getAllPosts(Pageable pageable){
        return postRepository.findAll(pageable);
    }

    @PostMapping("/newPost")
    public Post createPost(@RequestBody Post post){
        return postRepository.save(post);
    }

    @PutMapping("/posts/{postId}")
    public Post updatePost(@PathVariable Long postId, @RequestBody Post postRequest){
        //return postRepository.findById(postId).map(post --> blah blah)
        return null;
    }

    @DeleteMapping
    public ResponseEntity<?> deletePost(@PathVariable Long longId){
        return null;
    }

}
