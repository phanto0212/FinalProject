package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Entity.Ingredient;
import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;
import com.recipe.sharing.recipe_backend.Service.IngredientService;
import com.recipe.sharing.recipe_backend.Service.RecipeIngredientService;
import com.recipe.sharing.recipe_backend.Service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class RecipeIngredientController {
    @Autowired
    private RecipeIngredientService recipeIngredientService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/recipe/{id}/ingredients")
    public String viewRecipeIngredients(@PathVariable("id") Integer recipeId, Model model) {
        Recipe recipe = recipeService.getRecipeById(recipeId);
        List<RecipeIngredient> ingredients = recipeIngredientService.getList(recipeId);
        List<Ingredient> allIngredients = ingredientService.getList();

        model.addAttribute("recipe", recipe);
        model.addAttribute("ingredients", ingredients);
        model.addAttribute("allIngredients", allIngredients);
        model.addAttribute("newIngredient", new RecipeIngredient());
        return "addRecipeIngredient";
    }

    @PostMapping("/recipe/{id}/addIngredient")
    public String addIngredient(@PathVariable("id") Integer recipeId,
                                @ModelAttribute RecipeIngredient newIngredient,
                                @RequestParam("ingredientId") Integer ingredientId,
                                Model model) {
        try {
            Recipe recipe = recipeService.getRecipeById(recipeId);
            Ingredient ingredient = ingredientService.getById(ingredientId);

            newIngredient.setRecipe(recipe);
            newIngredient.setIngredient(ingredient);

            recipeIngredientService.addOrUpdate(newIngredient);
            return "redirect:/recipe/" + recipeId + "/ingredients";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error adding ingredient: " + e.getMessage());
            return "redirect:/recipe/" + recipeId + "/ingredients";
        }
    }

    @PostMapping("/deleteRecipeIngredient/{id}")
    public String deleteIngredient(@PathVariable("id") Integer ingredientId) {
        RecipeIngredient ingredient = recipeIngredientService.getById(ingredientId);
        Integer recipeId = ingredient.getRecipe().getId();
        recipeIngredientService.deleteById(ingredientId);
        return "redirect:/recipe/" + recipeId + "/ingredients";
    }
}
