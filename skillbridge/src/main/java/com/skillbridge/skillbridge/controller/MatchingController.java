package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.User;
import com.skillbridge.skillbridge.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @GetMapping("/mentors/{userId}")
    public List<User> findMentors(@PathVariable Long userId) {
        return matchingService.findMentorsForUser(userId);
    }
}