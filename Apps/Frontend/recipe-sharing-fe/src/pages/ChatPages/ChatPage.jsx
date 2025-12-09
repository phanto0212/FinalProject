import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { 
  MessageOutlined, 
  SearchOutlined, 
  PhoneOutlined, 
  VideoCameraOutlined,
  MoreOutlined,
  SmileOutlined,
  PaperClipOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  StarOutlined,
  FireOutlined,
  RollbackOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { message as antMessage, Modal } from 'antd';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import {
  ChatContainer,
  ChatSidebar,
  SidebarHeader,
  SidebarTitle,
  SearchBox,
  ConversationList,
  ConversationItem,
  Avatar,
  ConversationInfo,
  ConversationHeader,
  UserName,
  TimeStamp,
  LastMessage,
  UnreadBadge,
  ChatMain,
  ChatHeader,
  BackButton,
  ChatHeaderInfo,
  ChatHeaderActions,
  ActionButton,
  MessagesContainer,
  DateDivider,
  MessageGroup,
  Message,
  MessageAvatar,
  MessageBubble,
  MessageText,
  MessageTime,
  MessageStatus,
  MessageImage,
  ChatInputContainer,
  InputWrapper,
  ChatInput,
  AttachButton,
  SendButton,
  EmptyState,
  TypingIndicator,
  RecipeShareCard,
  EmojiPicker
} from './style';
import newRequest from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
  }, []);
