package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.DTO.ChangePasswordDTO;
import com.recipe.sharing.recipe_backend.DTO.MyInfoDTO;
import com.recipe.sharing.recipe_backend.DTO.StatMyInfoDTO;
import com.recipe.sharing.recipe_backend.Entity.*;
import com.recipe.sharing.recipe_backend.Request.ChangeInfo;
import com.recipe.sharing.recipe_backend.Request.ChangeInfoRequest;
import com.recipe.sharing.recipe_backend.Request.LoginRequest;
import com.recipe.sharing.recipe_backend.Request.RegisterRequest;
import com.recipe.sharing.recipe_backend.Service.*;
import com.recipe.sharing.recipe_backend.Util.JwtResponse;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserFollowerService userFollowerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.getUserByUsername(loginRequest.getUsername());
            if(user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Người dùng không tồn tại!");

            }
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String rawPassword = loginRequest.getPassword();
            String encodedPasswordFromDB = user.getPassword(); // Mật khẩu đã mã hóa từ cơ sở dữ liệu

            boolean isPasswordMatch = encoder.matches(rawPassword, encodedPasswordFromDB);
            if(!isPasswordMatch) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu sai!");
            }
            // Thực hiện quá trình xác thực (authentication)
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            // Lưu trữ đối tượng Authentication vào SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Lấy UserDetails sau khi xác thực thành công
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            String token = jwtTokenUtil.generateToken(username, roles);
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
    @GetMapping("/get/user")
    public ResponseEntity<?> getUser(HttpServletRequest request){
        try {
            String jwt = request.getHeader("Authorization");

            if (jwt == null ) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token" );
            }
            if (jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }
            Claims claims = jwtTokenUtil.getClaimsFromToken(jwt);
            java.util.Date expiration = claims.getExpiration();
            if(expiration.before(new java.util.Date())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("token exprired");
            }
            String username = claims.getSubject(); // sub

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            User user = userService.getUserByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            Map<String, Object> responseBody = new HashMap<>();
            user.setPassword("");
            responseBody.put("user",user);
            return ResponseEntity.ok(responseBody);

        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("get user error");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        // Kiểm tra xem username hoặc email đã tồn tại hay chưa
        if (userService.getUserByUsername(registerRequest.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email đã tồn tại!");
        }

        if (userService.getUserByEmail(registerRequest.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("email đã được đăng kí!");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = registerRequest.getPassword();
        String encodedPassword = encoder.encode(rawPassword);
        // Tạo người dùng mới
        User user = new User();
        user.setUsername(registerRequest.getEmail());
        user.setPassword(encodedPassword); // Nhớ mã hóa mật khẩu trước khi lưu
        user.setEmail(registerRequest.getEmail());
        user.setEnabled(true);
        user.setTelephone("19001013");
        user.setAvatar_url("https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/475805523_969763461765386_851159384735407873_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=DJpAFztFlagQ7kNvwEW7hWm&_nc_oc=Adlvnm7IxijRwynh2psDqR2LIj3iXzMe1RBxCRX3unU9wzPdzieCqM1qg86txGe6e0g&_nc_zt=24&_nc_ht=scontent.fhan14-1.fna&_nc_gid=PBGTqe8xvwOnIJecAf-Hvg&oh=00_AfgmtuQ-cKCSXGTCMdjKXiw1NOupIH6Rj08i_t0N_KRjLw&oe=6929BD86");
        user.setCreated_at(new Timestamp(System.currentTimeMillis()));
        user.setFullName(registerRequest.getName());
        userService.AddOrUpdate(user);

        Role role = roleService.findByRoleName("User");
        if (role == null) {
            throw new RuntimeException("Role 'User' not found");
        }

        User_Role userRole = new User_Role();
        userRole.setUser(user);
        userRole.setRole(role);
        userRoleService.save(userRole);
        return ResponseEntity.ok("register successful");
    }

    @PostMapping("/change/info/user")
    public ResponseEntity<?> changeInfoUser(HttpServletRequest request, @RequestBody ChangeInfo changeinfo){
        try {
            String jwt = request.getHeader("Authorization");
            if (jwt == null || !jwt.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
            }

            jwt = jwt.substring(7);
            Claims claims = jwtTokenUtil.getClaimsFromToken(jwt);
            java.util.Date expiration = claims.getExpiration();
            if (expiration.before(new java.util.Date())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
            }

            String username = claims.getSubject();
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            // Kiểm tra User
            User user = userService.getUserByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            user.setBirthday(changeinfo.getBirthday());
            user.setEmail(changeinfo.getEmail());
            user.setFullName(changeinfo.getFullname());
            user.setTelephone(changeinfo.getTelephone());
            userService.AddOrUpdate(user);
            return ResponseEntity.ok("oke");
        }
        catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    @PostMapping("/change/password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @RequestBody ChangePasswordDTO changePasswordDTo){
        try {
            String jwt = request.getHeader("Authorization");
            if (jwt == null || !jwt.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing token");
            }

            jwt = jwt.substring(7);
            Claims claims = jwtTokenUtil.getClaimsFromToken(jwt);
            java.util.Date expiration = claims.getExpiration();
            if (expiration.before(new java.util.Date())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expired");
            }

            String username = claims.getSubject();
            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            // Kiểm tra User
            User user = userService.getUserByUsername(username);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            String password = user.getPassword();
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            if(encoder.matches(changePasswordDTo.getPassword(), password)) {
                String encodedPassword = encoder.encode(changePasswordDTo.getNewPassword());
                user.setPassword(encodedPassword);
                userService.AddOrUpdate(user);
                return ResponseEntity.ok("Thay đổi thành công!");
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khâủ của bạn không đúng");

        }
        catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @GetMapping("/get/info")
    public ResponseEntity<?> getInfo(HttpServletRequest request){
        try{
            User user = jwtTokenUtil.getUserByToken(request);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            MyInfoDTO myInfoDTO = new MyInfoDTO();
            myInfoDTO.setName(user.getFullName());
            myInfoDTO.setEmail(user.getEmail());
            myInfoDTO.setPhone(user.getTelephone());
            myInfoDTO.setBio(user.getBio());
            myInfoDTO.setLocation(user.getLocation());
            myInfoDTO.setJoinDate(user.getCreated_at().toLocalDateTime());
            myInfoDTO.setAvatar(user.getAvatar_url());
            StatMyInfoDTO statMyInfoDTO = new StatMyInfoDTO();
            List<Recipe> recipes = recipeService.getRecipesByUserId(user.getId());
            statMyInfoDTO.setRecipes(recipes.size());
            int likes = 0;
            for (Recipe recipe : recipes) {
                likes += recipe.getTotalLikes();
            }
            statMyInfoDTO.setLikes(likes);
            List<UserFollower> followers = userFollowerService.getListByFollower(user.getId());
            List<UserFollower> followings = userFollowerService.getListByFollowing(user.getId());
            statMyInfoDTO.setFollowers(followings.size());
            statMyInfoDTO.setFollowing(followers.size());
            myInfoDTO.setStats(statMyInfoDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("myInfo", myInfoDTO);
            response.put("userId", user.getId());
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    @PostMapping("/recipe/change/info")
    public ResponseEntity<?> changeRecipeInfo(HttpServletRequest request, @RequestBody ChangeInfoRequest changeinfo){
        try {
            User user = jwtTokenUtil.getUserByToken(request);
            if(user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }
            user.setLocation(changeinfo.getLocation());
            user.setBio(changeinfo.getBio());
            user.setFullName(changeinfo.getName());
            user.setEmail(changeinfo.getEmail());
            userService.AddOrUpdate(user);

            return ResponseEntity.ok("oke");
        }
        catch(Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
