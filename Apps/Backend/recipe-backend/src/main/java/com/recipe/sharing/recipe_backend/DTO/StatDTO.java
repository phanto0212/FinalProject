package com.recipe.sharing.recipe_backend.DTO;

public class StatDTO {
    private float averageRating;
    private int totalViews;
    private String popularRecipe;
    private String memberSince;
    public StatDTO() {
    }

    public float getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(float averageRating) {
        this.averageRating = averageRating;
    }

    public int getTotalViews() {
        return totalViews;
    }

    public void setTotalViews(int totalViews) {
        this.totalViews = totalViews;
    }

    public String getPopularRecipe() {
        return popularRecipe;
    }

    public void setPopularRecipe(String popularRecipe) {
        this.popularRecipe = popularRecipe;
    }

    public String getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(String memberSince) {
        this.memberSince = memberSince;
    }
}
