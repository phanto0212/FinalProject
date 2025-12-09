package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.MessageRead;

public interface MessageReadService {
    MessageRead getMessageReadsByMessageId(Long messageId);
    void addOrUpdate(MessageRead messageRead);
    void deleteMessageReadsByMessageId(Long messageId);
}
