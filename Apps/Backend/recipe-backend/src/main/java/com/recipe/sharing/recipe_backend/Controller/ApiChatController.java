package com.recipe.sharing.recipe_backend.Controller;

import com.recipe.sharing.recipe_backend.Configs.JwtTokenUtil;
import com.recipe.sharing.recipe_backend.DTO.*;
import com.recipe.sharing.recipe_backend.Entity.Conversation;
import com.recipe.sharing.recipe_backend.Entity.Message;
import com.recipe.sharing.recipe_backend.Entity.Recipe;
import com.recipe.sharing.recipe_backend.Entity.User;
import com.recipe.sharing.recipe_backend.Service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ApiChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageReadService messageReadService;

    @Autowired
    private TypingIndicatorService typingIndicatorService;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        List<Conversation> conversations = conversationService.getConversations(user.getId());
        List<ConversationDTO> conversationDTOS = new ArrayList<>();
        for (Conversation conversation : conversations) {
            ConversationDTO conversationDTO = new ConversationDTO();
            conversationDTO.setId(conversation.getId());
            List<Message> unReadMessages = new ArrayList<>();
            if(user.getId().equals(conversation.getUser1Id())) {
              unReadMessages = messageService.getUnReadMessageByConversation(conversation.getId(), conversation.getUser2Id());
            }else{
                unReadMessages = messageService.getUnReadMessageByConversation(conversation.getId(), conversation.getUser1Id());
            }
            List<Message> lastMessages = messageService.getLastMessagesForConversation(conversation.getId(), 1);
            if (!lastMessages.isEmpty()) {
                conversationDTO.setLastMessage(lastMessages.get(0).getMessageText());
                if (lastMessages.get(0).getSenderId().equals(user.getId())) {
                    conversationDTO.setOwn(true);
                }else {
                    conversationDTO.setOwn(false);
                }
                conversationDTO.setRawTimestamp(lastMessages.get(0).getCreatedAt());
                conversationDTO.setTimestamp(formatTime(lastMessages.get(0).getCreatedAt()));
            }
            conversationDTO.setUnRead(0);
            if (!unReadMessages.isEmpty()) {
                conversationDTO.setUnRead(unReadMessages.size());
            }
            UserDTO userDTO = new UserDTO();
            if(conversation.getUser1Id().equals(user.getId())) {
                User user1 = userService.getUserById(conversation.getUser2Id().intValue());
                userDTO.setId(user1.getId());
                userDTO.setName(user1.getFullName());
                userDTO.setAvatar(user1.getAvatar_url());
                userDTO.setOnline(user1.getOnline());
            }else {
                User user2 = userService.getUserById(conversation.getUser1Id().intValue());
                userDTO.setId(user2.getId());
                userDTO.setName(user2.getFullName());
                userDTO.setAvatar(user2.getAvatar_url());
                userDTO.setOnline(user2.getOnline());
            }
            conversationDTO.setUser(userDTO);
            conversationDTOS.add(conversationDTO);
        }
        conversationDTOS.sort((c1, c2) -> {
            if (c1.getRawTimestamp() == null) return 1;
            if (c2.getRawTimestamp() == null) return -1;
            return c2.getRawTimestamp().compareTo(c1.getRawTimestamp()); // mới nhất → trên
        });
        Map<String, Object> response = new HashMap<>();
        response.put("conversations", conversationDTOS);
        return ResponseEntity.ok(response);
    }
    public String formatTime(Timestamp timestamp) {
        LocalDateTime dateTime = timestamp.toLocalDateTime();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return dateTime.format(formatter);
    }
    @GetMapping("/get/all/messages/{id}")
    public ResponseEntity<?> getAllMessages(@PathVariable("id") Long id, HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        List<Message> messages = messageService.getMessagesByConversationId(id);
        List<MessageDTO> messageDTOS = new ArrayList<>();
        for (Message message : messages) {
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setId(message.getId());
            messageDTO.setRead(message.getRead());
            messageDTO.setText(message.getMessageText());
            if(message.getSenderId().equals(user.getId())) {
                messageDTO.setOwn(true);
            }else{
                messageDTO.setOwn(false);
            }
            messageDTO.setTimestamp(formatTime(message.getCreatedAt()));
            Message repply = messageService.getRepplyMessage(message.getReplyToMessageId());
            if(repply != null){
                RepplyToDTO replyToDTO = new RepplyToDTO();
                replyToDTO.setId(repply.getId());
                replyToDTO.setText(repply.getMessageText());
                User userReplly = userService.getUserById(repply.getSenderId().intValue());
                replyToDTO.setUserName(userReplly.getFullName());
                messageDTO.setReplyTo(replyToDTO);
            }else {
                messageDTO.setReplyTo(null);
            }
            if(message.getRecipeId() != null) {
                Recipe recipe = recipeService.getRecipeById(message.getRecipeId());
                if(recipe != null) {
                    RecipeMessageDTO recipeMessageDTO = new RecipeMessageDTO();
                    recipeMessageDTO.setId(recipe.getId());
                    recipeMessageDTO.setImage(recipe.getImageUrl());
                    recipeMessageDTO.setTitle(recipe.getTitle());
                    recipeMessageDTO.setTime(recipe.getCookTime().toString());
                    recipeMessageDTO.setDifficulty(recipe.getDifficulty());
                    recipeMessageDTO.setRating(recipe.getAverageRating().floatValue());
                    messageDTO.setRecipe(recipeMessageDTO);
                }
            }
            messageDTOS.add(messageDTO);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("messages", messageDTOS);
        return ResponseEntity.ok(response);

    }
    @PostMapping("/send/message/{id}")
    public ResponseEntity<?> sendMessage(@PathVariable("id") Long id, @RequestBody MessageDTO messageDTO, HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        Message message = new Message();
        message.setConversationId(id);
        message.setSenderId(user.getId());
        message.setMessageText(messageDTO.getText());
        message.setMessageType("text");
        message.setRead(false);
        message.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        if(messageDTO.getReplyTo() != null) {
            message.setReplyToMessageId(messageDTO.getReplyTo().getId());
        }
        messageService.addOrUpdate(message);
        messagingTemplate.convertAndSend(
                "/topic/message/user/" + user.getId(),
                user.getId()
        );
        Conversation conversation = conversationService.getConversationById(id);
        Long receiverId = 0L;
        if(conversation != null) {
            if (conversation.getUser1Id().equals(user.getId())) {
                receiverId = conversation.getUser2Id();
            } else {
                receiverId = conversation.getUser1Id();
            }
        }
        messagingTemplate.convertAndSend(
                "/topic/message/user/" + receiverId,
                "success"
        );
//        messagingTemplate.convertAndSend(
//                "/topic/message/conversation/" + id,
//                "success"
//        );


        return ResponseEntity.ok(message);
    }
    @PostMapping("/read/messages/{id}")
    public ResponseEntity<?> readMessages(@PathVariable("id") Long id, HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        Conversation conversation = conversationService.getConversationById(id);
        List<Message> unReadMessages = new ArrayList<>();
        if(user.getId().equals(conversation.getUser1Id())) {
           unReadMessages = messageService.getUnReadMessageByConversation(id, conversation.getUser2Id());
        }else{
            unReadMessages = messageService.getUnReadMessageByConversation(id, conversation.getUser1Id());
        }
        for (Message message : unReadMessages) {
            if(!message.getSenderId().equals(user.getId())) {
                message.setRead(true);
                messageService.addOrUpdate(message);
            }
        }

        return ResponseEntity.ok().build();
    }
    @PostMapping("/send/share/message")
    public ResponseEntity<?> sendShareMessage(@RequestBody MessageShareDTO messageDTO, HttpServletRequest request) {
        User user = jwtTokenUtil.getUserByToken(request);
        User user2 =userService.getUserById( messageDTO.getReceiverId().intValue());
        List<Conversation> conversation = conversationService.getConversations(user.getId());
        Long conversationId = null;
        for(Conversation conv : conversation) {
            if(conv.getUser1Id().equals(user.getId())) {
                if(conv.getUser2Id().equals(user2.getId())) {
                    conversationId = conv.getId();
                    break;
                }
            }else{
                if(conv.getUser1Id().equals(user2.getId())) {
                    if(conv.getUser2Id().equals(user.getId())) {
                        conversationId = conv.getId();
                        break;
                    }
                }
            }
        }
        Message message = new Message();
        message.setConversationId(conversationId);
        message.setSenderId(user.getId());
        message.setMessageText(messageDTO.getMessage());
        message.setMessageType("text");
        message.setRead(false);
        message.setRecipeId(messageDTO.getRecipeId());
        message.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        messageService.addOrUpdate(message);
        return ResponseEntity.ok(message);
    }
}
