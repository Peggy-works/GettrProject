package com.example.gettrproject.controller.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message implements Serializable {
    private Integer senderId;
    private Integer receiverId;
    private String senderName;
    private String receiverName;
    private String message;
    private String date;

    private Status status;

}