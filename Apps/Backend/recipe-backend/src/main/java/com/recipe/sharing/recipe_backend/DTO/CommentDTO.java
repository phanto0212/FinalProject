package com.recipe.sharing.recipe_backend.DTO;

import java.math.BigDecimal;
import java.util.List;

public class CommentDTO {
    private Integer id;
    private String author;
    private String avatar;
    private BigDecimal rating;
    private String date;
    private String content;
    private int likes;
    private List<RepplyCommentDTO> replies;

    public CommentDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<RepplyCommentDTO> getReplies() {
        return replies;
    }

    public void setReplies(List<RepplyCommentDTO> replies) {
        this.replies = replies;
    }
}
