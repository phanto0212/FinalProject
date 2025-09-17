package com.recipe.sharing.recipe_backend.Service;

import com.recipe.sharing.recipe_backend.Entity.Role;

public interface RoleService {

	Role findByRoleName(String name);
}

