package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.RecipeComment;
import com.recipe.sharing.recipe_backend.Repository.RecipeCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RecipeCommentServiceImpl implements RecipeCommentService {

    @Autowired
    private RecipeCommentRepository recipeCommentRepository;
    @Override
    public List<RecipeComment> getListByRecipeId(Integer recipeId) {
        return recipeCommentRepository.getListByRecipeId(recipeId);
    }

    @Override
    public void addOrUpdate(RecipeComment recipeComment) {
        recipeCommentRepository.addOrUpdate(recipeComment);
    }

    @Override
    public void deleteById(Integer id) {

        recipeCommentRepository.deleteById(id);
    }

    @Override
    public RecipeComment getById(Integer id) {
        return  recipeCommentRepository.getById(id);
    }
}
