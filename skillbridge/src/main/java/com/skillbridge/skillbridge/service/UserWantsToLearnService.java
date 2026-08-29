package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.model.UserWantsToLearn;
import com.skillbridge.skillbridge.repository.UserWantsToLearnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserWantsToLearnService {

    @Autowired
    private UserWantsToLearnRepository userWantsToLearnRepository;

    public UserWantsToLearn addWantToLearn(UserWantsToLearn userWantsToLearn) {
        return userWantsToLearnRepository.save(userWantsToLearn);
    }

    public List<UserWantsToLearn> getWantsToLearnByUser(Long userId) {
        return userWantsToLearnRepository.findByUserId(userId);
    }
}