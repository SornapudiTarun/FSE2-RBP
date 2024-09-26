package com.internal.courses.service;

import com.internal.courses.dto.CourseDTO;
import com.internal.courses.dto.CourseResponseDTO;
import com.internal.courses.exception.AccessNotAllowedException;
import com.internal.courses.exception.CourseNotFoundException;
import com.internal.courses.exception.InvalidTokenException;
import com.internal.courses.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



public interface CourseService {
    CourseResponseDTO addCourse(CourseDTO courseDTO,String token) throws InvalidTokenException, AccessNotAllowedException;

    List<CourseResponseDTO> getAllCourses(String token);

    CourseResponseDTO getCourseByName(String courseName,String token);

    List<CourseResponseDTO> getCoursesByTechnology(String technology,String token);

    List<CourseResponseDTO> getCoursesByTechnologyAndDurationRange(String technology,double durationFrom, double durationTo,String token);

    int deleteCourseByName(String courseName,String token) throws InvalidTokenException,CourseNotFoundException,AccessNotAllowedException;

}
