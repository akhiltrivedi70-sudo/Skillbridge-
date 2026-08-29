package com.skillbridge.skillbridge.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "jobs")
@Data
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String company;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String eligibility;

    @ManyToOne
    @JoinColumn(name = "posted_by")
    private User postedBy;
}