package com.recipe.sharing.recipe_backend.Controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.DTO.*;
import com.recipe.sharing.recipe_backend.Entity.*;
import com.recipe.sharing.recipe_backend.Request.*;
import com.recipe.sharing.recipe_backend.Service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin("*")
public class ApiRecipeController {
    private final String UPLOAD_DIR = "uploads/";
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeIngredientService recipeIngredientService;

    @Autowired
    private RecipeStepService recipeStepService;

    @Autowired
    private RecipeCommentService recipeCommentService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRecipeInteractionService userRecipeInteractionService;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserFollowerService userFollowerService;

    @Autowired
    private UserRecipeInteractionService recipeInteractionService;

    @GetMapping("/get/recipe/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable("id") Integer id) {
        Recipe recipe = recipeService.getRecipeById(id);
        if(recipe == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found");
        }
        User user = userService.getUserById(recipe.getChefId().intValue());
        RecipeRequest recipeRequest = new RecipeRequest();
        recipeRequest.setId(recipe.getId());
        recipeRequest.setTitle(recipe.getTitle());
        recipeRequest.setSubtitle(recipe.getSubtitle());
        recipeRequest.setImage( recipe.getImageUrl());
        recipeRequest.setCookTime(recipe.getCookTime());
        recipeRequest.setDifficulty(recipe.getDifficulty());
        recipeRequest.setServings(recipe.getServings());
        recipeRequest.setRating(recipe.getAverageRating().floatValue());
        recipeRequest.setReviewCount(recipe.getTotalReviews());
        recipeRequest.setCalories(recipe.getCalories());
        List<RecipeIngredient> recipeIngredients = recipeIngredientService.getList(recipe.getId());
        List<IngredientRequest> ingredients = new ArrayList<>();
        for(RecipeIngredient ri : recipeIngredients) {
            IngredientRequest ingredientRequest = new IngredientRequest();
            ingredientRequest.setName(ri.getIngredient().getName());
            ingredientRequest.setAmount(ri.getQuantity().intValue() + " " + ri.getUnit());
            ingredients.add(ingredientRequest);
        }
        List<RecipeStep> steps = recipeStepService.getAllByRecipeId(recipe.getId());
        List<String> instructions = new ArrayList<>();
        for( RecipeStep step : steps) {
            instructions.add(step.getInstruction());
        }
        recipeRequest.setIngredients(ingredients);
        recipeRequest.setInstructions(instructions);
        NutritionRequest nutrition = new NutritionRequest();
        nutrition.setCalories(recipe.getCalories());
        nutrition.setCarbs(recipe.getCarbs());
        nutrition.setProtein(recipe.getProtein());
        nutrition.setFat(recipe.getFat());
        recipeRequest.setNutrition(nutrition);
        ChefRequest chef = new ChefRequest();
        chef.setAvatar(user.getAvatar_url());
        chef.setName(user.getFullName());
        chef.setTitle(user.getFullName());
        chef.setBio(user.getFullName());
        recipeRequest.setChef(chef);
        List<String> tags = new ArrayList<>();
        tags.add(recipe.getCategory());
        recipeRequest.setTags(tags);
        Map<String, Object> response = new HashMap<>();
        response.put("recipe", recipeRequest);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/get/all/recipe/post")
    public ResponseEntity<?> getAllRecipePost(HttpServletRequest request) {
           User userRequest = jwtTokenUtil.getUserByToken(request);
            List<Recipe> recipes = recipeService.getAllWithStatus("P");
            List<FeedPost> feedPosts = new ArrayList<>();
            for (Recipe recipe : recipes) {
                FeedPost feedPost = new FeedPost();
                feedPost.setId(recipe.getId());
                User user = userService.getUserById(recipe.getChefId().intValue());
                UserPost userPost = new UserPost();
                userPost.setName(user.getFullName());
                userPost.setAvatar(user.getAvatar_url());
                userPost.setVerified(true);
                userPost.setId(user.getId());
                feedPost.setUser(userPost);
                UserRecipeInteraction userRecipeInteraction =  userRecipeInteractionService.getByUserIdAndRecipeId(userRequest.getId(), recipe.getId());
                if(userRecipeInteraction == null){
                    userRecipeInteraction = new UserRecipeInteraction();
                }
                feedPost.setLiked(userRecipeInteraction.getLiked() != null ? userRecipeInteraction.getLiked() : false);
                feedPost.setFavorite(userRecipeInteraction.getBookmarked() != null ? userRecipeInteraction.getBookmarked() : false);
                if (recipe.getCreatedAt() != null) {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
                    String formattedTime = recipe.getCreatedAt().format(formatter);
                    feedPost.setTime(formattedTime);
                }
                ContentPost contentPost = new ContentPost();
                contentPost.setText(recipe.getDescription());
                contentPost.setImage(recipe.getImageUrl());
                feedPost.setContent(contentPost);
                StatPost statPost = new StatPost();
                statPost.setLikes(recipe.getTotalLikes());
                List<RecipeComment> comments = recipeCommentService.getListByRecipeId(recipe.getId());
                statPost.setComments(comments.size());
                statPost.setShares(0);
                statPost.setViews(0);
                feedPost.setStats(statPost);
                feedPosts.add(feedPost);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("posts", feedPosts);
            return ResponseEntity.ok(response);
}

    @PostMapping("/like/recipe/{recipeId}")
    public ResponseEntity<?> likeRecipe(HttpServletRequest request,@PathVariable("recipeId") Integer recipeId){
        try{
            User user = jwtTokenUtil.getUserByToken(request);
            UserRecipeInteraction userRecipeInteraction = userRecipeInteractionService.getByUserIdAndRecipeId(user.getId(), recipeId);
            if(userRecipeInteraction != null){
                Recipe recipe = recipeService.getRecipeById(recipeId);
                Integer likes = recipe.getTotalLikes() == null ? 0 : recipe.getTotalLikes();
                if (userRecipeInteraction.getLiked()) {
                    recipe.setTotalLikes(Math.max(0, likes - 1));
                } else {
                    recipe.setTotalLikes(likes + 1);
                }
                userRecipeInteraction.setLiked(!userRecipeInteraction.getLiked());
                userRecipeInteractionService.addOrUpdate(userRecipeInteraction);
                recipeService.addOrUpdate(recipe);
            }else{
                UserRecipeInteraction userRecipeInteraction1 = new UserRecipeInteraction();
                userRecipeInteraction1.setLiked(true);
                userRecipeInteraction1.setRecipe(recipeService.getRecipeById(recipeId));
                userRecipeInteraction1.setUser(user);
                userRecipeInteraction1.setBookmarked(false);
                userRecipeInteraction1.setTried(false);
                userRecipeInteraction1.setMyRating(null);
                userRecipeInteraction1.setNotes(null);
                userRecipeInteractionService.addOrUpdate(userRecipeInteraction1);
                Notification notification = new Notification();
                notification.setTitle("Công thức được yêu thích");
                notification.setAvatarUrl(user.getAvatar_url());
                notification.setCreatedAt(LocalDateTime.now());
                notification.setUserId(user.getId());
                notification.setMessage(user.getFullName() + " đã thích công thức " + recipeService.getRecipeById(recipeId).getTitle() + " của bạn");
                notification.setRelatedRecipeId(recipeId.longValue());
                notification.setRelatedUserId(recipeService.getRecipeById(recipeId.intValue()).getChefId());
                notification.setRead(false);
                notification.setType("like");
                notificationService.addNotification(notification);
                Recipe recipe = recipeService.getRecipeById(recipeId);
                recipe.setTotalLikes(recipe.getTotalLikes() + 1);
                recipeService.addOrUpdate(recipe);
            }

            return ResponseEntity.status(HttpStatus.OK).body(userRecipeInteraction);

        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }

    }
    @PostMapping("/add/post")
    public ResponseEntity<?> addRecipePost(HttpServletRequest request, @ModelAttribute PostRequest recipePostRequest, @RequestParam("ingredients") String ingredientsJson ) {
        try {
            User user = jwtTokenUtil.getUserByToken(request);
            // Parse JSON về List<IngredientPostRequest>
            ObjectMapper objectMapper = new ObjectMapper();
            List<IngredientPostRequest> ingredients =
                    objectMapper.readValue(ingredientsJson, new TypeReference<List<IngredientPostRequest>>() {});
            System.out.print("nnd" + ingredients);
            // Tạo thư mục nếu chưa có
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            // Lưu file ảnh
            String fileName = System.currentTimeMillis() + "_" + recipePostRequest.getImages().getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            try (InputStream inputStream = recipePostRequest.getImages().getInputStream()) {
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Lỗi khi lưu file ảnh: " + e.getMessage());
            }

            // Lưu đường dẫn ảnh vào DB
            String imageUrl = "http://localhost:8081/images/" + fileName;

            Recipe recipe = new Recipe();
            recipe.setChefId(user.getId().longValue());
            recipe.setTitle(recipePostRequest.getRecipeName());
            recipe.setDescription(recipePostRequest.getDescription());
            recipe.setCategory(recipePostRequest.getCategory());
            recipe.setCookTime(recipePostRequest.getCookTime());
            recipe.setImageUrl(imageUrl);
            recipe.setStatus("P");
            recipe.setSubtitle(recipePostRequest.getSubtitle());
            recipe.setTotalReviews(0);
            recipe.setTotalLikes(0);
            recipe.setTotalTime(recipePostRequest.getCookTime());
            recipe.setTotalViews(0);
            recipe.setCreatedAt(LocalDateTime.now());
            recipe.setCarbs(recipePostRequest.getCarbs());
            recipe.setProtein(recipePostRequest.getProtein());
            recipe.setFat(recipePostRequest.getFat());
            recipe.setCalories(recipePostRequest.getCalories());
            recipeService.addOrUpdate(recipe);

            // Lưu nguyên liệu
            for (IngredientPostRequest ingredientPostRequest : ingredients) {
                RecipeIngredient recipeIngredient = new RecipeIngredient();
                recipeIngredient.setRecipe(recipe);
                Ingredient ingredient = ingredientService.getById(ingredientPostRequest.getIngredientId().intValue());
                recipeIngredient.setIngredient(ingredient);
                recipeIngredient.setQuantity(BigDecimal.valueOf(ingredientPostRequest.getQuantity()));
                recipeIngredient.setUnit(ingredientPostRequest.getUnit());
                recipeIngredientService.addOrUpdate(recipeIngredient);
            }
            for (int i = 0; i < recipePostRequest.getSteps().size(); i++) {
                RecipeStep recipeStep = new RecipeStep();
                recipeStep.setRecipe(recipe);
                recipeStep.setStepOrder(i + 1);
                recipeStep.setInstruction(recipePostRequest.getSteps().get(i));
                recipeStepService.addOrUpdate(recipeStep);
            }
            return ResponseEntity.status(HttpStatus.OK).body(recipe);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@ModelAttribute ChangeAvatarDTO imageFile, HttpServletRequest request) {

        try {
            User user = jwtTokenUtil.getUserByToken(request);
            // Tạo thư mục nếu chưa có
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            // Lưu file ảnh
            String fileName = System.currentTimeMillis() + "_" + imageFile.getFile().getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            try (InputStream inputStream = imageFile.getFile().getInputStream()) {
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Lỗi khi lưu file ảnh: " + e.getMessage());
            }

            // Trả về đường dẫn ảnh
            String imageUrl = "http://localhost:8081/images/" + fileName;
            user.setAvatar_url(imageUrl);
            userService.AddOrUpdate(user);
            return ResponseEntity.status(HttpStatus.OK).body("ok");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }
    @Configuration
    public static class WebConfig implements WebMvcConfigurer {
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/images/**")
                    .addResourceLocations("file:uploads/");
        }
    }

    @GetMapping("/get/all/recipe/user" )
    public ResponseEntity<?> getAllRecipeByUser(HttpServletRequest request) {
        User userRequest = jwtTokenUtil.getUserByToken(request);
        List<Recipe> recipes = recipeService.getRecipesByUserId(userRequest.getId().longValue());
        List<RecipeUserDTO> recipeUserDTOS = new ArrayList<>();
        for ( Recipe recipe : recipes) {
            RecipeUserDTO recipeUserDTO = new RecipeUserDTO();
            recipeUserDTO.setId(recipe.getId());
            recipeUserDTO.setTitle(recipe.getTitle());
            recipeUserDTO.setImage(recipe.getImageUrl());
            Float avgRating = recipe.getAverageRating() == null
                    ? 0.0f
                    : recipe.getAverageRating().floatValue();
            recipeUserDTO.setRating(avgRating);
            recipeUserDTO.setLikes(recipe.getTotalLikes());
            recipeUserDTO.setViews(recipe.getTotalViews());
            recipeUserDTO.setDifficulty(recipe.getDifficulty());
            if (recipe.getCreatedAt() != null) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
                String formattedTime = recipe.getCreatedAt().format(formatter);
                recipeUserDTO.setTime(formattedTime);
            }
            recipeUserDTOS.add(recipeUserDTO);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("userRecipes", recipeUserDTOS);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/get/achievements")
    public ResponseEntity<?> getAchievements(HttpServletRequest request) {
        User userRequest = jwtTokenUtil.getUserByToken(request);
        List<Recipe> recipes = recipeService.getRecipesByUserId(userRequest.getId().longValue());
        float totalRating = 0;
        int totalRecipe = 0;
        int totalLike = 0;
        for (Recipe recipe : recipes) {
            totalRating += recipe.getAverageRating() == null ? 0.0f : recipe.getAverageRating().floatValue();
            totalRecipe++;
            totalLike += recipe.getTotalLikes() == null ? 0 : recipe.getTotalLikes();
        }
        AchievementDTO achievementDTO = new AchievementDTO();
        achievementDTO.setTotalLikes(totalLike);
        achievementDTO.setTotalRecipes(totalRecipe);
        achievementDTO.setAverageRating(totalRecipe == 0 ? 0.0f : totalRating / recipes.size());
        achievementDTO.setTrendingCount(recipes.size());
        Map<String, Object> response = new HashMap<>();
        response.put("achievements", achievementDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/quick-stats")
    public ResponseEntity<?> getQuickStats(HttpServletRequest request) {
        User userRequest = jwtTokenUtil.getUserByToken(request);
        List<Recipe> recipes = recipeService.getRecipesByUserId(userRequest.getId().longValue());
        int totalViews = 0;
        float totalRating = 0;
        Integer popularRecipeId = null;
        int maxView = -1;
        for (Recipe recipe : recipes) {
            totalViews += recipe.getTotalViews() == null ? 0 : recipe.getTotalViews();
            if(recipe.getTotalViews() != null && recipe.getTotalViews() > maxView) {
                maxView = recipe.getTotalViews();
                popularRecipeId = recipe.getId();
            }
            totalRating += recipe.getAverageRating() == null ? 0.0f : recipe.getAverageRating().floatValue();

        }
        StatDTO statDTO = new StatDTO();
        statDTO.setTotalViews(totalViews);
        statDTO.setAverageRating(recipes.size() == 0 ? 0.0f : totalRating / recipes.size());
        statDTO.setPopularRecipe(recipeService.getRecipeById(popularRecipeId).getTitle());
        statDTO.setMemberSince("11/11/2025");
        Map<String, Object> response = new HashMap<>();
        response.put("stats", statDTO);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/plus/view/{recipeId}")
    public  ResponseEntity<?> plusViewRecipe(@PathVariable("recipeId") Integer recipeId){
        try{
            Recipe recipe = recipeService.getRecipeById(recipeId);
            Integer views = recipe.getTotalViews() == null ? 0 : recipe.getTotalViews();
            recipe.setTotalViews(views + 1);
            recipeService.addOrUpdate(recipe);
            return ResponseEntity.status(HttpStatus.OK).body(recipe);
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
    }
    @GetMapping("/get/user/info/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable("userId") Long userId) {
        User userRequest = userService.getUserById(userId.intValue());
        UserInfoDTO userInfoDTO = new UserInfoDTO();
        userInfoDTO.setId(userRequest.getId().longValue());
        userInfoDTO.setName(userRequest.getUsername());
        userInfoDTO.setBio(userRequest.getBio());
        userInfoDTO.setVerified(true);
        userInfoDTO.setLocation( userRequest.getLocation());
        userInfoDTO.setAvatar(userRequest.getAvatar_url());
        userInfoDTO.setCoverImage("https://maytinhgiaphat.vn/wp-content/uploads/2025/09/nhung-hinh-nen-may-tinh-thien-nhien-dep-nhat-1.png");
        StatMyInfoDTO statMyInfoDTO = new StatMyInfoDTO();
        List<Recipe> recipes = recipeService.getRecipesByUserId(userRequest.getId().longValue());
        statMyInfoDTO.setRecipes(recipes.size());
        int totalLikes = 0;
        for( Recipe recipe : recipes) {
            totalLikes += recipe.getTotalLikes() == null ? 0 : recipe.getTotalLikes();
        }
        statMyInfoDTO.setLikes(totalLikes);
        List<UserFollower> followers = userFollowerService.getListByFollower(userRequest.getId());
        List<UserFollower> followings = userFollowerService.getListByFollowing(userRequest.getId());
        statMyInfoDTO.setFollowers(followings.size());
        statMyInfoDTO.setFollowing(followers.size());
        userInfoDTO.setStats(statMyInfoDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("userInfo", userInfoDTO);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/get/recipeforInfo/{userId}")
    public ResponseEntity<?> getRecipeForInfo(@PathVariable("userId") Long userId) {
        User userRequest = userService.getUserById(userId.intValue());
        List<Recipe> recipes = recipeService.getRecipesByUserId(userRequest.getId().longValue());
        List<RecipeInfoDTO> recipeInfoDTOS = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeInfoDTO recipeInfoDTO = new RecipeInfoDTO();
            recipeInfoDTO.setId(recipe.getId().longValue());
            recipeInfoDTO.setTitle(recipe.getTitle());
            recipeInfoDTO.setDifficulty(recipe.getDifficulty());
            recipeInfoDTO.setCookTime(recipe.getCookTime().toString());
            recipeInfoDTO.setImage( recipe.getImageUrl());
            StatRecipeDTO statRecipeDTO = new StatRecipeDTO();
            statRecipeDTO.setLikes(recipe.getTotalLikes());
            statRecipeDTO.setComments(recipe.getTotalReviews());
            statRecipeDTO.setViews(recipe.getTotalViews());
            recipeInfoDTO.setStats(statRecipeDTO);
            recipeInfoDTOS.add(recipeInfoDTO);
        }
        List<UserRecipeInteraction> recipe2 = recipeInteractionService.getList();
        List<RecipeInfoDTO> recipeInfoDTOS2 = new ArrayList<>();
        for (UserRecipeInteraction recipeInteraction : recipe2) {
            if(recipeInteraction.getUser().getId().equals(userRequest.getId()) && recipeInteraction.getLiked().equals(true)) {
                Recipe recipe = recipeService.getRecipeById(recipeInteraction.getRecipe().getId());
                RecipeInfoDTO recipeInfoDTO = new RecipeInfoDTO();
                recipeInfoDTO.setId(recipe.getId().longValue());
                recipeInfoDTO.setTitle(recipe.getTitle());
                recipeInfoDTO.setDifficulty(recipe.getDifficulty());
                recipeInfoDTO.setCookTime(recipe.getCookTime().toString());
                recipeInfoDTO.setImage( recipe.getImageUrl());
                StatRecipeDTO statRecipeDTO = new StatRecipeDTO();
                statRecipeDTO.setLikes(recipe.getTotalLikes());
                statRecipeDTO.setComments(recipe.getTotalReviews());
                statRecipeDTO.setViews(recipe.getTotalViews());
                recipeInfoDTO.setStats(statRecipeDTO);
                recipeInfoDTOS2.add(recipeInfoDTO);

            }
        }
        Map<String, Object> response = new HashMap<>();
        response.put("userRecipes", recipeInfoDTOS);
        response.put("likedRecipes", recipeInfoDTOS2);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/get/followers/{userId}")
    public ResponseEntity<?> getFollowers(@PathVariable("userId") Long userId) {
        List<UserFollower> followers = userFollowerService.getListByFollowing(userId);
        List<UserFollowerInfoDTO> followerDTOs = new ArrayList<>();
        for( UserFollower uf : followers) {
            User followerUser = userService.getUserById(uf.getFollower().getId().intValue());
            UserFollowerInfoDTO userDTO = new UserFollowerInfoDTO();
            userDTO.setId(followerUser.getId().longValue());
            userDTO.setName(followerUser.getFullName());
            userDTO.setAvatar(followerUser.getAvatar_url());
            userDTO.setRecipes(recipeService.getRecipesByUserId(userId).size());
            userDTO.setVerified(true);
            followerDTOs.add(userDTO);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("followers", followerDTOs);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/save/recipe/{id}")
    public ResponseEntity<?> saveRecipe(HttpServletRequest request, @PathVariable("id") Integer id){
        try{
            User user = jwtTokenUtil.getUserByToken(request);
            UserRecipeInteraction userRecipeInteraction = userRecipeInteractionService.getByUserIdAndRecipeId(user.getId(), id);
            if(userRecipeInteraction != null){
                userRecipeInteraction.setBookmarked(!userRecipeInteraction.getBookmarked());
                userRecipeInteractionService.addOrUpdate(userRecipeInteraction);
            }else{
                UserRecipeInteraction userRecipeInteraction1 = new UserRecipeInteraction();
                userRecipeInteraction1.setLiked(false);
                userRecipeInteraction1.setRecipe(recipeService.getRecipeById(id));
                userRecipeInteraction1.setUser(user);
                userRecipeInteraction1.setBookmarked(true);
                userRecipeInteraction1.setTried(false);
                userRecipeInteraction1.setMyRating(null);
                userRecipeInteraction1.setNotes(null);
                userRecipeInteractionService.addOrUpdate(userRecipeInteraction1);
            }

            return ResponseEntity.status(HttpStatus.OK).body("ok");

        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }

    }

    @GetMapping("/get/isfollowing/{userId}")
    public ResponseEntity<?> getIsFollowing(HttpServletRequest request, @PathVariable("userId") Long userId) {
        User userRequest = jwtTokenUtil.getUserByToken(request);
        List<UserFollower> followers = userFollowerService.getListByFollowing(userId);
        boolean isFollowing = false;
        for( UserFollower uf : followers) {
            if(uf.getFollower().getId().equals(userRequest.getId())) {
                isFollowing = true;
                break;
            }
        }
        Map<String, Object> response = new HashMap<>();
        response.put("isFollowing", isFollowing);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/get/saved/recipes" )
    public ResponseEntity<?> getSavedRecipes(HttpServletRequest request) {
        User userRequest = jwtTokenUtil.getUserByToken(request);
        List<UserRecipeInteraction> interactions = userRecipeInteractionService.getList();
        List<RecipSaveDTO> savedRecipes = new ArrayList<>();
        for (UserRecipeInteraction userRecipeInteraction : interactions) {
            if(userRecipeInteraction.getUser().getId().equals(userRequest.getId()) && userRecipeInteraction.getBookmarked().equals(true)) {
                Recipe recipe = recipeService.getRecipeById(userRecipeInteraction.getRecipe().getId());
                RecipSaveDTO savedRecipeDTO = new RecipSaveDTO();
                savedRecipeDTO.setId(recipe.getId());
                savedRecipeDTO.setTitle(recipe.getTitle());
                savedRecipeDTO.setImage(recipe.getImageUrl());
                Float avgRating = recipe.getAverageRating() == null
                        ? 0.0f
                        : recipe.getAverageRating().floatValue();
                savedRecipeDTO.setRating(avgRating);
                savedRecipeDTO.setLikes(recipe.getTotalLikes());
                savedRecipeDTO.setViews(recipe.getTotalViews());
                savedRecipeDTO.setDifficulty(recipe.getDifficulty());
                savedRecipeDTO.setTime( recipe.getCookTime().toString());
                AuthorDTO authorDTO = new AuthorDTO();
                User author = userService.getUserById(recipe.getChefId().intValue());
                authorDTO.setId(author.getId().longValue());
                authorDTO.setName(author.getFullName());
                authorDTO.setAvatar(author.getAvatar_url());
                savedRecipeDTO.setAuthor(authorDTO);
                savedRecipes.add(savedRecipeDTO);

            }
        }
        Map<String, Object> response = new HashMap<>();
        response.put("savedRecipes", savedRecipes);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/get/saved/recipes/{id}")
    public ResponseEntity<?> getIsSavedRecipe(HttpServletRequest request, @PathVariable("id") Integer id) {

       List<UserRecipeInteraction> interactions = userRecipeInteractionService.getList();
       List<RecipSaveDTO> savedRecipes = new ArrayList<>();
       for (UserRecipeInteraction userRecipeInteraction : interactions) {
           if(userRecipeInteraction.getUser().getId().equals(id.longValue()) && userRecipeInteraction.getBookmarked().equals(true)) {
               Recipe recipe = recipeService.getRecipeById(userRecipeInteraction.getRecipe().getId());
               RecipSaveDTO savedRecipeDTO = new RecipSaveDTO();
               savedRecipeDTO.setId(recipe.getId());
               savedRecipeDTO.setTitle(recipe.getTitle());
               savedRecipeDTO.setImage(recipe.getImageUrl());
               Float avgRating = recipe.getAverageRating() == null
                       ? 0.0f
                       : recipe.getAverageRating().floatValue();
               savedRecipeDTO.setRating(avgRating);
               savedRecipeDTO.setLikes(recipe.getTotalLikes());
               savedRecipeDTO.setViews(recipe.getTotalViews());
               savedRecipeDTO.setDifficulty(recipe.getDifficulty());
               savedRecipeDTO.setTime( recipe.getCookTime().toString());
               AuthorDTO authorDTO = new AuthorDTO();
               User author = userService.getUserById(recipe.getChefId().intValue());
               authorDTO.setId(author.getId().longValue());
               authorDTO.setName(author.getFullName());
               authorDTO.setAvatar(author.getAvatar_url());
               savedRecipeDTO.setAuthor(authorDTO);
               savedRecipes.add(savedRecipeDTO);

           }
       }
        Map<String, Object> response = new HashMap<>();
        response.put("savedRecipes", savedRecipes);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/handle/refresh/rating")
    public ResponseEntity<?> handleRefreshRating() {
        try {
            List<Recipe> recipes = recipeService.getAllWithStatus("P");
            for (Recipe recipe : recipes) {
                List<RecipeComment> comments = recipeCommentService.getListByRecipeId(recipe.getId());
                float totalRating = 0;
                for (RecipeComment comment : comments) {
                    totalRating += comment.getRating().floatValue();
                }
                float avgRating = comments.size() == 0 ? 0.0f : totalRating / comments.size();
                recipe.setAverageRating(BigDecimal.valueOf(avgRating));
                recipeService.addOrUpdate(recipe);
            }
            return ResponseEntity.status(HttpStatus.OK).body("Ratings refreshed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while refreshing ratings: " + e.getMessage());
        }
    }
}
