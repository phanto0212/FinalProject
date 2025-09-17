package com.recipe.sharing.recipe_backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.sharing.recipe_backend.Entity.Role;
import com.recipe.sharing.recipe_backend.Repository.RoleRespository;



@Service
public class RoleServiceimpl implements RoleService {

	@Autowired
	private RoleRespository roleRespository;


	@Override
	public Role findByRoleName(String name) {
		
			return roleRespository.findByName(name);
		
	}
	


}
