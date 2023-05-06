package com.example.gettrproject.entity;

import com.example.gettrproject.controller.embedded.MessagesMapId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
* @Data annotation provides Getter and setters for all fields, still need to remove the getters and setters or delete this annotation
* @Builder annotation instantiates a new object using the arguments provided.
* @NoArgsCon. annotation, generates a no-arg constructor
* @AllArgsCon. annotation, generates an all-argument constructor, requires one argument for every field in the class
* @Entity Specifies class as entity
* @Table Primary table for entity "user"
* */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity

@Table(name = "app_user")
/*
* User entity class
* */
public class User implements UserDetails {
    @Id
    @GeneratedValue // Finds the best auto generation strategy, set to GenerationType.AUTO as default
    private Integer id;
    @Column(unique = true)
    private String username;
    private String hashedPassword;
    private String name;
    private boolean connected = false;
    @Enumerated(EnumType.STRING) //Set field as enum of type String, takes string value of the enum
    private Role role;
    @Column(columnDefinition = "BLOB")
    private List<MessagesMapId> messageIds = new ArrayList<MessagesMapId>();

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    /*
    * Returns a list of user roles
    * @Param nones
    * */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return hashedPassword;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public List<MessagesMapId> getMessageIds(){
        return messageIds;
    }
    public void setMessages(List<MessagesMapId> map){
        messageIds = map;
    }

    public boolean getConnected(){return connected;}
    public void setConnected(boolean bool){connected = bool;}
}
