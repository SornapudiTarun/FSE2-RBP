package com.techademy.authorization.controller;

import com.techademy.authorization.dto.UserLoginDTO;
import com.techademy.authorization.dto.ValidTokenResponseDTO;
import com.techademy.authorization.exception.UserExistsException;
import com.techademy.authorization.model.User;
import com.techademy.authorization.dto.UserRegistrationDTO;
import com.techademy.authorization.service.CustomeUserDetailsService;
import com.techademy.authorization.service.UserService;
import com.techademy.authorization.util.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1.0/lms/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomeUserDetailsService customeUserDetailsService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;



    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO) throws UserExistsException {
        User registeredUser = userService.registerUser(userRegistrationDTO);
        return new ResponseEntity<>(registeredUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> createAuthenticationToken(@Valid @RequestBody UserLoginDTO userLoginDTO) throws Exception{
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.getEmail(),userLoginDTO.getPassword())
        );
        Map<String,String> response = new HashMap<>();
        final UserDetails userDetails = customeUserDetailsService.loadUserByUsername(userLoginDTO.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        response.put("jwt",jwt);
        response.put("email",userDetails.getUsername());
        return new ResponseEntity<>(response,HttpStatus.OK);

    }

    @GetMapping(value = "/validate")
    public ResponseEntity<ValidTokenResponseDTO> getValidity(@RequestHeader("Authorization") final String token) {
        ValidTokenResponseDTO validTokenResponseDTO = jwtUtil.validateToken(token.substring(7));
        return new ResponseEntity<>(validTokenResponseDTO,HttpStatus.OK);
    }


}
