package com.internal.courses.service;

import com.internal.courses.dto.CourseDTO;
import com.internal.courses.dto.CourseResponseDTO;
import com.internal.courses.dto.TokenValid;
import com.internal.courses.exception.AccessNotAllowedException;
import com.internal.courses.exception.CourseNotFoundException;
import com.internal.courses.exception.InvalidTokenException;
import com.internal.courses.repository.CourseRepository;
import com.internal.courses.restclients.AuthFeign;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest(classes = { CourseServiceImplTest.class })
public class CourseServiceImplTest {

    @InjectMocks
    CourseServiceImpl courseServiceImpl;
    @Mock
    AuthFeign authFeign;
    @Mock
    private CourseRepository courseRepository;


    @SuppressWarnings("unchecked")
//    @Test
//    void addCourseTest1() throws InvalidTokenException{
//
//        List<String> technology= new ArrayList<>();
//        technology.add("Java");
//        List<String> role = new ArrayList<>();
//        role.add("ROLE_ADMIN");
//        final CourseDTO courseDTO = new CourseDTO("Something in Course Name", 11.5,"Something in course description", technology,"www.example.com");
//        final TokenValid tokenValid = new TokenValid("emailId",role, false,true);
//        @SuppressWarnings("unchecked")
//        final ResponseEntity<TokenValid> response = (ResponseEntity<TokenValid>) new ResponseEntity((Object) tokenValid,
//                HttpStatus.OK);
//        Mockito.when((Object) this.authFeign.getValidity("token")).thenReturn((Object) response);
//        Assertions.assertThrows((Class) InvalidTokenException.class,
//                () -> this.courseServiceImpl.addCourse(courseDTO,"token"), "getaddCourseDTOTest");
//
//    }


//    @Test
//    void addCourseTest2() throws AccessNotAllowedException {
//        List<String> technology= new ArrayList<>();
//        technology.add("Java");
//        List<String> role = new ArrayList<>();
//        role.add("ROLE_USER");
//        final CourseDTO courseDTO = new CourseDTO("Something in Course Name",10.5,"Something in course description", technology,"www.example.com");
//        final TokenValid tokenValid = new TokenValid("emailId",role, true,false);
//        @SuppressWarnings("unchecked")
//        final ResponseEntity<TokenValid> response = (ResponseEntity<TokenValid>) new ResponseEntity((Object) tokenValid,
//                HttpStatus.OK);
//        Mockito.when((Object) this.authFeign.getValidity("token")).thenReturn((Object) response);
//        Assertions.assertThrows((Class) AccessNotAllowedException.class,
//                () -> this.courseServiceImpl.addCourse(courseDTO,"token"), "getaddCourseDTOTest");
//    }


    @Test
    void testGetCourseByCourseName() throws CourseNotFoundException{
        List<String> role = new ArrayList<>();
        role.add("ROLE_USER");
        final TokenValid tokenValid = new TokenValid("emailId",role, true,false);
        @SuppressWarnings("unchecked")
        final ResponseEntity<TokenValid> response = (ResponseEntity<TokenValid>) new ResponseEntity((Object) tokenValid,
                HttpStatus.OK);
        Mockito.when((Object) this.authFeign.getValidity("token")).thenReturn((Object) response);
        Assertions.assertThrows((Class) CourseNotFoundException.class,
                () -> this.courseServiceImpl.getCourseByName("CourseName","token"), "getCourseNameDTOTest");
    }

//    @SuppressWarnings("unchecked")
//    @Test
//    void deleteCourseTest2() throws AccessNotAllowedException {
//        List<String> technology= new ArrayList<>();
//        technology.add("Java");
//        List<String> role = new ArrayList<>();
//        role.add("ROLE_USER");
//        final CourseDTO courseDTO = new CourseDTO("Something in Course Name",11,"Something in course description", technology,"www.example.com");
//        final TokenValid tokenValid = new TokenValid("emailId",role, true,false);
//        @SuppressWarnings("unchecked")
//        final ResponseEntity<TokenValid> response = (ResponseEntity<TokenValid>) new ResponseEntity((Object) tokenValid,
//                HttpStatus.OK);
//        Mockito.when((Object) this.authFeign.getValidity("token")).thenReturn((Object) response);
//        Assertions.assertThrows((Class) AccessNotAllowedException.class,
//                () -> this.courseServiceImpl.deleteCourseByName("courseName","token"), "deleteCourseDTOTest");
//    }


}
