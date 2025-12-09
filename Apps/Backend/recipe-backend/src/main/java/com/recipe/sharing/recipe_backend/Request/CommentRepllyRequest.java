package com.recipe.sharing.recipe_backend.Request;

public class CommentRepllyRequest {
    private Integer commentId;
    private String content;

    public CommentRepllyRequest() {
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
