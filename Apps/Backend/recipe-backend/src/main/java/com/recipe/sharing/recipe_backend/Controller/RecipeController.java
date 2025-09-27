package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.RecipeStep;
import com.recipe.sharing.recipe_backend.Service.RecipeService;
import com.recipe.sharing.recipe_backend.Service.RecipeStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Controller
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private RecipeStepService recipeStepService;

    @GetMapping("/recipe")
    public String getRecipes(Model model) {
        List<Recipe> recipes = recipeService.getAllWithStatus("P");
        model.addAttribute("recipes", recipes);
        return "recipe";
    }

    @PostMapping("/addRecipe")
    public String addRecipe(@ModelAttribute Recipe newRecipe,
                            Model model) {
        try {
            newRecipe.setCreatedAt(LocalDateTime.now());
            newRecipe.setUpdatedAt(LocalDateTime.now());
            newRecipe.setStatus("P");
            newRecipe.setTotalViews(0);
            newRecipe.setTotalLikes(0);
            newRecipe.setTotalReviews(0);
            newRecipe.setAverageRating(BigDecimal.ZERO);

            recipeService.addOrUpdate(newRecipe);
            return "redirect:/recipe";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error adding recipe");
            return "recipe";
        }
    }

    @PostMapping("/updateRecipe")
    public String updateRecipe(@ModelAttribute Recipe recipe,
                               Model model) {
        try {

            recipe.setUpdatedAt(LocalDateTime.now());
            recipeService.addOrUpdate(recipe);
            return "redirect:/recipe";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error updating recipe");
            return "recipe";
        }
    }

    @PostMapping("/editRecipe/{id}")
    public String editRecipe(@PathVariable("id") Integer id, Model model) {
        Recipe recipe = recipeService.getRecipeById(id);
        model.addAttribute("recipe", recipe);
        return "editRecipe";
    }

    @PostMapping("/deleteRecipe/{id}")
    public String deleteRecipe(@PathVariable("id") Integer id) {
        recipeService.deleteById(id);
        return "redirect:/recipe";
    }

    @PostMapping("/toggleRecipeStatus/{id}")
    public String toggleRecipeStatus(@PathVariable("id") Integer id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if ("PUBLISHED".equals(recipe.getStatus())) {
            recipe.setStatus("DRAFT");
        } else {
            recipe.setStatus("PUBLISHED");
            recipe.setPublishedAt(LocalDateTime.now());
        }
        recipe.setUpdatedAt(LocalDateTime.now());
        recipeService.addOrUpdate(recipe);
        return "redirect:/recipe";
    }

    private String saveFile(MultipartFile file) {
        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get("src/main/resources/static/uploads");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path path = uploadPath.resolve(filename);
            Files.write(path, file.getBytes());
            return filename;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    @GetMapping("/recipe/{id}/steps")
    public String viewRecipeSteps(@PathVariable("id") Integer recipeId, Model model) {
        Recipe recipe = recipeService.getRecipeById(recipeId);
        List<RecipeStep> steps = recipeStepService.getAllByRecipeId(recipeId);

        model.addAttribute("recipe", recipe);
        model.addAttribute("steps", steps);
        model.addAttribute("newStep", new RecipeStep());
        return "addStep";
    }

    @PostMapping("/recipe/{id}/addStep")
    public String addStep(@PathVariable("id") Integer recipeId,
                          @ModelAttribute RecipeStep newStep,
                          Model model) {
        try {
            Recipe recipe = recipeService.getRecipeById(recipeId);
            newStep.setRecipe(recipe);

            // Lưu step mới trước
            List<RecipeStep> existingSteps = recipeStepService.getAllByRecipeId(recipeId);
            newStep.setStepOrder(existingSteps.size() + 1);
            recipeStepService.addOrUpdate(newStep);

            // Reorder lại toàn bộ steps để đảm bảo thứ tự liên tục
            List<RecipeStep> allSteps = recipeStepService.getAllByRecipeId(recipeId);
            for (int i = 0; i < allSteps.size(); i++) {
                allSteps.get(i).setStepOrder(i + 1);
                recipeStepService.addOrUpdate(allSteps.get(i));
            }

            return "redirect:/recipe/" + recipeId + "/steps";
        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error adding step: " + e.getMessage());
            return "redirect:/recipe/" + recipeId + "/steps";
        }
    }

    @PostMapping("/deleteStep/{id}")
    public String deleteStep(@PathVariable("id") Long stepId) {
        RecipeStep step = recipeStepService.getById(stepId.intValue());
        Integer recipeId = step.getRecipe().getId();
        recipeStepService.deleteById(stepId.intValue());
        return "redirect:/recipe/" + recipeId + "/steps";
    }
}