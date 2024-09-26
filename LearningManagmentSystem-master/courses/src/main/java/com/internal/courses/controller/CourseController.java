package com.internal.courses.controller;

import com.internal.courses.dto.CourseDTO;
import com.internal.courses.dto.CourseResponseDTO;
import com.internal.courses.exception.AccessNotAllowedException;
import com.internal.courses.exception.CourseNotFoundException;
import com.internal.courses.exception.InvalidTokenException;
import com.internal.courses.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/lms/courses")
@CrossOrigin(origins = "http://localhost:4200")
public class CourseController {

    @Autowired
    private CourseService courseService;



    @PostMapping("/add-course")
    public ResponseEntity<String> addCourse(@RequestHeader("Authorization") final String token,@Valid @RequestBody CourseDTO courseDTO) throws InvalidTokenException
    {
        CourseResponseDTO courseResponseDTO = courseService.addCourse(courseDTO,token);
        return new ResponseEntity<>("Course Details Successfully added.", HttpStatus.CREATED);
    }

    @GetMapping("/get-all-course")
    public ResponseEntity<Object> getAllCourses(@RequestHeader("Authorization") final String token){
        List<CourseResponseDTO> allCourses = courseService.getAllCourses(token);
        if(!allCourses.isEmpty()){
            return new ResponseEntity<>(allCourses,HttpStatus.OK);
        }
        return new ResponseEntity<>("Courses are yet to be added in Database.",HttpStatus.OK);
    }

    @GetMapping("/find-courses-name/{courseName}")
    public ResponseEntity<CourseResponseDTO> findCoursesByCourseName(@RequestHeader("Authorization") final String token,@PathVariable(name="courseName") String courseName) throws CourseNotFoundException {
        CourseResponseDTO courseByName = courseService.getCourseByName(courseName,token);
        return new ResponseEntity<>(courseByName,HttpStatus.OK);
    }

    @GetMapping("/find-courses-tech/{technology}")
    public ResponseEntity<Object> findCoursesByTech(@RequestHeader("Authorization") final String token, @PathVariable(name = "technology") String technology) {
        List<CourseResponseDTO> coursesByTechnology = courseService.getCoursesByTechnology(technology,token);
        if(coursesByTechnology.isEmpty()){
            return new ResponseEntity<>("No Courses Available for Selected Technology",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(coursesByTechnology,HttpStatus.OK);
    }

    @GetMapping("/get/{technology}/{durationFrom}/{durationTo}")
    public ResponseEntity<Object> getCoursesByTechnologyAndDurationRange(
            @RequestHeader("Authorization") final String token,
            @PathVariable String technology,
            @PathVariable double durationFrom,
            @PathVariable double durationTo
    ){
        List<CourseResponseDTO> coursesByTechnologyAndDurationRange = courseService.getCoursesByTechnologyAndDurationRange(technology, durationFrom, durationTo,token);
        if (coursesByTechnologyAndDurationRange.isEmpty()){
            return new ResponseEntity<>("No Courses Available for Technology between given duration.",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(coursesByTechnologyAndDurationRange,HttpStatus.OK);
    }


    @DeleteMapping("/delete-course/{courseName}")
    public ResponseEntity<Object> deleteForCourseName(@RequestHeader("Authorization") final String token, @PathVariable(name="courseName") String courseName) throws CourseNotFoundException,InvalidTokenException, AccessNotAllowedException {
        int numberOfCoursesDeleted = courseService.deleteCourseByName(courseName,token);
        return new ResponseEntity<>(numberOfCoursesDeleted + " Courses Deleted from Database.", HttpStatus.OK);

    }


}
