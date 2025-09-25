package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Recipe;

import java.util.List;

public interface RecipeService {
    List<Recipe> getAllWithStatus(String status);
    Recipe getRecipeById(Integer id);
    void addOrUpdate(Recipe recipe);
    void deleteById(Integer id);
}
