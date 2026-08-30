package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.model.UserSkill;
import com.skillbridge.skillbridge.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSkillService {

    @Autowired
    private UserSkillRepository userSkillRepository;

    public UserSkill addUserSkill(UserSkill userSkill) {
        return userSkillRepository.save(userSkill);
    }

    public List<UserSkill> getSkillsByUser(Long userId) {
        return userSkillRepository.findByUserId(userId);
    }

    public List<UserSkill> getUsersBySkill(Long skillId) {
        return userSkillRepository.findBySkillId(skillId);
    }
}