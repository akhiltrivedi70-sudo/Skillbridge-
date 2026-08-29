package com.skillbridge.skillbridge.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "job_required_skills")
@Data
public class JobRequiredSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    private int weight = 1;
}