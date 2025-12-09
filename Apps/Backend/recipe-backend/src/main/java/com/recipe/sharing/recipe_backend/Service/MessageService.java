package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Message;

import java.util.List;

public interface MessageService {
    List<Message> getMessagesByConversationId(Long conversationId);
    void addOrUpdate(Message message);
    void deleteById(Long id);
    List<Message> getLastMessagesForConversation(Long conversationId, int limit);
    List<Message> getUnReadMessageByConversation(Long conversationId, Long userId);
    Message getRepplyMessage(Long repplyMessageId);
}
