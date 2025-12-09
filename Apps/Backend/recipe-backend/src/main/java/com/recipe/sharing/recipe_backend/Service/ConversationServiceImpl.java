package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Conversation;
import com.recipe.sharing.recipe_backend.Repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationServiceImpl implements ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;
    @Override
    public List<Conversation> getConversations(Long userId) {
        return conversationRepository.getConversations(userId);
    }

    @Override
    public Conversation getConversationById(Long id) {
        return  conversationRepository.getConversationById(id);
    }

    @Override
    public void addOrUpdate(Conversation conversation) {
        conversationRepository.addOrUpdate(conversation);
    }

    @Override
    public void deleteById(Long id) {
        conversationRepository.deleteById(id);
    }
}
