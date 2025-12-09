package com.recipe.sharing.recipe_backend.DTO;

public class UserFollowerInfoDTO {
    private Long id;
    private String name;
    private String avatar;
    private Boolean isVerified;
    private int recipes;
    public UserFollowerInfoDTO() {
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    public int getRecipes() {
        return recipes;
    }

    public void setRecipes(int recipes) {
        this.recipes = recipes;
    }
}
