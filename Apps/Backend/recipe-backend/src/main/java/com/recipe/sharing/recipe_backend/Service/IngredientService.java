package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Ingredient;

import java.util.List;

public interface IngredientService {
    List<Ingredient> getList();
    void addOrUpdate(Ingredient ingredient);
    void deleteById(Integer id);
    Ingredient getById(Integer id);
}
