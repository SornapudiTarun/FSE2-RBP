package com.internal.courses.restclients;

import com.internal.courses.dto.TokenValid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "authorization", url = "http://localhost:8080/api/v1.0/lms/auth")
public interface AuthFeign {
    @RequestMapping(value = { "/validate" }, method = { RequestMethod.GET })
    ResponseEntity<TokenValid> getValidity(@RequestHeader("Authorization") final String token);
}