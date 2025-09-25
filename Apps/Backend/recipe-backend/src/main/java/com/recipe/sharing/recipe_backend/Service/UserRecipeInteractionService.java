package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.UserRecipeInteraction;

import java.util.List;

public interface UserRecipeInteractionService {
    List<UserRecipeInteraction> getList();
    UserRecipeInteraction getById(Integer id);
    void addOrUpdate(UserRecipeInteraction interaction);
    void deleteById(Integer id);
    UserRecipeInteraction getByUserIdAndRecipeId(Long userId, Integer recipeId);
}
