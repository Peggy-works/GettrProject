package com.example.gettrproject.repository;

import com.example.gettrproject.controller.embedded.PostLikesId;
import com.example.gettrproject.entity.PostLikesMap;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikesMapRepository extends JpaRepository<PostLikesMap, PostLikesId> {
}
