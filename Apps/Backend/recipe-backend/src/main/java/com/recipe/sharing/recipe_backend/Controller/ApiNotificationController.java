package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.Configs.TimeUtils;
import com.recipe.sharing.recipe_backend.DTO.NotificationDTO;
import com.recipe.sharing.recipe_backend.Entity.Notification;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping ("/api/notifications")
public class ApiNotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private TimeUtils timeUtils = new TimeUtils();

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllNotifications(HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        List<Notification> notifications = notificationService.getListByUserId(user.getId());
        List<NotificationDTO> notificationDTOs = new ArrayList<>();
        for (Notification notification : notifications) {
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setId(notification.getId().intValue());
            notificationDTO.setMessage(notification.getMessage());
            notificationDTO.setTitle(notification.getTitle());
            notificationDTO.setRead(notification.getRead());
            notificationDTO.setAvatar( notification.getAvatarUrl());
            notificationDTO.setType(notification.getType());
            notificationDTO.setTime(formatRelativeTime(notification.getCreatedAt()));
            notificationDTOs.add(notificationDTO);
        }
        return ResponseEntity.ok().body(notificationDTOs);
    }
    public static String formatRelativeTime(LocalDateTime time) {
        if (time == null) return "";

        LocalDateTime now = LocalDateTime.now();
        long minutes = ChronoUnit.MINUTES.between(time, now);
        long hours = ChronoUnit.HOURS.between(time, now);
        long days = ChronoUnit.DAYS.between(time, now);

        if (minutes < 1) return "Vừa xong";
        if (minutes < 60) return minutes + " phút trước";
        if (hours < 24) return hours + " giờ trước";
        if (days < 7) return days + " ngày trước";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return time.format(formatter);
    }
}
