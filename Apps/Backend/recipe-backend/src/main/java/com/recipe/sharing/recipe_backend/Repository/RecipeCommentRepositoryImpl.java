package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.RecipeComment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class RecipeCommentRepositoryImpl implements RecipeCommentRepository {
    @PersistenceContext
    private EntityManager em;
    @Override
    public List<RecipeComment> getListByRecipeId(Integer recipeId) {
        String hql = "from RecipeComment e where e.recipe.id = :recipeId";
        return  em.createQuery(hql, RecipeComment.class)
                .setParameter("recipeId", recipeId)
                .getResultList();
    }

    @Override
    public void addOrUpdate(RecipeComment recipeComment) {

        if (recipeComment.getId() == null) {
            em.persist(recipeComment);
        } else {
            em.merge(recipeComment);
        }
    }

    @Override
    public void deleteById(Integer id) {
        RecipeComment recipeComment = em.find(RecipeComment.class, id);
        if (recipeComment != null) {
            em.remove(recipeComment);
        }
    }

    @Override
    public RecipeComment getById(Integer id) {
        return em.find(RecipeComment.class, id);
    }
}
