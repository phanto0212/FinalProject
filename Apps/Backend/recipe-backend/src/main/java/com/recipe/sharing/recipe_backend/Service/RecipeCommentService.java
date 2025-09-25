package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.RecipeComment;

import java.util.List;

public interface RecipeCommentService {
    List<RecipeComment> getListByRecipeId(Integer recipeId);
    void addOrUpdate(RecipeComment recipeComment);
    void deleteById(Integer id);
    RecipeComment getById(Integer id);
}
