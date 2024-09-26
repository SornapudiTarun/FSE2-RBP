package com.internal.courses.exception;

public class CourseNotFoundException extends RuntimeException {
    public CourseNotFoundException(final String message) {
        super(message);
    }
}
