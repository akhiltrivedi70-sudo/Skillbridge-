package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.UserWantsToLearn;
import com.skillbridge.skillbridge.service.UserWantsToLearnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wants-to-learn")
public class UserWantsToLearnController {

    @Autowired
    private UserWantsToLearnService userWantsToLearnService;

    @PostMapping("/add")
    public UserWantsToLearn addWantToLearn(@RequestBody UserWantsToLearn userWantsToLearn) {
        return userWantsToLearnService.addWantToLearn(userWantsToLearn);
    }

    @GetMapping("/user/{userId}")
    public List<UserWantsToLearn> getWantsToLearnByUser(@PathVariable Long userId) {
        return userWantsToLearnService.getWantsToLearnByUser(userId);
    }
}