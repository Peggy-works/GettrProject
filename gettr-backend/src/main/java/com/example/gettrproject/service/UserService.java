package com.example.gettrproject.service;
import com.example.gettrproject.entity.User;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    void deleteUser(User user);

}
