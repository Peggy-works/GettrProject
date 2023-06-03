package com.example.gettrproject.entity;

import com.example.gettrproject.controller.embedded.PostLikesId;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class PostLikesMap {

    @EmbeddedId
    private PostLikesId postLikesId;
}
