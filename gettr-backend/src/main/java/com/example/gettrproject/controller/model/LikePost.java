package com.example.gettrproject.controller.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LikePost {
    private boolean like;

    private Long userId;
}
