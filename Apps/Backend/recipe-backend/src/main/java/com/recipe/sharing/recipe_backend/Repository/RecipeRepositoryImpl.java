package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Recipe;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class RecipeRepositoryImpl implements RecipeRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Recipe> getAllWithStatus(String status) {
        String hql = "FROM Recipe R WHERE R.status = :status";
        return entityManager.createQuery(hql, Recipe.class)
                .setParameter("status", status)
                .getResultList();
    }

    @Override
    public Recipe getRecipeById(Integer id) {
        return entityManager.find(Recipe.class, id);
    }

    @Override
    public void addOrUpdate(Recipe recipe) {
        if (recipe.getId() != null) {
            entityManager.merge(recipe);
        } else {
            entityManager.persist(recipe);
        }
    }

    @Override
    public void deleteById(Integer id) {
        Recipe recipe = entityManager.find(Recipe.class, id);
        if (recipe != null) {
            entityManager.remove(recipe);
        }
    }

    @Override
    public List<Recipe> getAllRecipeSuggestions(String keyword) {
        try {
            String hql = "SELECT r FROM Recipe r " +
                    "WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%')) and r.status = 'P'" ;

            TypedQuery<Recipe> query = entityManager.createQuery(hql, Recipe.class);
            query.setParameter("keyword", keyword.trim());

            return query.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public List<Recipe> getRecipesByUserId(Long userId) {
        String hql = "FROM Recipe R WHERE R.chefId = :userId and R.status = 'P'";
        return entityManager.createQuery(hql, Recipe.class)
                .setParameter("userId", userId)
                .getResultList();
    }
}
