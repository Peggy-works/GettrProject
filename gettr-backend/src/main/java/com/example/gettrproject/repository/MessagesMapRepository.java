package com.example.gettrproject.repository;

import com.example.gettrproject.controller.embedded.MessagesMapId;
import com.example.gettrproject.entity.MessagesMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MessagesMapRepository extends JpaRepository<MessagesMap, MessagesMapId>, JpaSpecificationExecutor<MessagesMap> {

}
