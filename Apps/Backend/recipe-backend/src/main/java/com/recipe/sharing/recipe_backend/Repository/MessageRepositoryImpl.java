package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Message;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class MessageRepositoryImpl implements MessageRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public List<Message> getMessagesByConversationId(Long conversationId) {
        String hql = "FROM Message m WHERE m.conversationId = :conversationId";
        return em.createQuery(hql, Message.class).setParameter("conversationId", conversationId).getResultList();
    }

    @Override
    public void addOrUpdate(Message message) {
        if (message.getId() == null) {
            em.persist(message);
        } else {
            em.merge(message);
        }
    }

    @Override
    public void deleteById(Long id) {
        Message message = em.find(Message.class, id);
        if (message != null) {
            em.remove(message);
        }
    }

    @Override
    public List<Message> getLastMessagesForConversation(Long conversationId, int limit) {
        String hql = "FROM Message m " +
                "WHERE m.conversationId = :conversationId " +
                "ORDER BY m.createdAt DESC";

        return em.createQuery(hql, Message.class)
                .setParameter("conversationId", conversationId)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public List<Message> getUnReadMessageByConversation(Long conversationId, Long userId) {
        String hql = "FROM Message m " +
                "WHERE m.conversationId = :conversationId and m.senderId = :userId " +
                "AND m.isRead = false";
        return  em.createQuery(hql, Message.class)
                .setParameter("conversationId", conversationId)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Override
    public Message getRepplyMessage(Long repplyMessageId) {
        String hql = "FROM Message m WHERE m.id = :repplyMessageId";

        return   em.createQuery(hql, Message.class)
                .setParameter("repplyMessageId", repplyMessageId)
                .getResultStream()
                .findFirst()
                .orElse(null);
    }
}
