package com.skillbridge.skillbridge.controller;

import com.skillbridge.skillbridge.model.Message;
import com.skillbridge.skillbridge.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public Message sendMessage(@RequestBody Message message) {
        return messageService.sendMessage(message);
    }

    @GetMapping("/conversation")
    public List<Message> getConversation(@RequestParam Long user1Id, @RequestParam Long user2Id) {
        return messageService.getConversation(user1Id, user2Id);
    }

    @GetMapping("/unread/{userId}")
    public List<Message> getUnreadMessages(@PathVariable Long userId) {
        return messageService.getUnreadMessages(userId);
    }

    @PutMapping("/{messageId}/read")
    public Message markAsRead(@PathVariable Long messageId) {
        return messageService.markAsRead(messageId);
    }

    @DeleteMapping("/{messageId}")
    public String deleteMessage(@PathVariable Long messageId) {
        messageService.deleteMessage(messageId);
        return "Message deleted successfully";
    }
}