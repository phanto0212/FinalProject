package com.recipe.sharing.recipe_backend.Service;

public interface CommentLikeService {
    int count(Integer commentId);
    boolean exists(Integer commentId, Long userId);
    void like(Integer commentId, Long userId);
    void unlike(Integer commentId, Long userId);
}
