package com.recipe.sharing.recipe_backend.DTO;

public class MessageDTO {

    private Long id;
    private String text;
    private String timestamp;
    private Boolean isOwn;
    private Boolean read;
    private RecipeMessageDTO recipe;
    private RepplyToDTO replyTo;

    public MessageDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Boolean getOwn() {
        return isOwn;
    }

    public void setOwn(Boolean own) {
        isOwn = own;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public RepplyToDTO getReplyTo() {
        return replyTo;
    }

    public void setReplyTo(RepplyToDTO replyTo) {
        this.replyTo = replyTo;
    }

    public RecipeMessageDTO getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeMessageDTO recipe) {
        this.recipe = recipe;
    }
}
