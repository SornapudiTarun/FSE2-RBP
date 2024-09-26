package com.internal.courses.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @SuppressWarnings("unchecked")
    @ExceptionHandler({CourseNotFoundException.class})
    public ResponseEntity<?> handleCourseNotFoundException(final CourseNotFoundException courseNotFoundException){
        return (ResponseEntity<ExceptionResponse>) new ResponseEntity((Object) new ExceptionResponse(
                courseNotFoundException.getMessage(),LocalDateTime.now(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }


    @SuppressWarnings("unchecked")
    @ExceptionHandler({InvalidTokenException.class})
    public ResponseEntity<?> handleInvalidTokenException(final InvalidTokenException invalidTokenException){
        return (ResponseEntity<ExceptionResponse>) new ResponseEntity((Object) new ExceptionResponse(
                invalidTokenException.getMessage(),LocalDateTime.now(), HttpStatus.UNAUTHORIZED), HttpStatus.UNAUTHORIZED);
    }

    @SuppressWarnings("unchecked")
    @ExceptionHandler({AccessNotAllowedException.class})
    public ResponseEntity<?> handleAccessNotAllowedException(final AccessNotAllowedException accessNotAllowedException){
        return (ResponseEntity<ExceptionResponse>) new ResponseEntity((Object) new ExceptionResponse(
                accessNotAllowedException.getMessage(),LocalDateTime.now(), HttpStatus.METHOD_NOT_ALLOWED), HttpStatus.METHOD_NOT_ALLOWED);
    }


    @SuppressWarnings("unchecked")
    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> handleGlobalException(Exception exception){
        return (ResponseEntity<ExceptionResponse>) new ResponseEntity((Object) new ExceptionResponse(
                "An error occured:"+exception.getMessage(),LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
