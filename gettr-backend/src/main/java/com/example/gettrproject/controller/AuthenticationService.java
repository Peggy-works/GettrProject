package com.example.gettrproject.controller;
import com.example.gettrproject.config.JwtService;
import com.example.gettrproject.entity.Role;
import com.example.gettrproject.entity.User;
import com.example.gettrproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/*
* */
@Service
@RequiredArgsConstructor
public class AuthenticationService {
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
                .hashedPassword(passwordEncoder.encode(request.getHashedPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getPassword(),
                        request.getPassword()
                )
        );
        // User is authenticated
        // Generate token and send it back
        var user = repository.findByUsername(request.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }



}
