package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;

import java.util.List;

public interface RecipeIngredientRepository {
    List<RecipeIngredient> getList(Integer recipeId);
    void addOrUpdate(RecipeIngredient recipeIngredient);
    void deleteById(Integer id);
    RecipeIngredient getById(Integer id);

}
