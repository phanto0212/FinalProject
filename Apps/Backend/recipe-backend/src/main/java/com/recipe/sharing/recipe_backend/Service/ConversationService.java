package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Conversation;

import java.util.List;

public interface ConversationService {
    List<Conversation> getConversations(Long userId);
    Conversation getConversationById(Long id);
    void addOrUpdate(Conversation conversation);
    void deleteById(Long id);
}
