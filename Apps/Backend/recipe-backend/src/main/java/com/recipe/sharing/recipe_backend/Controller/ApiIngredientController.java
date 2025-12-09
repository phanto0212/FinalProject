package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.DTO.IngredientRequestDTO;
import com.recipe.sharing.recipe_backend.Entity.Ingredient;
import com.recipe.sharing.recipe_backend.Service.IngredientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ingredients")
public class ApiIngredientController {

    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllIngredients(HttpServletRequest request){
        List<Ingredient > ingredients = ingredientService.getList();
        List<IngredientRequestDTO> ingredientDTOs = new ArrayList<>();
        for (Ingredient ingredient : ingredients) {
            IngredientRequestDTO dto = new IngredientRequestDTO();
            dto.setId(ingredient.getId().intValue());
            dto.setName(ingredient.getName());
            ingredientDTOs.add(dto);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("ingredients", ingredientDTOs);
        return ResponseEntity.ok(response);

    }
}
