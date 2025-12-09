package com.recipe.sharing.recipe_backend.DTO;

public class RecipeInfoDTO {
    private Long id;
    private String title;
    private String image;
    private String cookTime;
    private String difficulty;
    private StatRecipeDTO stats;
    public RecipeInfoDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCookTime() {
        return cookTime;
    }

    public void setCookTime(String cookTime) {
        this.cookTime = cookTime;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public StatRecipeDTO getStats() {
        return stats;
    }

    public void setStats(StatRecipeDTO stats) {
        this.stats = stats;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
