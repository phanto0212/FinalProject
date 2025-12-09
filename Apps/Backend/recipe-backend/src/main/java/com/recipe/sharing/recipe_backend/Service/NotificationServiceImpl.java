package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Notification;
import com.recipe.sharing.recipe_backend.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;
    @Override
    public List<Notification> getListByUserId(Long userId) {
        return notificationRepository.getListByUserId(userId);
    }

    @Override
    public Notification getNotificationById(Long id) {
        return  notificationRepository.getNotificationById(id);
    }

    @Override
    public void addNotification(Notification notification) {
        notificationRepository.addNotification(notification);
    }

    @Override
    public void deleteNotification(Notification notification) {
        notificationRepository.deleteNotification(notification);
    }
}
