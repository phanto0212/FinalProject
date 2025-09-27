package com.recipe.sharing.recipe_backend.Entity;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
@Table(name = "recipe_steps")
public class RecipeStep implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "step_order")
    private Integer stepOrder;

    @Column(name = "instruction")
    private String instruction;

    public RecipeStep() {
    }

    public RecipeStep(Long id, Recipe recipe, Integer stepOrder, String instruction) {
        this.id = id;
        this.recipe = recipe;
        this.stepOrder = stepOrder;
        this.instruction = instruction;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }
}
