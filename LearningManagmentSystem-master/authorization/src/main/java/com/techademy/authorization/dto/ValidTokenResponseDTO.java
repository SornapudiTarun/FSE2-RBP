package com.techademy.authorization.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidTokenResponseDTO {
    String emailId;
    List<String> role;
    Boolean isTokenValid;
    Boolean isExpired;
}
