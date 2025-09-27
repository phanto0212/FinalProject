package com.recipe.sharing.recipe_backend.DTO;

import java.util.List;

public class RecipeDTO {
    Integer id;
    String title;
    String description;
    String image;
    String time;
    String difficulty;
    List<String> ingredients;

    public RecipeDTO() {
    }

    public RecipeDTO(Integer id, String title, String description, String image, String time, String difficulty, List<String> ingredients) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.time = time;
        this.difficulty = difficulty;
        this.ingredients = ingredients;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}
