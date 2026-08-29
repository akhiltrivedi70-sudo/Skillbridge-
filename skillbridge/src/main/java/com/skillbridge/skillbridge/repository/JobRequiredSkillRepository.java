package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.JobRequiredSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRequiredSkillRepository extends JpaRepository<JobRequiredSkill, Long> {
    List<JobRequiredSkill> findByJobId(Long jobId);
}