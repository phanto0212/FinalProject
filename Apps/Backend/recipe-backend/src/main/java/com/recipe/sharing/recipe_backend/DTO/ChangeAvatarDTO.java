package com.recipe.sharing.recipe_backend.DTO;

import org.springframework.web.multipart.MultipartFile;

public class ChangeAvatarDTO {
    private MultipartFile file;
    public ChangeAvatarDTO() {
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
