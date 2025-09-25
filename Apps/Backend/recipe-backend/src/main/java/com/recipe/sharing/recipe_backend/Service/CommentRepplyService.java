package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.CommentReply;

import java.util.List;

public interface CommentRepplyService {
    List<CommentReply> getListByCommentId(Integer commentId);
    void addOrUpdate(CommentReply commentReply);
    void deleteById(Integer id);
    CommentReply getById(Integer id);
}
