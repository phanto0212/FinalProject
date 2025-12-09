package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.DTO.UserConversationDTO;
import com.recipe.sharing.recipe_backend.DTO.UserSuggestDTO;
import com.recipe.sharing.recipe_backend.Entity.Conversation;
import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Entity.UserFollower;
import com.recipe.sharing.recipe_backend.Service.ConversationService;
import com.recipe.sharing.recipe_backend.Service.UserFollowerService;
import com.recipe.sharing.recipe_backend.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping( "/api/user/followers")
public class ApiUserFollowerController {

    @Autowired
    private UserFollowerService userFollowerService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private ConversationService conversationService;

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllFollowers(HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        List<UserFollower> followers = userFollowerService.getListByFollower(user.getId());
        List<Long> followerIds = new ArrayList<>();
        for( UserFollower uf : followers) {
        	followerIds.add(uf.getFollowing().getId());
        }
        return ResponseEntity.ok(followerIds);
    }
    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addFollower(HttpServletRequest request,@PathVariable("userId") Long userId) {
        User user = jwtTokenUtil.getUserByToken(request);
        User userFollow = userService.getUserById(userId.intValue());
        UserFollower userFollower = userFollowerService.getFollower(user.getId(), userFollow.getId());
        if(userFollower != null) {
            userFollowerService.removeFollower(user.getId(), userFollow.getId());
        }else{
            UserFollower newFollower = new UserFollower();
            newFollower.setFollower(user);
            newFollower.setFollowing(userFollow);
            userFollowerService.addFollower(newFollower);
        }
        boolean isHaveConversation = false;
        List<Conversation> conversation = conversationService.getConversations(user.getId());
        for(Conversation conv : conversation) {
            if(conv.getUser1Id().equals(user.getId())) {
                if(conv.getUser2Id().equals(userFollow.getId())) {
                    isHaveConversation = true;
                    break;
                }
            }else{
                if(conv.getUser1Id().equals(userFollow.getId())) {
                    if(conv.getUser2Id().equals(user.getId())) {
                        isHaveConversation = true;
                        break;
                    }
                }
            }
        }
        if(!isHaveConversation) {
            Conversation newConv = new Conversation();
            newConv.setUser1Id(user.getId());
            newConv.setUser2Id(userFollow.getId());
            newConv.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            conversationService.addOrUpdate(newConv);
        }

        return ResponseEntity.ok("Follower added successfully");
    }
    @GetMapping("/suggest/friends")
    public ResponseEntity<?> suggestFriends(HttpServletRequest request) {
        try{
            User user = jwtTokenUtil.getUserByToken(request);
            List<User> users = userService.getAllUsersOther(user.getId());
            List<UserSuggestDTO> suggestedUsers = new ArrayList<>();
            for(User u : users) {
                UserSuggestDTO userSuggestDTO = new UserSuggestDTO();
                userSuggestDTO.setId(u.getId());
                userSuggestDTO.setName(u.getUsername());
                List<UserFollower> followers = userFollowerService.getListByFollowing(u.getId());
                userSuggestDTO.setFollowers(followers.size() + "");
                userSuggestDTO.setAvatar(u.getAvatar_url());
                userSuggestDTO.setVerified(true);
                List<UserFollower> thisfollowings = userFollowerService.getListByFollowing(u.getId());
                List<UserFollower> thatfollowings = userFollowerService.getListByFollowing(user.getId());
                int friendCount = 0;
                for(UserFollower tUserFollower : thisfollowings) {
                    for(UserFollower fUserFollower : thatfollowings) {
                        if(tUserFollower.getFollower().getId().equals(fUserFollower.getFollower().getId())) {
                            friendCount++;
                        }
                    }
                }
                userSuggestDTO.setMutualFriends(friendCount);
                suggestedUsers.add(userSuggestDTO);
            }
            Map<String,Object> response = new HashMap<>();
            response.put("suggestedUsers", suggestedUsers);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
    @GetMapping("/get/followers")
    public ResponseEntity<?> getFollowers(HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        List<UserFollower> followers = userFollowerService.getListByFollowing(user.getId());
        List<Long> followerIds = new ArrayList<>();
        for( UserFollower uf : followers) {
        	followerIds.add(uf.getFollower().getId());
        }
        return ResponseEntity.ok(followerIds);
    }
    @GetMapping("/get/all/user")
    public ResponseEntity<?> getAllFollowersByUserId(HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        List<Conversation> conversations = conversationService.getConversations(user.getId());
        List<Long> followerIds = new ArrayList<>();
        for( Conversation uf : conversations) {
        	if(uf.getUser1Id().equals(user.getId())) {
                followerIds.add(uf.getUser2Id());
            }
            	else {
                    followerIds.add(uf.getUser1Id());
                }
        }
        List<UserConversationDTO> userConversationDTOS = new ArrayList<>();
        for(Long id : followerIds) {
            User u = userService.getUserById(id.intValue());
            UserConversationDTO userConversationDTO = new UserConversationDTO();
            userConversationDTO.setId(u.getId());
            userConversationDTO.setName(u.getFullName());
            userConversationDTO.setAvatar(u.getAvatar_url());
            userConversationDTO.setVerified(true);
            userConversationDTO.setAvatar(u.getAvatar_url());
            userConversationDTO.setUsername(u.getUsername());
            userConversationDTOS.add(userConversationDTO);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("users", userConversationDTOS);
        return ResponseEntity.ok(response);
    }
}