package com.recipe.sharing.recipe_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recipe.sharing.recipe_backend.Entity.User_Role;



@Repository
public interface UserRoleRespository extends JpaRepository<User_Role, Integer>{

}