package com.internal.courses.repository;

import com.internal.courses.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.*;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {

    @Query(value="{'courseName':?0}")
    Optional<Course> findByCourseName(String courseName);

    @Query(value="{'technology' : ?0}")
    List<Course> findByTechnology(String technology);

    @Query("{ 'technology': ?0, 'courseDuration': { $gte: ?1, $lte: ?2 } }")
    List<Course> findByTechnologyAndDurationRange(String technology,double from,double to);


    @Query(value="{'courseName' : ?0}", delete=true)
    int deleteByCourseName(String courseName);


}
