package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.model.User;
import com.skillbridge.skillbridge.model.UserSkill;
import com.skillbridge.skillbridge.model.UserWantsToLearn;
import com.skillbridge.skillbridge.repository.UserSkillRepository;
import com.skillbridge.skillbridge.repository.UserWantsToLearnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    @Autowired
    private UserWantsToLearnRepository userWantsToLearnRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;

    public List<User> findMentorsForUser(Long userId) {
        List<UserWantsToLearn> wantsToLearnList = userWantsToLearnRepository.findByUserId(userId);

        return wantsToLearnList.stream()
                .flatMap(want -> userSkillRepository.findBySkillId(want.getSkill().getId()).stream())
                .map(UserSkill::getUser)
                .filter(user -> !user.getId().equals(userId))
                .distinct()
                .collect(Collectors.toList());
    }
}