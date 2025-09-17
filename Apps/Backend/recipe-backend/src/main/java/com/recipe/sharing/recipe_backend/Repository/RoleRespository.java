package com.recipe.sharing.recipe_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recipe.sharing.recipe_backend.Entity.Role;



@Repository
public interface RoleRespository extends JpaRepository<Role, Integer> {

	Role findByName(String name);
}
