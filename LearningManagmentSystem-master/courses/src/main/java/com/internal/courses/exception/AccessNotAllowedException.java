package com.internal.courses.exception;

public class AccessNotAllowedException extends RuntimeException {
    public AccessNotAllowedException(String message) {
        super(message);
    }
}
