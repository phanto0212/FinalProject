package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.UserRecipeInteraction;
import com.recipe.sharing.recipe_backend.Repository.UserRecipeInteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRecipeInteractionServiceImpl implements UserRecipeInteractionService {

    @Autowired
    private UserRecipeInteractionRepository userRecipeInteractionRepository;
    @Override
    public List<UserRecipeInteraction> getList() {
        return  userRecipeInteractionRepository.getList();
    }

    @Override
    public UserRecipeInteraction getById(Integer id) {
        return   userRecipeInteractionRepository.getById(id);
    }

    @Override
    public void addOrUpdate(UserRecipeInteraction interaction) {

        userRecipeInteractionRepository.addOrUpdate(interaction);
    }

    @Override
    public void deleteById(Integer id) {

        userRecipeInteractionRepository.deleteById(id);
    }

    @Override
    public UserRecipeInteraction getByUserIdAndRecipeId(Long userId, Integer recipeId) {
        return   userRecipeInteractionRepository.getByUserIdAndRecipeId(userId, recipeId);
    }
}
