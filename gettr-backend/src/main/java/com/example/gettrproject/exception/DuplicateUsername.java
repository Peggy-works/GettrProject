package com.example.gettrproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicateUsername extends RuntimeException {

    public DuplicateUsername(String message){
        super(message);
    }

}
