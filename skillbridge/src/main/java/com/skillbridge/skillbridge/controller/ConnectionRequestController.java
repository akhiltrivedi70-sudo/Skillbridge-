package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.ConnectionRequest;
import com.skillbridge.skillbridge.service.ConnectionRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
public class ConnectionRequestController {

    @Autowired
    private ConnectionRequestService connectionRequestService;

    @PostMapping("/send")
    public ConnectionRequest sendRequest(@RequestBody ConnectionRequest request) {
        return connectionRequestService.sendRequest(request);
    }

    @GetMapping("/received/{userId}")
    public List<ConnectionRequest> getReceivedRequests(@PathVariable Long userId) {
        return connectionRequestService.getReceivedRequests(userId);
    }

    @GetMapping("/sent/{userId}")
    public List<ConnectionRequest> getSentRequests(@PathVariable Long userId) {
        return connectionRequestService.getSentRequests(userId);
    }

    @PutMapping("/{requestId}/accept")
    public ConnectionRequest acceptRequest(@PathVariable Long requestId) {
        return connectionRequestService.updateStatus(requestId, ConnectionRequest.RequestStatus.ACCEPTED);
    }

    @PutMapping("/{requestId}/reject")
    public ConnectionRequest rejectRequest(@PathVariable Long requestId) {
        return connectionRequestService.updateStatus(requestId, ConnectionRequest.RequestStatus.REJECTED);
    }
}