package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.UserRecipeInteraction;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class UserRecipeInteractionRepositoryImpl implements UserRecipeInteractionRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public List<UserRecipeInteraction> getList() {
        String hql = "FROM UserRecipeInteraction";
        return em.createQuery(hql, UserRecipeInteraction.class).getResultList();
    }

    @Override
    public UserRecipeInteraction getById(Integer id) {
        return em.find(UserRecipeInteraction.class, id);
    }

    @Override
    public void addOrUpdate(UserRecipeInteraction interaction) {

        if (interaction.getId() == null) {
            em.persist(interaction);
        } else {
            em.merge(interaction);
        }
    }

    @Override
    public void deleteById(Integer id) {
        UserRecipeInteraction interaction = em.find(UserRecipeInteraction.class, id);
        if (interaction != null) {
            em.remove(interaction);
        }
    }

    @Override
    public UserRecipeInteraction getByUserIdAndRecipeId(Long userId, Integer recipeId) {
        return em.createQuery("FROM UserRecipeInteraction WHERE user.id = :userId AND recipe.id = :recipeId", UserRecipeInteraction.class)
            .setParameter("userId", userId)
            .setParameter("recipeId", recipeId)
            .getResultStream()
            .findFirst()
            .orElse(null);
    }
}
