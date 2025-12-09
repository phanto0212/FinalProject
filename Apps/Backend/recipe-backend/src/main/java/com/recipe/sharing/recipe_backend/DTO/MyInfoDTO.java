package com.recipe.sharing.recipe_backend.DTO;

import java.time.LocalDateTime;

public class MyInfoDTO {
    private String name;
    private String email;
    private String phone;
    private String bio;
    private String location;
    private LocalDateTime joinDate;
    private String avatar;
    private StatMyInfoDTO stats;
    public MyInfoDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDateTime joinDate) {
        this.joinDate = joinDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public StatMyInfoDTO getStats() {
        return stats;
    }

    public void setStats(StatMyInfoDTO stats) {
        this.stats = stats;
    }
}
