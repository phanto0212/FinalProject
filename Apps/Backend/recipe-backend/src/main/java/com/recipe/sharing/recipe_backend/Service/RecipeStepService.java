package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.RecipeStep;

import java.util.List;

public interface RecipeStepService {
    List<RecipeStep> getAllByRecipeId(Integer recipeId);
    void addOrUpdate(RecipeStep recipeStep);
    void deleteById(Integer id);
}
