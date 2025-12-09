package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.MessageRead;
import com.recipe.sharing.recipe_backend.Repository.MessageReadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageReadServiceImpl implements  MessageReadService {

    @Autowired
    private MessageReadRepository messageReadRepository;
    @Override
    public MessageRead getMessageReadsByMessageId(Long messageId) {
        return  messageReadRepository.getMessageReadsByMessageId(messageId);
    }

    @Override
    public void addOrUpdate(MessageRead messageRead) {
        messageReadRepository.addOrUpdate(messageRead);
    }

    @Override
    public void deleteMessageReadsByMessageId(Long messageId) {
        messageReadRepository.deleteMessageReadsByMessageId(messageId);
    }
}
