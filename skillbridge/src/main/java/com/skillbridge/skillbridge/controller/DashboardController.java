package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/user/{userId}")
    public Map<String, Object> getUserDashboard(@PathVariable Long userId) {
        return dashboardService.getUserDashboard(userId);
    }

    @GetMapping("/admin")
    public Map<String, Object> getAdminDashboard() {
        return dashboardService.getAdminDashboard();
    }
}