package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Repository.CommentLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentLikeServiceImpl implements CommentLikeService {
    @Autowired
    private CommentLikeRepository commentLikeRepository;
    @Override
    public int count(Integer commentId) {
        return commentLikeRepository.count(commentId) ;
    }

    @Override
    public boolean exists(Integer commentId, Long userId) {
        return  commentLikeRepository.exists(commentId, userId);
    }

    @Override
    public void like(Integer commentId, Long userId) {
        commentLikeRepository.like(commentId, userId);
    }

    @Override
    public void unlike(Integer commentId, Long userId) {
        commentLikeRepository.unlike(commentId, userId);
    }
}
