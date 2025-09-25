package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Enum.RecipeStatus;
import com.recipe.sharing.recipe_backend.Repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RecipeServiceImpl implements  RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;
    @Override
    public List<Recipe> getAllWithStatus(String status) {
        return recipeRepository.getAllWithStatus(status);
    }

    @Override
    public Recipe getRecipeById(Integer id) {
        return   recipeRepository.getRecipeById(id);
    }

    @Override
    public void addOrUpdate(Recipe recipe) {
        recipeRepository.addOrUpdate(recipe);
    }

    @Override
    public void deleteById(Integer id) {
        recipeRepository.deleteById(id);
    }
}
