package com.recipe.sharing.recipe_backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
@Entity
@Table(name = "recipe_comments")
@Getter
@Setter
public class RecipeComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // Quan hệ với Recipe
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    // Quan hệ với User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "content")
    private String content;

    @Column(name = "rating", precision = 2, scale = 1)
    private BigDecimal rating;

    @Column(name = "likes_count")
    private Integer likesCount;

    @Column(name = "replies_count")
    private Integer repliesCount;

    @Column(name = "is_edited")
    private Boolean isEdited;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public RecipeComment() {
    }

    public RecipeComment(Integer id, Recipe recipe, User user, String content, BigDecimal rating, Integer likesCount, Integer repliesCount, Boolean isEdited, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.recipe = recipe;
        this.user = user;
        this.content = content;
        this.rating = rating;
        this.likesCount = likesCount;
        this.repliesCount = repliesCount;
        this.isEdited = isEdited;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
