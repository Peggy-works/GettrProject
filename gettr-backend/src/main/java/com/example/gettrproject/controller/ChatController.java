package com.example.gettrproject.controller;

import com.example.gettrproject.controller.model.Message;
import com.example.gettrproject.controller.model.Status;
import com.example.gettrproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("http://localhost:3000")
public class ChatController {

    @Autowired // Injecting object instance of SimpMessagingTemplate
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserService userService;

    @MessageMapping("/message") // used to map incoming messages to specific method in the controller (/app/message)
    @SendTo("/chatroom/public") // used to specify where the message is being sent to
    public Message recievedPublicMessage(@Payload Message message){
        if(message.getStatus() == Status.JOIN){
            userService.setConnected(true,message.getSenderId());   // sets connected status for web socket connect event
        }
        else if (message.getStatus() == Status.LEAVE) {
            userService.setConnected(false,message.getSenderId());
        }
        return message;
    }

    @MessageMapping("/private-message") // mapped to private message topic
    public Message recievedPrivateMessage(@Payload Message message){
        /*simpMessagingTemplate.convertAndSendToUser method is used to send the message to a specific
        user with the username specified in message.getReceiverName(). The "/private" destination is
        used to ensure that the message is sent only to that specific user.*/
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message); // /user/David/private
        //userService.findById(message.getReceiverId()).get().getMessages().add(message); // adding message to user receiver list
        //userService.findById(message.getSenderId()).get().getMessages().add(message);   // adding message to user sender list

        //userService.addMessage(message);

        return message;
    }
}
