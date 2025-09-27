package com.recipe.sharing.recipe_backend.Request;

import java.util.List;

public class RecipeRequest {
    private Integer id;
    private String title;
    private String subtitle;
    private String image;
    private int cookTime;
    private String difficulty;
    private int servings;
    private float rating;
    private int reviewCount;
    private int calories;
    private List<IngredientRequest> ingredients;
    private List<String> instructions;
    private NutritionRequest nutrition;
    private ChefRequest chef;
    private List<String> tags;
    public RecipeRequest() {
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

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public List<IngredientRequest> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientRequest> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    public NutritionRequest getNutrition() {
        return nutrition;
    }

    public void setNutrition(NutritionRequest nutrition) {
        this.nutrition = nutrition;
    }

    public ChefRequest getChef() {
        return chef;
    }

    public void setChef(ChefRequest chef) {
        this.chef = chef;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
