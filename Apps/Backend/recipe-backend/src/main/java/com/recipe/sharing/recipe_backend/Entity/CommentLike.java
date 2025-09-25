package com.recipe.sharing.recipe_backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "comment_likes")
@Getter
@Setter
public class CommentLike implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // Quan hệ với RecipeComment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private RecipeComment comment;

    // Quan hệ với User (người like)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public CommentLike() {
    }

    public CommentLike(Integer id, RecipeComment comment, User user, LocalDateTime createdAt) {
        this.id = id;
        this.comment = comment;
        this.user = user;
        this.createdAt = createdAt;
    }
}
