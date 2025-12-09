package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.CommentLike;
import com.recipe.sharing.recipe_backend.Entity.RecipeComment;
import com.recipe.sharing.recipe_backend.Entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class CommentLikeRepositoryImpl implements CommentLikeRepository {

    @PersistenceContext
    private EntityManager em;
    @Override
    public int count(Integer commentId) {
        return  em.createQuery("SELECT COUNT(cl) FROM CommentLike cl WHERE cl.comment.id = :commentId", Long.class)
                .setParameter("commentId", commentId)
                .getSingleResult()
                .intValue();
    }

    @Override
    public boolean exists(Integer commentId, Long userId) {
        return em.createQuery("SELECT COUNT(cl) FROM CommentLike cl WHERE cl.comment.id = :commentId AND cl.user.id = :userId", Long.class)
                .setParameter("commentId", commentId)
                .setParameter("userId", userId)
                .getSingleResult()
                .intValue() > 0;
    }

    @Override
    public void like(Integer commentId, Long userId) {
        if (!exists(commentId, userId)) {
            CommentLike commentLike = new CommentLike();
            commentLike.setComment(em.getReference(RecipeComment.class, commentId));
            commentLike.setUser(em.getReference(User.class, userId));
            em.persist(commentLike);
        }else{
           CommentLike commentLike =  em.createQuery("FROM CommentLike cl WHERE cl.comment.id = :commentId and cl.user.id = :userId ", CommentLike.class)
                    .setParameter("commentId", commentId)
                    .setParameter("userId", userId)
                   .getSingleResult();
           if(commentLike!=null){
               em.remove(commentLike);
           }
        }
    }

    @Override
    public void unlike(Integer commentId, Long userId) {
        CommentLike commentLike = em.createQuery("FROM CommentLike cl WHERE cl.comment.id = :commentId AND cl.user.id = :userId", CommentLike.class)
                .setParameter("commentId", commentId)
                .setParameter("userId", userId)
                .getResultStream()
                .findFirst()
                .orElse(null);
        if (commentLike != null) {
            em.remove(commentLike);
        }
    }
}
