package com.recipe.sharing.recipe_backend.DTO;

public class IngredientDTO {
    String name;

    public IngredientDTO() {
    }

    public IngredientDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
