package com.example.gettrproject.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
@Table(name = "_user")
/*
* User entity class
* */
public class User implements UserDetails {
    @Id
    @GeneratedValue // Finds the best auto generation strategy, set to GenerationType.AUTO as default
    private Integer id;
    private String username;
    private String password;
    private String name;
    @Enumerated(EnumType.STRING) //Set field as enum of type String, takes string value of the enum
    private Role role;

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
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}