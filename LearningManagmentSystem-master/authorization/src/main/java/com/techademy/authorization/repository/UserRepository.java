package com.techademy.authorization.repository;

import com.techademy.authorization.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User,String> {

    @Query("{'email' : ?0}")
    User findByEmail(String email);



}
