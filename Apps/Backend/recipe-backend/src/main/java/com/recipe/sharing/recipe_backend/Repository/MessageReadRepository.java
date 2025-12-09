package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.MessageRead;


public interface MessageReadRepository {
    MessageRead getMessageReadsByMessageId(Long messageId);
    void addOrUpdate(MessageRead messageRead);
    void deleteMessageReadsByMessageId(Long messageId);
}
