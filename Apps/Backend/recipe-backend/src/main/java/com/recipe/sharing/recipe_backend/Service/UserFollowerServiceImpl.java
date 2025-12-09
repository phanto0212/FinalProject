package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.UserFollower;
import com.recipe.sharing.recipe_backend.Repository.UserFollowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserFollowerServiceImpl implements  UserFollowerService {

    @Autowired
    private UserFollowerRepository userFollowerRepository;

    @Override
    public List<UserFollower> getListByFollower(Long userId) {

        return userFollowerRepository.getListByFollower(userId);
    }

    @Override
    public List<UserFollower> getListByFollowing(Long userId) {
        return userFollowerRepository.getListByFollowing(userId);
    }

    @Override
    public void addFollower(UserFollower userFollower) {
        userFollowerRepository.addFollower(userFollower);
    }

    @Override
    public void removeFollower(Long userId, Long followerId) {

        userFollowerRepository.removeFollower(userId, followerId);
    }

    @Override
    public UserFollower getFollower(Long userId, Long followerId) {

        return  userFollowerRepository.getFollower(userId, followerId);
    }
}
