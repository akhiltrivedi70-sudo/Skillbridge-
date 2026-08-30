package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.UserSkill;
import com.skillbridge.skillbridge.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-skills")
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    @PostMapping("/add")
    public UserSkill addUserSkill(@RequestBody UserSkill userSkill) {
        return userSkillService.addUserSkill(userSkill);
    }

    @GetMapping("/user/{userId}")
    public List<UserSkill> getSkillsByUser(@PathVariable Long userId) {
        return userSkillService.getSkillsByUser(userId);
    }

    @GetMapping("/skill/{skillId}")
    public List<UserSkill> getUsersBySkill(@PathVariable Long skillId) {
        return userSkillService.getUsersBySkill(skillId);
    }
}