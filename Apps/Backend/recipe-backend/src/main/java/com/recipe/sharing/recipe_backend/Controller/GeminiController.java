package com.recipe.sharing.recipe_backend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {

    private static final String API_KEY = "AIzaSyA7S0cz83mjPMLqVwJqXJxuLlQXHaDc8I4";
    private static final String GEMINI_URL =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

    @PostMapping("/chat")
    public String chat(@RequestBody String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
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

        // Lấy text từ part đầu tiên
        return (String) parts.get(0).get("text");
    }
}
