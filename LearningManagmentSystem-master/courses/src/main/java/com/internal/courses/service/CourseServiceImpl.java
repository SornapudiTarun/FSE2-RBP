package com.internal.courses.service;

import com.internal.courses.dto.CourseDTO;
import com.internal.courses.dto.CourseResponseDTO;
import com.internal.courses.dto.TokenValid;
import com.internal.courses.exception.AccessNotAllowedException;
import com.internal.courses.exception.CourseNotFoundException;
import com.internal.courses.exception.InvalidTokenException;
import com.internal.courses.model.Course;
import com.internal.courses.repository.CourseRepository;
import com.internal.courses.restclients.AuthFeign;
import com.internal.courses.util.CourseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements  CourseService{

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseMapper courseMapper;


    @Autowired
    private AuthFeign authFeign;

    /**
     * @param courseDTO
     * @return CourseResponseDTO
     */
    @Override
    public CourseResponseDTO addCourse(CourseDTO courseDTO,String token) throws InvalidTokenException,AccessNotAllowedException {
        TokenValid tokenResponse = authFeign.getValidity(token).getBody();
        if (!tokenResponse.getIsTokenValid() && tokenResponse.getIsExpired()) {
            throw new InvalidTokenException("Invalid Credentials");
        } else{
            List<String> role = tokenResponse.getRole();
            if(tokenResponse.getRole().contains("ROLE_ADMIN")) {
                Course course = courseMapper.toEntity(courseDTO);
                Course savedCourse = courseRepository.save(course);
                return courseMapper.toDto(savedCourse);
            }
            else {
                throw new AccessNotAllowedException("Don't have permission to add courses.");
            }
        }

    }

    /**
     * @return List<CourseResponseDTO>
     */
    @Override
    public List<CourseResponseDTO> getAllCourses(String token) throws InvalidTokenException {
        TokenValid tokenResponse = authFeign.getValidity(token).getBody();
        if (!tokenResponse.getIsTokenValid() && tokenResponse.getIsExpired()) {
            throw new InvalidTokenException("Invalid Credentials");
        }
        else {
            return courseRepository.findAll().stream()
                    .map(courseMapper::toDto)
                    .collect(Collectors.toList());
        }
    }

    /**
     * @param courseName
     * @return CourseResponseDTO
     */
    @Override
    public CourseResponseDTO getCourseByName(String courseName,String token) throws CourseNotFoundException,InvalidTokenException{

        TokenValid tokenResponse = authFeign.getValidity(token).getBody();
        if (!tokenResponse.getIsTokenValid() && tokenResponse.getIsExpired()) {
            throw new InvalidTokenException("Invalid Credentials");
        }
        else{
            Course course = courseRepository.findByCourseName(courseName).orElseThrow(()->new CourseNotFoundException("Course not found"));
            return courseMapper.toDto(course);
        }
    }

    /**
     * @param technology
     * @return List<CourseResponseDTO>
     */
    @Override
    public List<CourseResponseDTO> getCoursesByTechnology(String technology,String token) throws InvalidTokenException{

        TokenValid tokenResponse = authFeign.getValidity(token).getBody();
        if (!tokenResponse.getIsTokenValid() && tokenResponse.getIsExpired()) {
            throw new InvalidTokenException("Invalid Credentials");
        }
        else {
            return courseRepository.findByTechnology(technology).stream()
                    .map(courseMapper::toDto)
                    .collect(Collectors.toList());
        }
    }

    /**
     * @param technology
     * @param durationFrom
     * @param durationTo
     * @return List<CourseResponseDTO>
     */
    @Override
    public List<CourseResponseDTO> getCoursesByTechnologyAndDurationRange(String technology, double durationFrom, double durationTo, String token) {
        TokenValid tokenResponse = authFeign.getValidity(token).getBody();
        if (!tokenResponse.getIsTokenValid() && tokenResponse.getIsExpired()) {
            throw new InvalidTokenException("Invalid Credentials");
        }
        else {
            return courseRepository.findByTechnologyAndDurationRange(technology, durationFrom,durationTo).stream()
                    .map(courseMapper::toDto)
                    .collect(Collectors.toList());
        }
    }

    /**
     * @param courseName
     * @return int
     */
    @Override
    public int deleteCourseByName(String courseName,String token) throws CourseNotFoundException,InvalidTokenException,AccessNotAllowedException {
        TokenValid tokenResponse = authFeign.getValidity(token).getBody();
        if (!tokenResponse.getIsTokenValid() && tokenResponse.getIsExpired()) {
            throw new InvalidTokenException("Invalid Credentials");
        } else {
            List<String> role = tokenResponse.getRole();
            if(tokenResponse.getRole().contains("ROLE_ADMIN")) {
                if (courseRepository.findByCourseName(courseName).isEmpty()) {
                    throw new CourseNotFoundException("Course not found.");
                }
                return courseRepository.deleteByCourseName(courseName);
            }
            else{
                throw new AccessNotAllowedException("Don't have permission to delete courses.");
            }
        }

    }
}
