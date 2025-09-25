package com.recipe.sharing.recipe_backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_recipe_interactions")
@Getter
@Setter
public class UserRecipeInteraction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // Quan hệ với User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Quan hệ với Recipe
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "is_liked")
    private Boolean isLiked;

    @Column(name = "is_bookmarked")
    private Boolean isBookmarked;

    @Column(name = "is_tried")
    private Boolean isTried;

    @Column(name = "my_rating")
    private Integer myRating;

    @Column(name = "notes")
    private String notes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public UserRecipeInteraction() {
    }

    public UserRecipeInteraction(Long id, User user, Recipe recipe, Boolean isLiked, Boolean isBookmarked, Boolean isTried, Integer myRating, String notes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.recipe = recipe;
        this.isLiked = isLiked;
        this.isBookmarked = isBookmarked;
        this.isTried = isTried;
        this.myRating = myRating;
        this.notes = notes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
