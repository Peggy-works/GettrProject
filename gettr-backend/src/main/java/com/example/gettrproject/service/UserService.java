package com.example.gettrproject.service;
import com.example.gettrproject.entity.User;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}
