package com.example.gettrproject.controller;

import com.example.gettrproject.config.CommentRequest;
import com.example.gettrproject.entity.Comment;
import com.example.gettrproject.entity.Post;
import com.example.gettrproject.repository.CommentRepository;
import com.example.gettrproject.repository.PostRepository;
import com.example.gettrproject.repository.UserRepository;
import com.example.gettrproject.service.PostService;
import com.example.gettrproject.service.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
/*
* Controller class that handles "/post/**" endpoints,
* @Author Angel Samora
* */
public class PostController {

    //private final PostService postService;
    private final PostRepository postRepository;

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Autowired
    private UserService userService;

    /*
    * public createPost function that bounds the incoming http request body
    * to a PostCreationRequest object which is used create and save a post object into our
    * database.
    * @Param PostCreationRequest
    * @Returns ResponseEntity<PostCreationResponse>
    * */
    @PostMapping("/newPost")
    public ResponseEntity<PostCreationResponse> createPost(@RequestBody PostCreationRequest request){
        var user = userRepository.findByUsername (request.getUsername())
                .orElseThrow();
        var post = Post.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .likes(request.getLikes())
                .poster(user)
                .build();
        postRepository.save(post);
        return ResponseEntity.ok(PostCreationResponse.builder()
                .posterUsername(user.getUsername())
                .post_id(post.getId())
                .build());
    }

    /*
    * public addComment function that maps the incoming http request body to
    * a CommentRequest object, handles adding comment to specific posts and
    * updates forum post in database with new comment.
    * @Param CommentRequest
    * @Return ResponseEntity<String>
    * */
    @PostMapping("/addComment")
    public ResponseEntity<String> addComment(@RequestBody CommentRequest request){
        var user = userRepository.findById (request.getUser_id())
                .orElseThrow();
        var post = postRepository.findById (request.getPost_id())
                .orElseThrow();
        var newComment = Comment.builder()
                .post(post)
                .user(user)
                .text(request.getText())
                .build();
        //commentRepository.
        //postRepository.getReferenceById(post_id).getComments().add(comment);
        postRepository.findById(request.getPost_id()).get().getComments().add(newComment);
        commentRepository.save(newComment);
        return ResponseEntity.ok("We attached message to forum post");
    }

    /*
    * public getAllPosts function that returns every post in
    * the database as a List of PostGetResponse objects
    * @Param none
    * @Return List<PostGetResponse>
    * */
    @GetMapping("/getPosts")
    public List<PostGetResponse> getAllPosts(){
        List<PostGetResponse> posts = new ArrayList<>();
        postRepository.findAll().forEach(post -> {
            /*
            * Pull specific details and build a PostGetResponse object
            * */
            var response = PostGetResponse.builder()
                    .id(post.getId())
                    .title(post.getTitle())
                    .description(post.getDescription())
                    .likes(post.getLikes())
                    .poster_id(post.getPoster().getId())
                    .comments(new ArrayList<String>())
                    .usernames(new ArrayList<String>())
                    .build();
            post.getComments().forEach(comment -> {
                response.getUsernames().add(comment.getUser().getUsername());
                response.getComments().add(comment.getText());
            });
            posts.add(response);


        });

        return posts;
    }

}
