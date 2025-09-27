package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Recipe;

import java.util.List;

public interface RecipeRepository {
    List<Recipe> getAllWithStatus(String status);
    Recipe getRecipeById(Integer id);
    void addOrUpdate(Recipe recipe);
    void deleteById(Integer id);
    List<Recipe> getAllRecipeSuggestions( String keyword);

}
