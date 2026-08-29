
package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.model.*;
import com.skillbridge.skillbridge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobRequiredSkillRepository jobRequiredSkillRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public JobRequiredSkill addRequiredSkill(JobRequiredSkill requiredSkill) {
        return jobRequiredSkillRepository.save(requiredSkill);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public double calculateMatchPercentage(Long userId, Long jobId) {
        List<JobRequiredSkill> requiredSkills = jobRequiredSkillRepository.findByJobId(jobId);
        if (requiredSkills.isEmpty()) return 0.0;

        List<UserSkill> userSkills = userSkillRepository.findByUserId(userId);
        Map<Long, UserSkill> userSkillMap = new HashMap<>();
        for (UserSkill us : userSkills) {
            userSkillMap.put(us.getSkill().getId(), us);
        }

        int totalWeight = 0;
        int matchedWeight = 0;

        for (JobRequiredSkill req : requiredSkills) {
            totalWeight += req.getWeight();
            if (userSkillMap.containsKey(req.getSkill().getId())) {
                matchedWeight += req.getWeight();
            }
        }

        return totalWeight == 0 ? 0.0 : (matchedWeight * 100.0) / totalWeight;
    }

    public List<String> getMissingSkills(Long userId, Long jobId) {
        List<JobRequiredSkill> requiredSkills = jobRequiredSkillRepository.findByJobId(jobId);
        List<UserSkill> userSkills = userSkillRepository.findByUserId(userId);

        Map<Long, UserSkill> userSkillMap = new HashMap<>();
        for (UserSkill us : userSkills) {
            userSkillMap.put(us.getSkill().getId(), us);
        }

        return requiredSkills.stream()
                .filter(req -> !userSkillMap.containsKey(req.getSkill().getId()))
                .map(req -> req.getSkill().getName())
                .toList();
    }

    public Map<String, List<User>> getMentorsForMissingSkills(Long userId, Long jobId) {
        List<String> missingSkillNames = getMissingSkills(userId, jobId);
        List<JobRequiredSkill> requiredSkills = jobRequiredSkillRepository.findByJobId(jobId);

        Map<String, List<User>> result = new HashMap<>();

        for (JobRequiredSkill req : requiredSkills) {
            if (missingSkillNames.contains(req.getSkill().getName())) {
                List<User> mentors = userSkillRepository.findBySkillId(req.getSkill().getId())
                        .stream()
                        .map(UserSkill::getUser)
                        .filter(user -> !user.getId().equals(userId))
                        .toList();
                result.put(req.getSkill().getName(), mentors);
            }
        }

        return result;
    }
}