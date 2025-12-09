package com.recipe.sharing.recipe_backend.Request;

public class FeedPost {
    private Integer id;
    private UserPost user;
    private String time;
    private ContentPost content;
    private StatPost stats;
    private Boolean isLiked;
    private Boolean isFavorite;
    public FeedPost() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserPost getUser() {
        return user;
    }

    public void setUser(UserPost user) {
        this.user = user;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public ContentPost getContent() {
        return content;
    }

    public void setContent(ContentPost content) {
        this.content = content;
    }

    public StatPost getStats() {
        return stats;
    }

    public void setStats(StatPost stats) {
        this.stats = stats;
    }

    public Boolean getLiked() {
        return isLiked;
    }

    public void setLiked(Boolean liked) {
        isLiked = liked;
    }

    public Boolean getFavorite() {
        return isFavorite;
    }

    public void setFavorite(Boolean favorite) {
        isFavorite = favorite;
    }
}
