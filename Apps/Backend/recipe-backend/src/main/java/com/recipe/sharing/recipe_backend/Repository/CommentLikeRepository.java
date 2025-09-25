package com.recipe.sharing.recipe_backend.Repository;

public interface CommentLikeRepository {
    int count(Integer commentId);
    boolean exists(Integer commentId, Long userId);
    void like(Integer commentId, Long userId);
    void unlike(Integer commentId, Long userId);

}
