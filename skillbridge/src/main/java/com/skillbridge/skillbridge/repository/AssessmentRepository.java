package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findBySkillId(Long skillId);
}