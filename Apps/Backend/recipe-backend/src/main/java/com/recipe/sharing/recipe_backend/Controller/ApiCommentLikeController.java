package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.Entity.CommentLike;
import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.RecipeComment;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Service.CommentLikeService;
import com.recipe.sharing.recipe_backend.Service.RecipeCommentService;
import com.recipe.sharing.recipe_backend.Service.RecipeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/comment-like")
@RestController
public class ApiCommentLikeController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private RecipeCommentService recipeCommentService;
    @Autowired
    private CommentLikeService commentLikeService;
    @Autowired
    private RecipeService recipeService;
    @PostMapping("/like/{commentId}")
    public ResponseEntity<?> likeComment(HttpServletRequest request, @PathVariable("commentId") Long commentId) {
        User user = jwtTokenUtil.getUserByToken(request);
        RecipeComment commentRequest = recipeCommentService.getById(commentId.intValue());
       commentLikeService.like(commentId.intValue(), user.getId());
        messagingTemplate.convertAndSend(
                "/topic/message/comment/" + commentRequest.getRecipe().getId(),
                "success"
        );
        return ResponseEntity.ok("ok");
    }
}
