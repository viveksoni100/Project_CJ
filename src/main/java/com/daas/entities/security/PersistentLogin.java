package com.daas.entities.security;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Table(name = "persistent_logins")
@Entity
public class PersistentLogin {

    @Id
    private String series;

    private String username;

    @Column(name = "last_used")
    private LocalDateTime lastUsed;

    private String token;


}