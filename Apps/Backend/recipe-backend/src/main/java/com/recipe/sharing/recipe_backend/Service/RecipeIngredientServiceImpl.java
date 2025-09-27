package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;
import com.recipe.sharing.recipe_backend.Repository.RecipeIngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RecipeIngredientServiceImpl implements RecipeIngredientService {

    @Autowired
    private RecipeIngredientRepository recipeIngredientRepository;
    @Override
    public List<RecipeIngredient> getList(Integer recipeId) {
        return recipeIngredientRepository.getList(recipeId);
    }

    @Override
    public void addOrUpdate(RecipeIngredient recipeIngredient) {
        recipeIngredientRepository.addOrUpdate(recipeIngredient);
    }

    @Override
    public void deleteById(Integer id) {
        recipeIngredientRepository.deleteById(id);
    }

    @Override
    public RecipeIngredient getById(Integer id) {
        return   recipeIngredientRepository.getById(id);
    }
}
