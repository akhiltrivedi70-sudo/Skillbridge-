package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
}