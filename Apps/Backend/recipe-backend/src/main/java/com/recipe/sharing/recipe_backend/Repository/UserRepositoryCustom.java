package com.recipe.sharing.recipe_backend.Repository;

import java.util.List;

import com.recipe.sharing.recipe_backend.Entity.User;



public interface UserRepositoryCustom {

	List<User> getList();
	void addOrUpdate (User user);
	User getUserById(int id);
	void deleteUserByid(int id);
	User getUserbyEmail(String email);
	List<User> getAllUsersOther(Long userid);
}
