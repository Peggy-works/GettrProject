package com.example.gettrproject.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import lombok.NonNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "postings")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Post {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    //@Column(name = "post_id", nullable = false)
    private long id;

    @NonNull
    private String title;

    @NonNull
    @Lob
    private String description;

    private int likes;


    //@ManyToOne
    //private List<User> likesUsers;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User poster;

    @OneToMany(targetEntity = Comment.class,  mappedBy = "post")
    private List<Comment> comments;
}
