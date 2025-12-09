package com.recipe.sharing.recipe_backend.Request;

public class RegisterRequest { private String email;
    private String password;
    private String repassword;
    private String name;
    public RegisterRequest(String email, String password, String repassword) {
        super();
        this.email = email;
        this.password = password;
        this.repassword = repassword;
    }
    public RegisterRequest() {
        super();
        // TODO Auto-generated constructor stub
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRepassword() {
        return repassword;
    }
    public void setRepassword(String repassword) {
        this.repassword = repassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
