package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Notification;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class NotificationRepositoryImpl implements NotificationRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public List<Notification> getListByUserId(Long userId) {
        String hql = "SELECT n FROM Notification n WHERE n.relatedUserId = :userId";
        Query query = em.createQuery(hql);
        query.setParameter("userId", userId);
        List<Notification> notifications = query.getResultList();
        return notifications;
    }

    @Override
    public Notification getNotificationById(Long id) {
        return  em.find(Notification.class, id);
    }

    @Override
    public void addNotification(Notification notification) {

        if(notification.getId() == null){
            em.persist(notification);
        }else{
            em.merge(notification);
        }
    }

    @Override
    public void deleteNotification(Notification notification) {

        em.remove(notification);
    }
}
