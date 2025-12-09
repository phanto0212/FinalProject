package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.UserFollower;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UserFollowerRepositoryImpl implements UserFollowerRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public List<UserFollower> getListByFollower(Long userId) {
        String hql = "FROM UserFollower uf WHERE uf.follower.id = :userId";
        return em.createQuery(hql, UserFollower.class).setParameter("userId", userId).getResultList();
    }

    @Override
    public List<UserFollower> getListByFollowing(Long userId) {
        String hql = "FROM UserFollower uf WHERE uf.following.id = :userId";
        return  em.createQuery(hql, UserFollower.class).setParameter("userId", userId).getResultList();
    }

    @Override
    public void addFollower(UserFollower userFollower) {
        em.persist(userFollower);
    }

    @Override
    public void removeFollower(Long userId, Long followerId) {
        String hql = "DELETE FROM UserFollower uf WHERE uf.following.id = :followerId AND uf.follower.id = :userId";
        em.createQuery(hql)
          .setParameter("userId", userId)
          .setParameter("followerId", followerId)
          .executeUpdate();
    }

    @Override
    public UserFollower getFollower(Long userId, Long followerId) {
        List<UserFollower> results = em.createQuery(
                        "FROM UserFollower uf WHERE uf.following.id = :followerId AND uf.follower.id = :userId",
                        UserFollower.class
                )
                .setParameter("userId", userId)
                .setParameter("followerId", followerId)
                .getResultList();

        return results.isEmpty() ? null : results.get(0);
    }
}
