package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.ConnectionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnectionRequestRepository extends JpaRepository<ConnectionRequest, Long> {
    List<ConnectionRequest> findByReceiverId(Long receiverId);
    List<ConnectionRequest> findBySenderId(Long senderId);
}