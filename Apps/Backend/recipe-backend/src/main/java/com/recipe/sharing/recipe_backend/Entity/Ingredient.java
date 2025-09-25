package com.recipe.sharing.recipe_backend.Entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "ingredients")
public class Ingredient implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "unit")
    private String unit;

    @Column(name = "calories_per_unit")
    private Integer caloriesPerUnit;

    @Column(name = "note")
    private String note;

    public Ingredient() {
    }

    public Ingredient(Long id, String name, String unit, Integer caloriesPerUnit, String note) {
        this.id = id;
        this.name = name;
        this.unit = unit;
        this.caloriesPerUnit = caloriesPerUnit;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Integer getCaloriesPerUnit() {
        return caloriesPerUnit;
    }

    public void setCaloriesPerUnit(Integer caloriesPerUnit) {
        this.caloriesPerUnit = caloriesPerUnit;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
