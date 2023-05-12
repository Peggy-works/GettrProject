package com.example.gettrproject.controller;

import com.example.gettrproject.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
/*
* Class representing a PostCreation Request
* that is bounded to the incoming http request body
* @Author Angel Samora
* */
public class PostCreationRequest {
    private long id;
    private String title;
    private String description;
    private int likes;
    private String username;
}
