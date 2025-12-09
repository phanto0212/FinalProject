package com.recipe.sharing.recipe_backend.Request;

public class ContentPost {
    private String text;
    private String image;
    public ContentPost() {
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
