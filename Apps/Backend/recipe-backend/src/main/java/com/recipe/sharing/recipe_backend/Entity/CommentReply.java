package com.recipe.sharing.recipe_backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment_replies")
@Getter
@Setter
public class CommentReply implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // Quan hệ với Comment gốc
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private RecipeComment comment;

    // Quan hệ với User (người viết reply)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Lob
    private String content;

    // Người được mention (nếu có) - không bắt buộc
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentioned_user_id")
    private User mentionedUser;

    @Column(name = "likes_count")
    private Integer likesCount;

    @Column(name = "is_edited")
    private Boolean isEdited;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public CommentReply() {
    }

    public CommentReply(Integer id, RecipeComment comment, User user, String content, User mentionedUser, Integer likesCount, Boolean isEdited, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.comment = comment;
        this.user = user;
        this.content = content;
        this.mentionedUser = mentionedUser;
        this.likesCount = likesCount;
        this.isEdited = isEdited;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
