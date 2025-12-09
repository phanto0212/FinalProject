package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.DTO.CommentDTO;
import com.recipe.sharing.recipe_backend.Entity.CommentReply;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Request.CommentRepllyRequest;
import com.recipe.sharing.recipe_backend.Service.CommentRepplyService;
import com.recipe.sharing.recipe_backend.Service.RecipeCommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comment-replies")
public class ApiCommentRepplyController {

    @Autowired
    private CommentRepplyService commentRepplyService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private RecipeCommentService recipeCommentService;
    @PostMapping("/add")
    public ResponseEntity<?> addComment(@RequestBody CommentRepllyRequest commentReplly, HttpServletRequest request) {
        try{
            User user = jwtTokenUtil.getUserByToken(request);
            CommentReply commentReply = new CommentReply();
            commentReply.setUser(user);
            commentReply.setComment(recipeCommentService.getById(commentReplly.getCommentId()));
            commentReply.setContent(commentReplly.getContent());
            commentReply.setCreatedAt(java.time.LocalDateTime.now());
            commentReply.setMentionedUser(recipeCommentService.getById(commentReplly.getCommentId()).getUser());
            commentReply.setLikesCount(0);
            commentRepplyService.addOrUpdate(commentReply);
            return ResponseEntity.ok("add comment reply success");
        }
        catch(Exception e){
            e.printStackTrace();
            throw e;
        }
    }
}
