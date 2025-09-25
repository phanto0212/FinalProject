package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;

import java.util.List;

public interface RecipeIngredientService {
    List<RecipeIngredient> getList(Integer recipeId);
    void addOrUpdate(RecipeIngredient recipeIngredient);
    void deleteById(Integer id);
}
