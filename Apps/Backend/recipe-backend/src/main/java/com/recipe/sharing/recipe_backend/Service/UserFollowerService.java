package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.UserFollower;

import java.util.List;

public interface UserFollowerService {
    List<UserFollower> getListByFollower(Long userId);
    List<UserFollower> getListByFollowing(Long userId);
    void addFollower(UserFollower userFollower);
    void removeFollower(Long userId, Long followerId);
    UserFollower getFollower(Long userId, Long followerId);
}
