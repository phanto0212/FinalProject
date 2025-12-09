package com.recipe.sharing.recipe_backend.Service;

import java.util.List;

import com.recipe.sharing.recipe_backend.Entity.User;

public interface UserService {
	 User getUserByUsername(String username);
	 List<User> getList();
	 void AddOrUpdate(User user);
	 User getUserById(int id);
	 void deleteById(int id);
	 User getUserByEmail(String email);
	List<User> getAllUsersOther(Long userid);
}
