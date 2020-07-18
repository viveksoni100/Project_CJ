package com.daas.entities.user;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class EditUser {

    @NotBlank(message = "value required")
    private String firstName;

    @NotBlank(message = "value required")
    private String lastName;

    @NotBlank(message = "value required")
    private String phone;
}
