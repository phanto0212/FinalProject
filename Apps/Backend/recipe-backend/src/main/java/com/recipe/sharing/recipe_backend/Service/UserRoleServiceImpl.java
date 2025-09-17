package com.recipe.sharing.recipe_backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.sharing.recipe_backend.Entity.User_Role;
import com.recipe.sharing.recipe_backend.Repository.UserRoleRespository;



@Service
public class UserRoleServiceImpl implements UserRoleService {

	@Autowired
	private UserRoleRespository userRoleRespository;
	
	@Override
	public void save(User_Role user_role) {
		try {
			userRoleRespository.save(user_role);
		}
		catch(Exception e){
			e.printStackTrace();
			throw e;
		}
		
	}

}
