package com.daas.entities.user;



import com.fasterxml.jackson.annotation.JsonFormat;
import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "forgot_password_token")
@Getter
@Setter
public class ForgotPasswordToken extends BaseEntity {
    private static final int EXPIRATION = 60 * 24;



    private String token;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    public LocalDateTime calculateExpiryDate(int expiryTimeInMinutes) {
        return LocalDateTime.now().plusMinutes(expiryTimeInMinutes);
    }

    public static int getEXPIRATION() {
        return EXPIRATION;
    }




    @Override
    @PrePersist
    public void preInsert() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = true;
    }


}
