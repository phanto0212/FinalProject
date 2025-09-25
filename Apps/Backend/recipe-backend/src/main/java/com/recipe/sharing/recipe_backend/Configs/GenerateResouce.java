package com.recipe.sharing.recipe_backend.Configs;

import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Service.UserService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GenerateResouce {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public User getUserByToken(String token) {
        String jwt = token;

        if (jwt == null) {
            return null;
        }
        if (jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
        }
        Claims claims = jwtTokenUtil.getClaimsFromToken(jwt);
        java.util.Date expiration = claims.getExpiration();
        if (expiration.before(new java.util.Date())) {
            return null;
        }
        String username = claims.getSubject(); // sub

        if (username == null) {
            return null;
        }

        User user = userService.getUserByUsername(username);
        return user;
    }
}
