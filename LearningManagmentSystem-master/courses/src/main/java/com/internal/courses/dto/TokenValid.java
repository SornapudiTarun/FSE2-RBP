package com.internal.courses.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenValid {
    String emailId;
    List<String> role;
    Boolean isTokenValid;
    Boolean isExpired;
}
