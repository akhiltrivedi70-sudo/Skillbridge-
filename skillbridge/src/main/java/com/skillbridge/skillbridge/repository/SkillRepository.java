package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}