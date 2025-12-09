package com.recipe.sharing.recipe_backend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;

public class ConversationDTO {

    private Long id;
    private UserDTO user;
    private String lastMessage;
    private String timestamp;
    private int unRead;
    private Boolean isOwn;
    @JsonIgnore
    private Timestamp rawTimestamp;

    public ConversationDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public int getUnRead() {
        return unRead;
    }

    public void setUnRead(int unRead) {
        this.unRead = unRead;
    }

    public Boolean getOwn() {
        return isOwn;
    }

    public void setOwn(Boolean own) {
        isOwn = own;
    }

    public Timestamp getRawTimestamp() {
        return rawTimestamp;
    }

    public void setRawTimestamp(Timestamp rawTimestamp) {
        this.rawTimestamp = rawTimestamp;
    }
}
