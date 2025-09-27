package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;
import com.recipe.sharing.recipe_backend.Entity.RecipeStep;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Request.ChefRequest;
import com.recipe.sharing.recipe_backend.Request.IngredientRequest;
import com.recipe.sharing.recipe_backend.Request.NutritionRequest;
import com.recipe.sharing.recipe_backend.Request.RecipeRequest;
import com.recipe.sharing.recipe_backend.Service.RecipeIngredientService;
import com.recipe.sharing.recipe_backend.Service.RecipeService;
import com.recipe.sharing.recipe_backend.Service.RecipeStepService;
import com.recipe.sharing.recipe_backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
public class ApiRecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeIngredientService recipeIngredientService;

    @Autowired
    private RecipeStepService recipeStepService;

    @GetMapping("/get/recipe/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable("id") Integer id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if(recipe == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found");
        }
        User user = userService.getUserById(recipe.getChefId().intValue());
        RecipeRequest recipeRequest = new RecipeRequest();
        recipeRequest.setId(recipe.getId());
        recipeRequest.setTitle(recipe.getTitle());
        recipeRequest.setSubtitle(recipe.getSubtitle());
        recipeRequest.setImage( recipe.getImageUrl());
        recipeRequest.setCookTime(recipe.getCookTime());
        recipeRequest.setDifficulty(recipe.getDifficulty());
        recipeRequest.setServings(recipe.getServings());
        recipeRequest.setRating(recipe.getAverageRating().floatValue());
        recipeRequest.setReviewCount(recipe.getTotalReviews());
        recipeRequest.setCalories(recipe.getCalories());
        List<RecipeIngredient> recipeIngredients = recipeIngredientService.getList(recipe.getId());
        List<IngredientRequest> ingredients = new ArrayList<>();
        for(RecipeIngredient ri : recipeIngredients) {
            IngredientRequest ingredientRequest = new IngredientRequest();
            ingredientRequest.setName(ri.getIngredient().getName());
            ingredientRequest.setAmount(ri.getQuantity().intValue() + " " + ri.getUnit());
            ingredients.add(ingredientRequest);
        }
        List<RecipeStep> steps = recipeStepService.getAllByRecipeId(recipe.getId());
        List<String> instructions = new ArrayList<>();
        for( RecipeStep step : steps) {
            instructions.add(step.getInstruction());
        }
        recipeRequest.setIngredients(ingredients);
        recipeRequest.setInstructions(instructions);
        NutritionRequest nutrition = new NutritionRequest();
        nutrition.setCalories(recipe.getCalories());
        nutrition.setCarbs(recipe.getCarbs());
        nutrition.setProtein(recipe.getProtein());
        nutrition.setFat(recipe.getFat());
        recipeRequest.setNutrition(nutrition);
        ChefRequest chef = new ChefRequest();
        chef.setAvatar(user.getAvatar_url());
        chef.setName(user.getFullName());
        chef.setTitle(user.getFullName());
        chef.setBio(user.getFullName());
        recipeRequest.setChef(chef);
        List<String> tags = new ArrayList<>();
        tags.add(recipe.getCategory());
        recipeRequest.setTags(tags);
        Map<String, Object> response = new HashMap<>();
        response.put("recipe", recipeRequest);
        return ResponseEntity.ok(response);
    }
}
