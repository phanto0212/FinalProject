package com.recipe.sharing.recipe_backend.Repository;


import com.recipe.sharing.recipe_backend.Entity.Notification;

import java.util.List;

public interface NotificationRepository {
    List<Notification> getListByUserId(Long userId);
    Notification getNotificationById(Long id);
    void addNotification(Notification notification);
    void deleteNotification(Notification notification);
}
