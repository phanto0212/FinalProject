package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.CommentReply;
import com.recipe.sharing.recipe_backend.Repository.CommentRepplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentRepplyServiceImpl  implements CommentRepplyService {

    @Autowired
    private CommentRepplyRepository commentReplyRepository;
    @Override
    public List<CommentReply> getListByCommentId(Integer commentId) {
        return commentReplyRepository.getListByCommentId(commentId);
    }

    @Override
    public void addOrUpdate(CommentReply commentReply) {
        commentReplyRepository.addOrUpdate(commentReply);
    }

    @Override
    public void deleteById(Integer id) {
        commentReplyRepository.deleteById(id);
    }

    @Override
    public CommentReply getById(Integer id) {
        return commentReplyRepository.getById(id);
    }
}
