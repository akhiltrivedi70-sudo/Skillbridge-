package com.skillbridge.skillbridge.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String bio;

    private String location;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    public enum Role {
        USER, MENTOR, RECRUITER, ADMIN
    }
}