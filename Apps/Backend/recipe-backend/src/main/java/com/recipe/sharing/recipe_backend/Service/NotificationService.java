package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getListByUserId(Long userId);
    Notification getNotificationById(Long id);
    void addNotification(Notification notification);
    void deleteNotification(Notification notification);
}
