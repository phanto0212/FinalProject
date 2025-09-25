package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.RecipeStep;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class RecipeStepRepositoryImpl implements RecipeStepRepository {
    @PersistenceContext
    private EntityManager em;
    @Override
    public List<RecipeStep> getAllByRecipeId(Integer recipeId) {
        String hql = "FROM RecipeStep e where e.recipe.id = :recipeId";
        return  em.createQuery(hql, RecipeStep.class)
                .setParameter("recipeId", recipeId)
                .getResultList();
    }

    @Override
    public void addOrUpdate(RecipeStep recipeStep) {

        if (recipeStep.getId() == null) {
            em.persist(recipeStep);
        } else {
            em.merge(recipeStep);
        }
    }

    @Override
    public void deleteById(Integer id) {
        RecipeStep recipeStep = em.find(RecipeStep.class, id);
        if (recipeStep != null) {
            em.remove(recipeStep);
        }
    }
}
