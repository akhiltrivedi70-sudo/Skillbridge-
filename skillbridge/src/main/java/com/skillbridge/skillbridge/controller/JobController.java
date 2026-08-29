package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.*;
import com.skillbridge.skillbridge.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/create")
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    @PostMapping("/required-skill/add")
    public JobRequiredSkill addRequiredSkill(@RequestBody JobRequiredSkill requiredSkill) {
        return jobService.addRequiredSkill(requiredSkill);
    }

    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/{jobId}/match/{userId}")
    public double getMatchPercentage(@PathVariable Long jobId, @PathVariable Long userId) {
        return jobService.calculateMatchPercentage(userId, jobId);
    }

    @GetMapping("/{jobId}/missing-skills/{userId}")
    public List<String> getMissingSkills(@PathVariable Long jobId, @PathVariable Long userId) {
        return jobService.getMissingSkills(userId, jobId);
    }
}