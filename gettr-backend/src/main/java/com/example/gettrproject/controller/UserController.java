package com.example.gettrproject.controller;

import com.example.gettrproject.controller.embedded.MessagesMapId;
import com.example.gettrproject.controller.model.Message;
import com.example.gettrproject.controller.model.UserInfoResponse;
import com.example.gettrproject.entity.MessagesMap;
import com.example.gettrproject.entity.User;
import com.example.gettrproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.saveUser(user);
        return "New user is added";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PutMapping("/addMessage/{userid}")
    public List<User> addMessage(@PathVariable("userid") Long id, @RequestBody Message message){
        userService.addMessage(message);
        return Arrays.asList(userService.findById(message.getSenderId()),userService.findById(message.getReceiverId()));
    }

    @GetMapping("/getUser/{userid}")
    public ResponseEntity<?> getUser(@PathVariable("userid") Integer id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/getUserMessageIds/{userid}")
    public List<MessagesMapId> getUserMessageIds(@PathVariable("userid") Integer id){
        return userService.findById(id).getMessageIds();
    }

    @GetMapping("/getUserMessages/{userid}")
    public List<MessagesMap> getUserMessages(@PathVariable("userid") Integer id){
        return userService.getAllMessages(id);
    }

    @GetMapping("/getUserInfo")
    public List<UserInfoResponse> getUserInfo(){
        List<UserInfoResponse> temp = new ArrayList<UserInfoResponse>();
        for(User i : userService.getAllUsers()){
            temp.add(new UserInfoResponse(i.getId(),i.getUsername()));
        }
        return temp;
    }
    //@GetMapping("/deleteUser")

}
