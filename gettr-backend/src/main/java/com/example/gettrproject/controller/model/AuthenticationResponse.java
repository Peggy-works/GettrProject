package com.example.gettrproject.controller;

import com.example.gettrproject.controller.embedded.MessagesMapId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
/*
* A class representing a AuthenticationResponse which is returned
* when system validates user credentials using our Authentication Service.
* @Author Angel Samora
* */
public class AuthenticationResponse {
    private String token;
    private Integer id;
    private String username;

}
