package com.example.gettrproject.controller;

import com.example.gettrproject.entity.Comment;
import com.example.gettrproject.entity.Post;
import com.example.gettrproject.repository.CommentRepository;
import com.example.gettrproject.repository.PostRepository;
import com.example.gettrproject.repository.UserRepository;
import com.example.gettrproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    /**
     * @param request
     * @return
     */
    /*
    * function that bounds the incoming http request body to a PostCreationRequest
    * object which is used to create and save a post object into our database.
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

    /**
     * <p>addComment handler that maps the incoming http request body to
     * a CommentRequest object, handles adding comment to specific posts and
     * updates forum post in database with new comment.</p>
     * @param request
     * @return ResponseEntity<String>
     * <pre>
     * {@code Example of request body
     *       {
     *          "user_id": ..,
     *          "post_id": ..,
     *          "text": ..
     *       }
     * }
     * </pre>
     */
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

    /**
     * getPosts handler for urls that match this endpoint. This handler takes in no parameters
     * and is used to return every post saved in the database.
     * <p>Example endpoint: "/post/getPosts"</p>
     * @return a list of PostGetResponse objects that contains user information
     * <pre>
     * {@code
     * Example of the returned List<PostGetResponse>
     *  [
     *      {
     *          "id": ..,
     *          "title": ..,
     *          "description": ..,
     *          "likes": ..,
     *          "poster_id": ..,
     *          "poster_name": ..,
     *          "usernames": [],
     *           "comments": []
     *      },
     *  ]
     * }
     * </pre>
     */
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
                    .poster_name(post.getPoster().getUsername())
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

    /**
     * getPost handler for urls that match this endpoint. The handler takes in a
     * {@code @PathVariable String id} that gets used to return the matching post, usernames, and comments.
     * <p>Example URL: "/post/getPost/1002</p>
     * @param id The post id that is used when searching for that specific post
     * @return a ResponseEntity PostGetResponse object
     * <pre>
     * {@code Example of returned object
     *  {
     *     "id": ..,
     *     "title": ..,
     *     "description": ..,
     *     "likes": ..,
     *     "poster_id": ..,
     *     "poster_name": ..,
     *     "usernames": [],
     *     "comments": []
     *  }
     * }
     * </pre>
     */
    @GetMapping("/getPost/{id}")
    public ResponseEntity<PostGetResponse> getPost(@PathVariable String id){
        var post = postRepository.findById(Long.parseLong(id));
        var response = PostGetResponse.builder()
                .id(post.get().getId())
                .title(post.get().getTitle())
                .description(post.get().getDescription())
                .likes(post.get().getLikes())
                .poster_id(post.get().getPoster().getId())
                .poster_name(post.get().getPoster().getUsername())
                .comments(new ArrayList<String>())
                .usernames(new ArrayList<String>())
                .build();
        post.get().getComments().forEach(comment -> {
            response.getUsernames().add(comment.getUser().getUsername());
            response.getComments().add(comment.getText());
        });
        return ResponseEntity.ok(response);
    }

}
