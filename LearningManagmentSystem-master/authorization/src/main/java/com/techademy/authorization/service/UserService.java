package com.techademy.authorization.service;

import com.techademy.authorization.dto.UserRegistrationDTO;
import com.techademy.authorization.exception.UserExistsException;
import com.techademy.authorization.model.User;
import com.techademy.authorization.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(UserRegistrationDTO userRegistrationDTO) throws UserExistsException{
        if(userRepository.findByEmail(userRegistrationDTO.getEmail())!=null){
            throw new UserExistsException("User already exists!!");
        }
        User user = new User();
        user.setUserName(userRegistrationDTO.getUserName());
        user.setEmail(userRegistrationDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        user.setRoles("USER");


        return userRepository.save(user);

    }

}
