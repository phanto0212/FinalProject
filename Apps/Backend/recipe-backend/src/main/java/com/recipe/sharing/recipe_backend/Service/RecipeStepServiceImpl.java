package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.RecipeStep;
import com.recipe.sharing.recipe_backend.Repository.RecipeStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RecipeStepServiceImpl implements  RecipeStepService {

    @Autowired
    private RecipeStepRepository recipeStepRepository;
    @Override
    public List<RecipeStep> getAllByRecipeId(Integer recipeId) {
        return recipeStepRepository.getAllByRecipeId(recipeId);
    }

    @Override
    public void addOrUpdate(RecipeStep recipeStep) {
        recipeStepRepository.addOrUpdate(recipeStep);
    }

    @Override
    public void deleteById(Integer id) {
        recipeStepRepository.deleteById(id);
    }

    @Override
    public RecipeStep getById(Integer id) {
        return recipeStepRepository.getById(id);
    }
}
