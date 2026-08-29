package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.UserWantsToLearn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserWantsToLearnRepository extends JpaRepository<UserWantsToLearn, Long> {
    List<UserWantsToLearn> findByUserId(Long userId);
}