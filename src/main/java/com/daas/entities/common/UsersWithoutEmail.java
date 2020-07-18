package com.daas.entities.common;

import com.daas.entities.user.SubUser;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UsersWithoutEmail {

    List<SubUser> subUsers;
    public UsersWithoutEmail() {
        subUsers = new ArrayList<>();
    }
}
