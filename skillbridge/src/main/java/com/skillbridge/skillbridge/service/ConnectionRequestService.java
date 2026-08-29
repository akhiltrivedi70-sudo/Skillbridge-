package com.skillbridge.skillbridge.service;

import com.skillbridge.skillbridge.model.ConnectionRequest;
import com.skillbridge.skillbridge.repository.ConnectionRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionRequestService {

    @Autowired
    private ConnectionRequestRepository connectionRequestRepository;

    public ConnectionRequest sendRequest(ConnectionRequest request) {
        return connectionRequestRepository.save(request);
    }

    public List<ConnectionRequest> getReceivedRequests(Long userId) {
        return connectionRequestRepository.findByReceiverId(userId);
    }

    public List<ConnectionRequest> getSentRequests(Long userId) {
        return connectionRequestRepository.findBySenderId(userId);
    }

    public ConnectionRequest updateStatus(Long requestId, ConnectionRequest.RequestStatus status) {
        ConnectionRequest request = connectionRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus(status);
        return connectionRequestRepository.save(request);
    }
}