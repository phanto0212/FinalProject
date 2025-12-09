package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.TypingIndicator;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class TypingIndicatorRepositoryImpl implements  TypingIndicatorRepository {

//    @PersistenceContext
//    private EntityManager em;
//    @Override
//    public void addOrUpdate(TypingIndicator typingIndicator) {
//        if (typingIndicator.getId() == null) {
//            em.persist(typingIndicator);
//        } else {
//            em.merge(typingIndicator);
//        }
//    }
//
//    @Override
//    public TypingIndicator getByConversationId(Long conversationId) {
//        String hql = "FROM TypingIndicator t WHERE t.conversationId = :conversationId";
//        return  em.createQuery(hql, TypingIndicator.class)
//                .setParameter("conversationId", conversationId)
//                .getResultStream()
//                .findFirst()
//                .orElse(null);
//    }
}
