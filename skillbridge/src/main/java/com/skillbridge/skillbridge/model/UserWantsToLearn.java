package com.skillbridge.skillbridge.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_wants_to_learn")
@Data
public class UserWantsToLearn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;
}