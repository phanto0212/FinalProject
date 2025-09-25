package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.RecipeStep;

import java.util.List;

public interface RecipeStepRepository {
    List<RecipeStep> getAllByRecipeId(Integer recipeId);
    void addOrUpdate(RecipeStep recipeStep);
    void deleteById(Integer id);
}
