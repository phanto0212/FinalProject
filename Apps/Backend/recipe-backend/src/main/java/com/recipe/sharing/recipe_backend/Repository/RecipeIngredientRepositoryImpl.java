package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.RecipeIngredient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class RecipeIngredientRepositoryImpl implements RecipeIngredientRepository {
    @PersistenceContext
    private EntityManager em;
    @Override
    public List<RecipeIngredient> getList(Integer recipeId) {
        String hql = "FROM RecipeIngredient e where e.recipe.id = :recipeId";
        return  em.createQuery(hql, RecipeIngredient.class)
                .setParameter("recipeId", recipeId)
                .getResultList();
    }

    @Override
    public void addOrUpdate(RecipeIngredient recipeIngredient) {
        if (recipeIngredient.getId() == null) {
            em.persist(recipeIngredient);
        } else {
            em.merge(recipeIngredient);
        }
    }

    @Override
    public void deleteById(Integer id) {
        RecipeIngredient recipeIngredient = em.find(RecipeIngredient.class, id);
        if (recipeIngredient != null) {
            em.remove(recipeIngredient);
        }

    }

}
