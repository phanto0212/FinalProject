package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Conversation;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class ConversationRepositoryImpl implements ConversationRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Conversation> getConversations(Long userId) {
        String hql = "select c from Conversation c where c.user1Id = :userId or c.user2Id = :userId";
        return em.createQuery(hql, Conversation.class).setParameter("userId", userId).getResultList();
    }

    @Override
    public Conversation getConversationById(Long id) {
        return   em.find(Conversation.class, id);
    }

    @Override
    public void addOrUpdate(Conversation conversation) {
        if (conversation.getId() == null) {
            em.persist(conversation);
        } else {
            em.merge(conversation);
        }
    }

    @Override
    public void deleteById(Long id) {
        Conversation conversation = em.find(Conversation.class, id);
        if (conversation != null) {
            em.remove(conversation);
        }
    }
}
