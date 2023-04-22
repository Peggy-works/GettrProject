package com.example.gettrproject.entity;

import jakarta.persistence.Id;

public class Postings {
    @Id
    private long id;
    private String title;
    private String description;
    private int likes;
}
