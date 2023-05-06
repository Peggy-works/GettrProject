package com.example.gettrproject.controller;
import com.example.gettrproject.config.JwtService;
import com.example.gettrproject.entity.Role;
import com.example.gettrproject.entity.User;
import com.example.gettrproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

/*
* */
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /*
    * Build user out of RegisterRequest object, save user, generate token for user,
    * return AuthenticationResponse that contains jwt token
    * @Param request
    * @Returns AuthenticationResponse
    * */
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .id(request.getId())
                .username(request.getUsername())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //List<User> users = new ArrayList<>();
        //Optional<User> usert;
        //repository.findAll().forEach(users::add);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        //Logger.info(passwordEncoder.encode(request.getPassword()));
        //Logger.info("YO");
        // User is authenticated
        // Generate token and send it back
        var user = repository.findByUsername (request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .build();
    }



}
