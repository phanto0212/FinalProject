package com.recipe.sharing.recipe_backend.DTO;

public class IngredientRequestDTO {
    private Integer id;
    private String name;

    public IngredientRequestDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
