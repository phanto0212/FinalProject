package com.recipe.sharing.recipe_backend.Repository;

import com.recipe.sharing.recipe_backend.Entity.CommentReply;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class CommentRepplyRepositoryImpl implements CommentRepplyRepository {

    @PersistenceContext
     private EntityManager em;
    @Override
    public List<CommentReply> getListByCommentId(Integer commentId) {
            String hql = "from CommentReply e where e.comment.id = :commentId";
            return  em.createQuery(hql, CommentReply.class)
                    .setParameter("commentId", commentId)
                    .getResultList();
    }

    @Override
    public void addOrUpdate(CommentReply commentReply) {

        if (commentReply.getId() == null) {
            em.persist(commentReply);
        } else {
            em.merge(commentReply);
        }
    }

    @Override
    public void deleteById(Integer id) {

        CommentReply commentReply = em.find(CommentReply.class, id);
        if (commentReply != null) {
            em.remove(commentReply);
        }
    }

    @Override
    public CommentReply getById(Integer id) {
        return em.find(CommentReply.class, id);
    }
}
