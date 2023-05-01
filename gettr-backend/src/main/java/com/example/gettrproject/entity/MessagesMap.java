package com.example.gettrproject.entity;

import com.example.gettrproject.controller.embedded.MessagesMapId;
import com.example.gettrproject.controller.model.Message;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class MessagesMap {

    @EmbeddedId
    private MessagesMapId messagesMapId;


    @Column(columnDefinition = "BLOB")
    private List<Message> messages = new ArrayList<Message>();
}

