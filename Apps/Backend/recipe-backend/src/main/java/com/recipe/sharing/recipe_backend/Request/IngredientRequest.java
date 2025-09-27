package com.recipe.sharing.recipe_backend.Request;

public class IngredientRequest {
    private String name;
    private String amount;

    public IngredientRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
