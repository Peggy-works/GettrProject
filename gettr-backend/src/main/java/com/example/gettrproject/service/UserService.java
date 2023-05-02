package com.example.gettrproject.service;
import com.example.gettrproject.controller.model.Message;
import com.example.gettrproject.entity.MessagesMap;
import com.example.gettrproject.entity.User;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@CrossOrigin
public interface UserService {

    public void setConnected (boolean bool, Long userId);

    public List<MessagesMap> getAllMessages(Long id);

    public void addMessage(Message message);

    public User findById(Long id);

    User saveUser(User user);

    List<User> getAllUsers();

    void deleteUser(User user);

}
