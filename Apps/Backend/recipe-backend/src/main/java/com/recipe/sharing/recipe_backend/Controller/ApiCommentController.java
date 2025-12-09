package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.DTO.CommentDTO;
import com.recipe.sharing.recipe_backend.DTO.RepplyCommentDTO;
import com.recipe.sharing.recipe_backend.Entity.*;
import com.recipe.sharing.recipe_backend.Request.CommentRequest;
import com.recipe.sharing.recipe_backend.Service.CommentLikeService;
import com.recipe.sharing.recipe_backend.Service.CommentRepplyService;
import com.recipe.sharing.recipe_backend.Service.RecipeCommentService;
import com.recipe.sharing.recipe_backend.Service.RecipeService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class ApiCommentController {
    @Autowired
    private RecipeCommentService commentService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private RecipeService recipeService;
    @Autowired
    private CommentRepplyService commentRepplyService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private CommentLikeService commentLikeService;
    @PostMapping("/add")
    public ResponseEntity<?> addComment(HttpServletRequest request, @RequestBody CommentRequest commentRequest){
        User user = jwtTokenUtil.getUserByToken(request);
        RecipeComment comment = new RecipeComment();
        comment.setUser(user);
        comment.setRecipe(recipeService.getRecipeById(commentRequest.getRecipeId()));
        comment.setContent(commentRequest.getContent());
        comment.setRating(BigDecimal.valueOf(commentRequest.getRating()));
        comment.setLikesCount(0);
        comment.setRepliesCount(0);
        comment.setCreatedAt(java.time.LocalDateTime.now());
        commentService.addOrUpdate(comment);
        messagingTemplate.convertAndSend(
                "/topic/message/comment/" + commentRequest.getRecipeId(),
                "success"
        );
      return ResponseEntity.ok("add comment success");

    }
    @GetMapping("/get/all/comment/{id}")
    public ResponseEntity<?> getAllCommentByRecipeId(@PathVariable("id") Integer id){
        List<CommentDTO> commentDTOs = new ArrayList<>();
        List<RecipeComment> comments = commentService.getListByRecipeId(id);
        for (RecipeComment comment : comments) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment.getId());
            User user = comment.getUser();
            commentDTO.setAuthor(user.getFullName());
            commentDTO.setAvatar(user.getAvatar_url());
            commentDTO.setRating(comment.getRating());
            commentDTO.setContent(comment.getContent());
            if (comment.getCreatedAt() != null) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
                String formattedTime = comment.getCreatedAt().format(formatter);
                commentDTO.setDate(formattedTime);
            }
            commentDTO.setLikes(comment.getLikesCount());
            List<RepplyCommentDTO> repplyCommentDTOS = new ArrayList<>();
            List<CommentReply> replies = commentRepplyService.getListByCommentId(comment.getId());
            for (CommentReply commentReply : replies) {
                RepplyCommentDTO commentReplyDTO = new RepplyCommentDTO();
                commentReplyDTO.setId(commentReply.getId());
                User replyUser = commentReply.getUser();
                commentReplyDTO.setAuthor(replyUser.getFullName());
                commentReplyDTO.setAvatar(replyUser.getAvatar_url());
                if (commentReply.getCreatedAt() != null) {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
                    String formattedTime = commentReply.getCreatedAt().format(formatter);
                    commentReplyDTO.setDate(formattedTime);
                }
                commentReplyDTO.setContent(commentReply.getContent());
                repplyCommentDTOS.add(commentReplyDTO);
            }
            int commentLikes = commentLikeService.count(comment.getId());
            commentDTO.setLikes(commentLikes);
            commentDTO.setReplies(repplyCommentDTOS);
            commentDTOs.add(commentDTO);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("comments", commentDTOs);
        return ResponseEntity.ok(response);
    }
}
