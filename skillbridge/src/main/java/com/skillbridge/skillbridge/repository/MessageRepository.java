package com.skillbridge.skillbridge.repository;

import com.skillbridge.skillbridge.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderBySentAtAsc(
            Long senderId1, Long receiverId1, Long senderId2, Long receiverId2);

    List<Message> findByReceiverIdAndIsReadFalse(Long receiverId);
}