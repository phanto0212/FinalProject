package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Ingredient;
import com.recipe.sharing.recipe_backend.Repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;
    @Override
    public List<Ingredient> getList() {
        return  ingredientRepository.getList();
    }

    @Override
    public void addOrUpdate(Ingredient ingredient) {
        ingredientRepository.addOrUpdate(ingredient);
    }

    @Override
    public void deleteById(Integer id) {
        ingredientRepository.deleteById(id);
    }

    @Override
    public Ingredient getById(Integer id) {
        return  ingredientRepository.getById(id);
    }
}
