package com.recipe.sharing.recipe_backend.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.recipe.sharing.recipe_backend.Entity.CustomUserDetails;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Entity.User_Role;
import com.recipe.sharing.recipe_backend.Repository.UserRepository;



@Service
public class CustomUserDetailService implements UserDetailsService {
	
	@Autowired 
    private UserRepository userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return buildUserDetails(user);
    }

    private UserDetails buildUserDetails(User user) {
        Collection<GrantedAuthority> grantedAuthoritySet = new HashSet<>();
        Set<User_Role> roles = user.getUserRoles();
        for (User_Role role : roles) {
            grantedAuthoritySet.add(new SimpleGrantedAuthority(role.getRole().getName()));
        }
        return new CustomUserDetails(grantedAuthoritySet, user.getEmail(), user.getFullName(), user.getPassword(), user.getUsername(), user.getGender(), user.getAddress(), user.getTelephone(), user.getEnabled(),true,true,true);
	}
}
