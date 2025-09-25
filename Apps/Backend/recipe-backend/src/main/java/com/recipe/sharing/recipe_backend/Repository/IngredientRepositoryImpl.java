package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.Ingredient;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
@Transactional
public class IngredientRepositoryImpl implements IngredientRepository {
    @PersistenceContext
    private EntityManager em;
    @Override
    public List<Ingredient> getList() {
        String hql = "from Ingredient";
        return  em.createQuery(hql, Ingredient.class).getResultList();
    }

    @Override
    public void addOrUpdate(Ingredient ingredient) {

        if (ingredient.getId() == null) {
            em.persist(ingredient);
        } else {
            em.merge(ingredient);
        }
    }

    @Override
    public void deleteById(Integer id) {
        Ingredient ingredient = em.find(Ingredient.class, id);
        if (ingredient != null) {
            em.remove(ingredient);
        }
    }

    @Override
    public Ingredient getById(Integer id) {
        return   em.find(Ingredient.class, id);
    }
}
