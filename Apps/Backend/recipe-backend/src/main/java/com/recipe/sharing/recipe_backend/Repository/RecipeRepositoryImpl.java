package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Recipe;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
}
