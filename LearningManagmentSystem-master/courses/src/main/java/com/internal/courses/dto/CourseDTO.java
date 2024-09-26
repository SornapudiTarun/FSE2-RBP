package com.internal.courses.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;
import org.springframework.data.mongodb.core.index.Indexed;


import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {


    @NotBlank(message = "Course Name is mandatory")
    @Size(min=10,message = "Course Name should not be less than 20 characters")
    @Indexed(unique = true)
    private String courseName;


    @NotNull(message = "Course duration is mandatory")
    private double courseDuration;


    @NotBlank(message = "Course Description is mandatory")
    @Size(min=20,message = "Course Description should be at least 20 characters")
    private String courseDescription;


    @NotNull(message = "Technology is mandatory")
    private String technology;


    @NotBlank(message = "Launch URL is mandatory")
    @URL
    private String launchUrl;


}
