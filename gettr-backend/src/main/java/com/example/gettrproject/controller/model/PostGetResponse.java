package com.example.gettrproject.controller.model;

import com.example.gettrproject.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostGetResponse {
    private long id;
    private String poster_name;
    private String title;
    private String description;
    private int likes;
    private Integer poster_id;
    //private List<Comment> commentList;
    private List<String> usernames;
    private List<String> comments;

    private List<Integer> userIds;

    private List<Long> commentIds;

    private boolean liked;
    //private List<String>

}
