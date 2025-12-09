package com.recipe.sharing.recipe_backend.DTO;

public class StatUserInfo {
    private int recipes;
    private int followers;
    private int following;
    private int likes;

    public StatUserInfo() {
    }

    public int getRecipes() {
        return recipes;
    }

    public void setRecipes(int recipes) {
        this.recipes = recipes;
    }

    public int getFollowers() {
        return followers;
    }

    public void setFollowers(int followers) {
        this.followers = followers;
    }

    public int getFollowing() {
        return following;
    }

    public void setFollowing(int following) {
        this.following = following;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
