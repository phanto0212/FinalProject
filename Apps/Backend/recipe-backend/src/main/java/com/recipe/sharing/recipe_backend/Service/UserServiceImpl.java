package com.recipe.sharing.recipe_backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Repository.UserRepository;
import com.recipe.sharing.recipe_backend.Repository.UserRepositoryCustom;


@Service 
public class UserServiceImpl implements UserService{

@Autowired
private UserRepository userRepositoryCustom;
@Autowired 
private UserRepositoryCustom userRespository;

@Override
public List<User> getList() {
	List<User> list = userRepositoryCustom.findAll();
	return list;
}
@Override
public void AddOrUpdate(User user) {
	userRepositoryCustom.save(user);
	
}
@Override
public User getUserById(int id) {
	return userRepositoryCustom.findById(id).get();
	
}
@Override
public void deleteById(int id) {
	userRepositoryCustom.deleteById(id);
}
@Override
public User getUserByUsername(String username) {
	User user = userRepositoryCustom.findByUsername(username);
	if(user == null) {
		return null;
	}
	return user;
}
@Override
public User getUserByEmail(String email) {
	// TODO Auto-generated method stub
	if(userRespository.getUserbyEmail(email)== null) {
		return null;
	}
	else {
		return userRespository.getUserbyEmail(email);
	}
}

}