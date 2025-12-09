package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.MessageRead;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class MessageReadRepositoryImpl implements MessageReadRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public MessageRead getMessageReadsByMessageId(Long messageId) {
        String hql = "SELECT m FROM MessageRead m WHERE m.messageId = :messageId";
        return em.createQuery(hql, MessageRead.class).setParameter("messageId", messageId).getSingleResult();
    }

    @Override
    public void addOrUpdate(MessageRead messageRead) {
        if (messageRead.getId() == null) {
            em.persist(messageRead);
        } else {
            em.merge(messageRead);
        }
    }

    @Override
    public void deleteMessageReadsByMessageId(Long messageId) {

        String hql = "DELETE FROM MessageRead m WHERE m.messageId = :messageId";
        em.createQuery(hql).setParameter("messageId", messageId).executeUpdate();
    }
}
