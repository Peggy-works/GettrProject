package com.example.gettrproject.service;
import com.example.gettrproject.entity.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}
