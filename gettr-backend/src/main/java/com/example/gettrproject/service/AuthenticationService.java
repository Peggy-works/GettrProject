package com.example.gettrproject.service;
import com.example.gettrproject.config.JwtUtils;
import com.example.gettrproject.controller.model.AuthenticationRequest;
import com.example.gettrproject.controller.model.AuthenticationResponse;
import com.example.gettrproject.controller.model.RegisterRequest;
import com.example.gettrproject.entity.Role;
import com.example.gettrproject.entity.User;
import com.example.gettrproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/*
* */
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    @Autowired
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    /*
    * Build user out of RegisterRequest object, save user, generate token for user,
    * return AuthenticationResponse that contains jwt token, user_id
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
        /*
        * Once
        * */
        var jwtToken = jwtUtils.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }

    /*
    * Function that takes in the a authenticationRequest object that holds request information.
    * Authenticate user based on username and password, if validated generate a jwt token and return a authenticationResponse object.
    * @Param AuthenticationRequest
    * @Return AuthenticationResponse
    * */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getHashedPassword()
                )
        );
        /*
        * User is authenticated
        * Generate a jwt token and user id and save it in a AuthenticationResponse object
        * */
        var user = repository.findByUsername (request.getUsername())
                .orElseThrow();
        var jwtToken = jwtUtils.generateToken(user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .id(user.getId())
                .username(user.getUsername())
                .build();
    }



}
