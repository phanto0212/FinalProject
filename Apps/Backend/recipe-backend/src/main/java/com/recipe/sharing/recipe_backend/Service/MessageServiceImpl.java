package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Message;
import com.recipe.sharing.recipe_backend.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl  implements MessageService {

    @Autowired
    private MessageRepository messageRepository;
    @Override
    public List<Message> getMessagesByConversationId(Long conversationId) {
        return   messageRepository.getMessagesByConversationId(conversationId);
    }

    @Override
    public void addOrUpdate(Message message) {
        messageRepository.addOrUpdate(message);
    }

    @Override
    public void deleteById(Long id) {
        messageRepository.deleteById(id);
    }

    @Override
    public List<Message> getLastMessagesForConversation(Long conversationId, int limit) {
        return  messageRepository.getLastMessagesForConversation(conversationId, limit);
    }

    @Override
    public List<Message> getUnReadMessageByConversation(Long conversationId, Long userId) {
        return  messageRepository.getUnReadMessageByConversation(conversationId, userId);
    }

    @Override
    public Message getRepplyMessage(Long repplyMessageId) {
        return  messageRepository.getRepplyMessage(repplyMessageId);
    }


}
