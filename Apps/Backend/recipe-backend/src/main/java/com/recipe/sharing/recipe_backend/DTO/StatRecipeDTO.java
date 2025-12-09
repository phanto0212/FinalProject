package com.recipe.sharing.recipe_backend.DTO;

public class StatRecipeDTO {
    private int likes;
    private int comments;
    private int views;
    public StatRecipeDTO() {
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
}
