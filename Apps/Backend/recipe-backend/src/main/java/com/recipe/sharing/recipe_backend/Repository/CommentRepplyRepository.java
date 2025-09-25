package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.CommentReply;

import java.util.List;

public interface CommentRepplyRepository {
    List<CommentReply> getListByCommentId(Integer commentId);
    void addOrUpdate(CommentReply commentReply);
    void deleteById(Integer id);
    CommentReply getById(Integer id);
}
