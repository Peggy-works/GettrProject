package com.example.gettrproject.service;
import com.example.gettrproject.controller.model.Message;
import com.example.gettrproject.entity.MessagesMap;
import com.example.gettrproject.entity.User;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();

    public void setConnected (boolean bool, Long userId);

    public List<MessagesMap> getAllMessages(Long id);

    public void addMessage(Message message);

    public User findById(Long id);
}
