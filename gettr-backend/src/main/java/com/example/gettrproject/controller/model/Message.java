package com.example.gettrproject.controller.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {
    private int senderId;
    private int receiverId;
    private String senderName;
    private String receiverName;
    private String message;
    private String date;

    private Status status;

}