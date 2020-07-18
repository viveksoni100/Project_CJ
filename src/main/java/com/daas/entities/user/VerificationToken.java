package com.daas.entities.user;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "verification_token")
@Getter
@Setter
public class VerificationToken extends BaseEntity {
    private static final int EXPIRATION = 60 * 24;

    /*@Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;*/

    private String token;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "expiry_date", updatable = false)
    private LocalDateTime expiryDate;

    public LocalDateTime calculateExpiryDate(int expiryTimeInMinutes) {
        return LocalDateTime.now().plusMinutes(expiryTimeInMinutes);
    }

    public static int getEXPIRATION() {
        return EXPIRATION;
    }


}
