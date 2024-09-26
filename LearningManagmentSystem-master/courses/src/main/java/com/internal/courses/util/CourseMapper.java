package com.internal.courses.util;

import com.internal.courses.dto.CourseDTO;
import com.internal.courses.dto.CourseResponseDTO;
import com.internal.courses.model.Course;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Component
public class CourseMapper {

    public Course toEntity(CourseDTO dto){
        Course course = new Course();
        course.setCourseName(dto.getCourseName());
        course.setCourseDuration(dto.getCourseDuration());
        course.setCourseDescription(dto.getCourseDescription());
        course.setTechnology(dto.getTechnology());
        course.setLaunchUrl(dto.getLaunchUrl());
        return course;
    }

    public CourseResponseDTO toDto(Course course){
        CourseResponseDTO courseResponseDTO= new CourseResponseDTO();
        courseResponseDTO.setCourseName(course.getCourseName());
        courseResponseDTO.setCourseDuration(course.getCourseDuration());
        courseResponseDTO.setCourseDescription(course.getCourseDescription());
        courseResponseDTO.setTechnology(course.getTechnology());
        courseResponseDTO.setLaunchUrl(course.getLaunchUrl());
        return courseResponseDTO;
    }


}