useEffect(() => {
      let stompClient;
      let socket;
      
      const connectWebSocket = () => {
          socket = new SockJS('http://localhost:8081/ws'); // Kết nối WebSocket
          stompClient = new Client({
              webSocketFactory: () => socket,
              debug: (str) => console.log('WebSocket Log:', str),
          });
  
          stompClient.onConnect = () => {
              console.log(`Connected to WebSocket for ticket ${userId}`);
  
              // Subscribe to the payment topic
              stompClient.subscribe(`/topic/message/user/${userId}`, (message) => {
                  const response = message.body;
                
                  loadMessages(selectedChat.id);
                  if(userId != response){
                  handleReadMessage(selectedChat.id);
                  }
                  loadConversations();
                
                  
              });
              //  stompClient.subscribe(`/topic/message/conversation/${selectedChat.id}`, (message) => {
              //     const response = message.body;
              //    if (response === "success") {
              //     loadMessages(selectedChat.id);
              //     handleReadMessage(selectedChat.id);
              //    }
                  
              // });
          };
  
          stompClient.onStompError = (frame) => {
              console.error('STOMP Error:', frame);
          };
  
          stompClient.onDisconnect = () => {
              console.log('Disconnected from WebSocket');
              // Tự động kết nối lại sau 5 giây
              setTimeout(connectWebSocket, 5000); // Sau 5 giây sẽ gọi lại connectWebSocket để thử kết nối lại
          };
  
          stompClient.activate();
      };
  
      connectWebSocket(); // Ban đầu kết nối
  
      // Cleanup WebSocket khi component unmount
      return () => {
          if (stompClient && stompClient.active) {
              stompClient.deactivate();
          }
      };
  }, [userId, selectedChat?.id]); // Phụ thuộc vào id và movie.id
  useEffect(() => {
    if (token) {
      loadConversations();
      getCurrentUser();
    }
  }, [token]);

  const getCurrentUser = async () => {
    try {
      const response = await newRequest.get('/api/auth/get/info', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        console.log('Current user info:', response.data.myInfo);
        setCurrentUser(response.data.myInfo);
        setUserId(response.data.userId);
      }
    } catch (error) {
      console.log('Error fetching current user:', error);
    }
  };

  const loadConversations = async () => {
    try {
      const response = await newRequest.get('/api/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Conversations response:', response);
      if (response.status === 200) {
        // Chuyển đổi 'own' thành 'isOwn' từ backend cho lastMessage
        const conversationsWithIsOwn = (response.data.conversations || []).map(conv => ({
          ...conv,
          isOwn: conv.own !== undefined ? conv.own : conv.isOwn
        }));
        console.log('Converted conversations:', conversationsWithIsOwn);
        setConversations(conversationsWithIsOwn);
      }
    } catch (error) {
      console.log('Error loading conversations:', error);
      // Sample data for demo
      setConversations([
        {
          id: 1,
          user: {
            id: 2,
            name: 'Chef Minh',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
            online: true
          },
          lastMessage: 'Công thức phở của bạn tuyệt vời quá!',
          timestamp: '10:30',
          unread: 2,
          isOwn: false
        },
        {
          id: 2,
          user: {
            id: 3,
            name: 'Chef Lan',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=50&h=50&fit=crop',
            online: false
          },
          lastMessage: 'Mình vừa thử món bánh mì của bạn rồi',
          timestamp: 'Hôm qua',
          unread: 0,
          isOwn: true
        },
        {
          id: 3,
          user: {
            id: 4,
            name: 'Chef Tuấn',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
            online: true
          },
          lastMessage: 'Cho mình xin công thức làm nước mắm được không?',
          timestamp: '2 ngày trước',
          unread: 0,
          isOwn: false
        }
      ]);
    }
  };

  const loadMessages = async (chatId) => {
    if(chatId == null) return;
    console.log('Loading messages for chatId:', chatId);
    console.log('Token exists:', !!token);
    try {
      const response = await newRequest.get(`/api/chat/get/all/messages/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Messages response:', response);
      if (response.status === 200) {
        // Chuyển đổi 'own' thành 'isOwn' từ backend
        const messagesWithIsOwn = (response.data.messages || []).map(msg => ({
          ...msg,
          isOwn: msg.own !== undefined ? msg.own : msg.isOwn
        }));
        setMessages(messagesWithIsOwn);
      }
    } catch (error) {
      console.log('Error loading messages:', error);
      console.log('Error response:', error.response);
      console.log('Error message:', error.message);
      // Sample messages for demo
      setMessages([
        {
          id: 1,
          text: 'Chào bạn! Mình rất thích công thức phở của bạn đấy!',
          timestamp: '10:25',
          isOwn: false,
          read: true
        },
        {
          id: 2,
          text: 'Cảm ơn bạn nhiều nha! 😊',
          timestamp: '10:26',
          isOwn: true,
          read: true
        },
        {
          id: 3,
          text: 'Mình có thể hỏi bạn về cách làm nước dùng được không?',
          timestamp: '10:27',
          isOwn: false,
          read: true
        },
        {
          id: 4,
          text: 'Được chứ! Bạn muốn biết phần nào?',
          timestamp: '10:28',
          isOwn: true,
          read: true
        },
        {
          id: 5,
          text: 'Làm sao để nước dùng trong veo và ngọt tự nhiên ạ?',
          timestamp: '10:29',
          isOwn: false,
          read: true
        },
        {
          id: 6,
          text: 'Bí quyết là phải chần xương thật kỹ, sau đó ninh lửa nhỏ trong 6-8 tiếng. Không được đun sôi mạnh nhé!',
          timestamp: '10:30',
          isOwn: true,
          read: false
        }
      ]);
    }
  };

  const handleReadMessage = async (conversationId) => {
    if(conversationId == null) return;
    const  response = await newRequest.post(`/api/chat/read/messages/${conversationId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if(response.status === 200) {
      console.log('Marked messages as read for conversationId:', conversationId);
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowChat(true);
    loadMessages(chat.id);
    handleReadMessage(chat.id);
    loadConversations();
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      read: false,
      replyTo: replyingTo ? {
        id: replyingTo.id,
        text: replyingTo.text,
        userName: replyingTo.isOwn ? 'Bạn' : selectedChat.user.name
      } : null
    };
    console.log('🔵 Sending message:', newMessage);
    try {
      const response = await newRequest.post(`/api/chat/send/message/${selectedChat.id}`, {
        id: newMessage.id,
        text: newMessage.text,
        timestamp: newMessage.timestamp,
        isOwn: newMessage.isOwn,
        read: newMessage.read,
        replyTo: newMessage.replyTo
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Send message response:', response);
      if (response.status === 200) {
        antMessage.success('Đã gửi tin nhắn!');
      }
      setMessages([...messages, newMessage]);
      setMessageInput('');
      setReplyingTo(null);
      scrollToBottom();
      antMessage.success('Đã gửi tin nhắn!');
    } catch (error) {
      console.log('Error sending message:', error);
      setMessages([...messages, newMessage]);
      setMessageInput('');
      setReplyingTo(null);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    setShowChat(false);
    setSelectedChat(null);
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(msg => {
      const date = 'Hôm nay'; // You can implement date grouping logic here
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  const handleEmojiClick = (emoji) => {
    setMessageInput(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
    '🙂', '😊', '😇', '😍', '🥰', '😘', '😗', '😙',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓',
    '😎', '🥳', '🤩', '😏', '😒', '😞', '😔', '😟',
    '😢', '😭', '😤', '😠', '😡', '🤬', '😱', '😨',
    '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙',
    '👏', '🙌', '👐', '🤝', '🙏', '✍️', '💪', '🦾',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤',
    '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘',
    '🍕', '🍔', '🍟', '🌭', '🍿', '🧈', '🍞', '🥐',
    '🥖', '🥨', '🥯', '🧇', '🥞', '🧀', '🍖', '🍗',
    '🥩', '🥓', '🍔', '🍟', '🍕', '🌮', '🌯', '🥙',
    '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧂', '🥫',
    '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠',
    '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠',
    '🍰', '🎂', '🧁', '🥧', '🍮', '🍭', '🍬', '🍫'
  ];

  return (
    <DefaultComponent>
      <ChatContainer style={{ marginTop: '79px' }}>
        {/* Sidebar */}
        <ChatSidebar showChat={showChat}>
          <SidebarHeader>
            <SidebarTitle>
              <MessageOutlined />
              Tin nhắn
            </SidebarTitle>
            <SearchBox>
              <SearchOutlined className="search-icon" />
              <input
                type="text"
                placeholder="Tìm kiếm cuộc trò chuyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchBox>
          </SidebarHeader>

          <ConversationList>
            {filteredConversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                active={selectedChat?.id === conv.id}
                onClick={() => handleSelectChat(conv)}
              >
                <Avatar online={conv.user.online}>
                  <img src={conv.user.avatar} alt={conv.user.name} />
                  {conv.user.online && <div className="online-indicator" />}
                </Avatar>

                <ConversationInfo>
                  <ConversationHeader>
                    <UserName>{conv.user.name}</UserName>
                    <TimeStamp>{conv.timestamp}</TimeStamp>
                  </ConversationHeader>
                  <LastMessage unRead={conv.unRead > 0}>
                    {conv.isOwn && 'Bạn: '}
                    {conv.lastMessage}
                  </LastMessage>
                </ConversationInfo>

                {conv.unRead > 0 && (
                  <UnreadBadge>{conv.unRead}</UnreadBadge>
                )}
              </ConversationItem>
            ))}
          </ConversationList>
        </ChatSidebar>

        {/* Main Chat Area */}
        <ChatMain showChat={showChat}>
          {selectedChat ? (
            <>
              <ChatHeader>
                <BackButton onClick={handleBack}>
                  <ArrowLeftOutlined />
                </BackButton>

                <ChatHeaderInfo>
                  <Avatar online={selectedChat.user.online}>
                    <img src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                    {selectedChat.user.online && <div className="online-indicator" />}
                  </Avatar>
                  <div>
                    <UserName>{selectedChat.user.name}</UserName>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {selectedChat.user.online ? 'Đang hoạt động' : 'Không hoạt động'}
                    </div>
                  </div>
                </ChatHeaderInfo>

                <ChatHeaderActions>
                  <ActionButton>
                    <PhoneOutlined />
                  </ActionButton>
                  <ActionButton>
                    <VideoCameraOutlined />
                  </ActionButton>
                  <ActionButton>
                    <MoreOutlined />
                  </ActionButton>
                </ChatHeaderActions>
              </ChatHeader>

              <MessagesContainer>
                {Object.entries(messageGroups).map(([date, msgs]) => (
                  <React.Fragment key={date}>
                    <DateDivider>
                      <span>{date}</span>
                    </DateDivider>

                    {msgs.map((msg, index) => (
                      <MessageGroup key={msg.id} isOwn={msg.isOwn}>
                        <Message isOwn={msg.isOwn}>
                          {!msg.isOwn && index === 0 && (
                            <MessageAvatar src={selectedChat.user.avatar} alt="" />
                          )}
                          {!msg.isOwn && index !== 0 && (
                            <div style={{ width: '32px' }} />
                          )}

                          <div>
                            <MessageBubble isOwn={msg.isOwn} hasImage={msg.image}>
                              {msg.replyTo && (
                                <div className="reply-message">
                                  <div className="reply-header">
                                    <RollbackOutlined /> Trả lời {msg.replyTo.userName}
                                  </div>
                                  <div className="reply-text">{msg.replyTo.text}</div>
                                </div>
                              )}
                              {msg.image && (
                                <MessageImage src={msg.image} alt="Shared image" />
                              )}
                              {msg.recipe && (
                                <RecipeShareCard onClick={() => navigate(`/recipe/detail/${msg.recipe.id}`)}>
                                  <img src={msg.recipe.image} alt={msg.recipe.title} />
                                  <div className="recipe-info">
                                    <h4>{msg.recipe.title}</h4>
                                    <div className="recipe-meta">
                                      <span>
                                        <ClockCircleOutlined /> {msg.recipe.time}
                                      </span>
                                      <span>
                                        <StarOutlined /> {msg.recipe.rating}
                                      </span>
                                      <span>
                                        <FireOutlined /> {msg.recipe.difficulty}
                                      </span>
                                    </div>
                                  </div>
                                </RecipeShareCard>
                              )}
                              {msg.text && <MessageText>{msg.text}</MessageText>}
                              <button 
                                className="reply-button"
                                onClick={() => handleReply(msg)}
                                title="Trả lời"
                              >
                                <RollbackOutlined />
                              </button>
                            </MessageBubble>
                            <MessageTime isOwn={msg.isOwn}>
                              {msg.timestamp}
                              {msg.isOwn && (
                                <MessageStatus read={msg.read}>
                                  <CheckOutlined />
                                  {msg.read && <CheckOutlined style={{ marginLeft: '-8px' }} />}
                                </MessageStatus>
                              )}
                            </MessageTime>
                          </div>
                        </Message>
                      </MessageGroup>
                    ))}
                  </React.Fragment>
                ))}

                {isTyping && (
                  <MessageGroup isOwn={false}>
                    <Message isOwn={false}>
                      <MessageAvatar src={selectedChat.user.avatar} alt="" />
                      <TypingIndicator>
                        <div className="typing-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </TypingIndicator>
                    </Message>
                  </MessageGroup>
                )}

                <div ref={messagesEndRef} />
              </MessagesContainer>

              <ChatInputContainer>
                {replyingTo && (
                  <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    right: 0,
                    background: '#f0f7ed',
                    padding: '12px 25px',
                    borderTop: '2px solid #2d5016',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px'
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: '#2d5016', fontWeight: 600, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <RollbackOutlined /> Đang trả lời {replyingTo.isOwn ? 'chính bạn' : selectedChat.user.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {replyingTo.text}
                      </div>
                    </div>
                    <button
                      onClick={handleCancelReply}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        fontSize: '20px',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(0,0,0,0.1)';
                        e.target.style.color = '#1f2937';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'none';
                        e.target.style.color = '#9ca3af';
                      }}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                )}
                <AttachButton>
                  <PaperClipOutlined />
                </AttachButton>

                <InputWrapper>
                  <div style={{ position: 'relative' }} ref={emojiPickerRef}>
                    <AttachButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <SmileOutlined />
                    </AttachButton>
                    {showEmojiPicker && (
                      <EmojiPicker>
                        <div className="emoji-header">
                          <span>Chọn emoji</span>
                          <button onClick={() => setShowEmojiPicker(false)}>×</button>
                        </div>
                        <div className="emoji-grid">
                          {emojis.map((emoji, index) => (
                            <button
                              key={index}
                              className="emoji-item"
                              onClick={() => handleEmojiClick(emoji)}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </EmojiPicker>
                    )}
                  </div>
                  <ChatInput
                    placeholder="Nhập tin nhắn..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </InputWrapper>

                <SendButton
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <SendOutlined />
                </SendButton>
              </ChatInputContainer>
            </>
          ) : (
            <EmptyState>
              <div className="icon">💬</div>
              <h3>Chọn một cuộc trò chuyện</h3>
              <p>Chọn từ danh sách bên trái để bắt đầu trò chuyện về các công thức nấu ăn yêu thích của bạn!</p>
            </EmptyState>
          )}
        </ChatMain>
      </ChatContainer>
    </DefaultComponent>
  );
};

export default ChatPage;
