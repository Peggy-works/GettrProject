package com.example.gettrproject.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
/*
* A class representing a AuthenticationResponse
* which is returned when system validates user credentials
* using Authentication Service.
* @Author Angel Samora
* */
public class AuthenticationResponse {
    private String token;
    private Integer id;

}
