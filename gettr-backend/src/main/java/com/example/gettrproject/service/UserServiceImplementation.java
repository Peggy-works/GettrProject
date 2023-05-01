package com.example.gettrproject.service;

import com.example.gettrproject.controller.embedded.MessagesMapId;
import com.example.gettrproject.controller.model.Message;
import com.example.gettrproject.entity.MessagesMap;
import com.example.gettrproject.entity.User;
import com.example.gettrproject.repository.MessagesMapRepository;
import com.example.gettrproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessagesMapRepository messagesMapRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findById(Long id){return userRepository.findById(id).get();}

    @Override
    public void setConnected (boolean bool, Long userId){
        if(userRepository.existsById(userId)) {
            User user = userRepository.findById(userId).get();
            user.setConnected(bool);
            saveUser(user);
        }
    }

    @Override
    public List<MessagesMap> getAllMessages(Long id){
        List<MessagesMapId> messageIds= findById(id).getMessageIds();
        List<MessagesMap> temp = new ArrayList<MessagesMap>();
        if(messageIds != null) {
            for (int i = 0; i < messageIds.size(); i++) {
                temp.add(messagesMapRepository.findById(messageIds.get(i)).get());
            }
            return temp;
        }
        else {
            return null;
        }
    }

    @Override
    public void addMessage(Message message){
        User sender = findById(message.getSenderId());
        User receiver = findById(message.getReceiverId());
        MessagesMapId messagesMapIdSender = new MessagesMapId(message.getSenderId(),message.getReceiverName());
        MessagesMapId messagesMapIdReceiver = new MessagesMapId(message.getReceiverId(),message.getSenderName());

        if(!messagesMapRepository.existsById(messagesMapIdSender) && !messagesMapRepository.existsById(messagesMapIdReceiver)){
            messagesMapRepository.save(new MessagesMap(messagesMapIdSender,new ArrayList<Message>()));
            messagesMapRepository.save(new MessagesMap(messagesMapIdReceiver,new ArrayList<Message>()));
            if(sender.getMessageIds() == null){
                sender.setMessages(new ArrayList<MessagesMapId>());
            }
            if(receiver.getMessageIds() == null){
                receiver.setMessages(new ArrayList<MessagesMapId>());
            }
            sender.getMessageIds().add(messagesMapIdSender);
            receiver.getMessageIds().add(messagesMapIdReceiver);
        }

        userRepository.save(sender);
        userRepository.save(receiver);

        MessagesMap s = messagesMapRepository.getById(messagesMapIdSender);
        MessagesMap r = messagesMapRepository.getById(messagesMapIdReceiver);

        List<Message> senderMessages = s.getMessages();
        List<Message> receiverMessages = r.getMessages();

        if(senderMessages == null){
            senderMessages = new ArrayList<Message>();
        }
        if(receiverMessages == null){
            receiverMessages = new ArrayList<Message>();
        }

        receiverMessages.add(message);
        senderMessages.add(message);

        messagesMapRepository.save(s);
        messagesMapRepository.save(r);
    }

}
