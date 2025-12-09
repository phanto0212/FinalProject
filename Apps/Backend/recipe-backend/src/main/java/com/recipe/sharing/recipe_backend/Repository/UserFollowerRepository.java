package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Entity.UserFollower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserFollowerRepository {
    List<UserFollower> getListByFollower(Long userId);
    List<UserFollower> getListByFollowing(Long userId);
    void addFollower(UserFollower userFollower);
    void removeFollower(Long userId, Long followerId);
    UserFollower getFollower(Long userId, Long followerId);
}
