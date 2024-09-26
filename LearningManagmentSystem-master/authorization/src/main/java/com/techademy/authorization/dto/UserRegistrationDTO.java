package com.techademy.authorization.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    @NotBlank(message = "User Name is mandatory")
    @Size(min=1, max=20)
    private String userName;

    @NotBlank(message = "email is mandatory")
    @Email(message = "email should be valid")
    private String email;

    @NotBlank
    private String password;

}
