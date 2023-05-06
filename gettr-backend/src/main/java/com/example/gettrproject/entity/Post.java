package com.example.gettrproject.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.NonNull;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue
    private long id;

    @NonNull
    private String title;

    @NonNull
    @Lob
    private String description;
}
