package com.techademy.authorization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @SuppressWarnings("unchecked")
    @ExceptionHandler({UserExistsException.class})
    public ResponseEntity<?> handleInvalidTokenException(final UserExistsException userExistsException){
        return (ResponseEntity<ExceptionResponse>) new ResponseEntity((Object) new ExceptionResponse(
                userExistsException.getMessage(),LocalDateTime.now(), HttpStatus.FOUND), HttpStatus.FOUND);
    }



    @SuppressWarnings("unchecked")
    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> handleGlobalException(Exception exception){
        return (ResponseEntity<ExceptionResponse>) new ResponseEntity((Object) new ExceptionResponse(
                "An error occured:"+exception.getMessage(),LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

