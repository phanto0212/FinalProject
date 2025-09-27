package com.recipe.sharing.recipe_backend.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.recipe.sharing.recipe_backend.DTO.IngredientDTO;
import com.recipe.sharing.recipe_backend.DTO.RecipeDTO;
import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;
import com.recipe.sharing.recipe_backend.Request.PromptRequest;
import com.recipe.sharing.recipe_backend.Service.RecipeIngredientService;
import com.recipe.sharing.recipe_backend.Service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {

    @Autowired
    private RecipeService recipeService;
    @Autowired
    private RecipeIngredientService recipeIngredientService;
    private static final String API_KEY = "";
    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody PromptRequest prompt) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt.getPrompt())))
                )
        );

        ResponseEntity<Map> response =
                restTemplate.postForEntity(GEMINI_URL, body, Map.class);

        Map result = response.getBody();

        // Lấy candidates (list)
        List<Map<String, Object>> candidates = (List<Map<String, Object>>) result.get("candidates");

        // Lấy candidate đầu tiên
        Map<String, Object> candidate = candidates.get(0);

        // Lấy content
        Map<String, Object> content = (Map<String, Object>) candidate.get("content");

        // Lấy parts (list)
        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

        List<Recipe> recipes = recipeService.getAllRecipeSuggestions((String) parts.get(0).get("text"));
        List<RecipeDTO> recipeDTOS = new ArrayList<>();
        for(Recipe recipe : recipes) {
            List<RecipeIngredient> recipeIngredients = recipeIngredientService.getList(recipe.getId());
            List<String> ingredientDTOS = new ArrayList<>();
            for(RecipeIngredient recipeIngredient : recipeIngredients) {
                IngredientDTO ingredientDTO = new IngredientDTO();
                ingredientDTO.setName(recipeIngredient.getIngredient().getName());
                ingredientDTOS.add(recipeIngredient.getIngredient().getName());
            }
            RecipeDTO recipeDTO = new RecipeDTO();
            recipeDTO.setId(recipe.getId());
            recipeDTO.setTitle(recipe.getTitle());
            recipeDTO.setDescription(recipe.getDescription());
            recipeDTO.setImage(recipe.getImageUrl());
            recipeDTO.setTime(recipe.getCookTime().toString());
            recipeDTO.setIngredients(ingredientDTOS);
            recipeDTO.setDifficulty(recipe.getDifficulty());
            recipeDTOS.add(recipeDTO);
        }
        // Lấy text từ part đầu tiên
        String suggestion = (String) parts.get(0).get("text");
        if(suggestion.contains("cancel")){
            suggestion = "";
        }
        Map<String, Object> part = new HashMap<>();
        part.put("title",suggestion);
        part.put("recipes",recipeDTOS);
        return ResponseEntity.ok(part);
    }

}
