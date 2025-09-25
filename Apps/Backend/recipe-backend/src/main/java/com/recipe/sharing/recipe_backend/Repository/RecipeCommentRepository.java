package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.RecipeComment;

import java.util.List;

public interface RecipeCommentRepository {
    List<RecipeComment> getListByRecipeId(Integer recipeId);
    void addOrUpdate(RecipeComment recipeComment);
    void deleteById(Integer id);
    RecipeComment getById(Integer id);
}
