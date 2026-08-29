package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConnectionRequestRepository connectionRequestRepository;

    @Autowired
    private AssessmentResultRepository assessmentResultRepository;

    public Map<String, Object> getUserDashboard(Long userId) {
        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("unreadMessages", messageRepository.findByReceiverIdAndIsReadFalse(userId).size());
        dashboard.put("receivedRequests", connectionRequestRepository.findByReceiverId(userId).size());
        dashboard.put("sentRequests", connectionRequestRepository.findBySenderId(userId).size());
        dashboard.put("assessmentsTaken", assessmentResultRepository.findByUserId(userId).size());

        return dashboard;
    }

    public Map<String, Object> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("totalUsers", userRepository.count());
        dashboard.put("totalSkills", skillRepository.count());
        dashboard.put("totalJobs", jobRepository.count());

        return dashboard;
    }
}