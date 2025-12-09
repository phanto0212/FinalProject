import styled from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 74px);
  background: #f8f9fa;
  overflow: hidden;
`;

export const ChatSidebar = styled.div`
  width: 350px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
    display: ${props => props.showChat ? 'none' : 'flex'};
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: white;
`;

export const SidebarTitle = styled.h2`
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 700;
  color: #2d5016;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchBox = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: #2d5016;
      box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 16px;
  }
`;

export const ConversationList = styled.div`
  flex: 1;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
    
    &:hover {
      background: #a0aec0;
    }
  }
`;

export const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid #f3f4f6;
  background: ${props => props.active ? 'linear-gradient(to right, #f0f7ed, #ffffff)' : 'white'};
  position: relative;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(to right, #f0f7ed, #ffffff)' : 'linear-gradient(to right, #fafafa, #ffffff)'};
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: translateX(3px) scale(0.98);
  }
  
  ${props => props.active && `
    background: linear-gradient(to right, #f0f7ed, #ffffff);
    border-left: 4px solid #2d5016;
    box-shadow: 0 2px 12px rgba(45, 80, 22, 0.1);
  `}
`;

export const Avatar = styled.div`
  position: relative;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${props => props.online ? '#10b981' : '#e5e7eb'};
    transition: all 0.3s ease;
  }
  
  .online-indicator {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    background: #10b981;
    border: 2px solid white;
    border-radius: 50%;
    animation: pulse 2s infinite;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
  }
`;

export const ConversationInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

export const UserName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TimeStamp = styled.div`
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
`;

export const LastMessage = styled.div`
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 5px;
  
  ${props => props.unread && `
    font-weight: 600;
    color: #1f2937;
  `}
`;

export const UnreadBadge = styled.div`
  min-width: 22px;
  height: 22px;
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
  color: white;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  padding: 0 7px;
  box-shadow: 0 2px 8px rgba(45, 80, 22, 0.4);
  animation: badgePulse 2s infinite;
  
  @keyframes badgePulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 2px 8px rgba(45, 80, 22, 0.4);
    }
    50% {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(45, 80, 22, 0.6);
    }
  }
`;

export const ChatMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  
  @media (max-width: 768px) {
    display: ${props => props.showChat ? 'flex' : 'none'};
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const BackButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #2d5016;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const ChatHeaderInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChatHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #6b7280;
  font-size: 18px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(45, 80, 22, 0.1);
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
  }
  
  &:hover {
    background: #f0f7ed;
    color: #2d5016;
    transform: scale(1.1);
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 25px;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
    
    &:hover {
      background: #a0aec0;
    }
  }
`;

export const DateDivider = styled.div`
  text-align: center;
  margin: 20px 0;
  position: relative;
  
  span {
    background: #f9fafb;
    padding: 5px 15px;
    border-radius: 15px;
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
    border: 1px solid #e5e7eb;
  }
`;

export const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
`;

export const Message = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-width: 70%;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
  position: relative;
  
  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

export const MessageAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const MessageBubble = styled.div`
  background: ${props => props.isOwn ? 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)' : 'white'};
  color: ${props => props.isOwn ? 'white' : '#1f2937'};
  padding: 12px 16px;
  border-radius: ${props => props.isOwn 
    ? '20px 20px 6px 20px' 
    : '20px 20px 20px 6px'};
  box-shadow: ${props => props.isOwn 
    ? '0 2px 8px rgba(45, 80, 22, 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.08)'};
  word-wrap: break-word;
  position: relative;
  animation: messageSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.2s ease;
  
  .reply-message {
    background: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.15)' : 'rgba(45, 80, 22, 0.08)'};
    border-left: 3px solid ${props => props.isOwn ? 'rgba(255, 255, 255, 0.5)' : '#2d5016'};
    padding: 8px 10px;
    margin-bottom: 8px;
    border-radius: 8px;
    
    .reply-header {
      font-size: 11px;
      font-weight: 600;
      color: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.9)' : '#2d5016'};
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .reply-text {
      font-size: 13px;
      color: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.8)' : '#6b7280'};
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  
  .reply-button {
    position: absolute;
    top: 50%;
    ${props => props.isOwn ? 'left: -40px;' : 'right: -40px;'}
    transform: translateY(-50%);
    background: white;
    border: 1px solid #e5e7eb;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #6b7280;
    font-size: 15px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    opacity: 0.7;
    
    &:hover {
      background: #2d5016;
      color: white;
      border-color: #2d5016;
      transform: translateY(-50%) scale(1.15);
      opacity: 1;
      box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
    }
    
    &:active {
      transform: translateY(-50%) scale(1.05);
    }
  }
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.isOwn 
      ? '0 4px 12px rgba(45, 80, 22, 0.35)' 
      : '0 4px 12px rgba(0, 0, 0, 0.12)'};
  }
  
  @keyframes messageSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  ${props => props.hasImage && `
    padding: 8px;
  `}
`;

export const MessageImage = styled.img`
  max-width: 250px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const MessageTime = styled.div`
  font-size: 11px;
  color: ${props => props.isOwn ? 'rgba(255, 255, 255, 0.8)' : '#9ca3af'};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
`;

export const MessageStatus = styled.span`
  font-size: 14px;
  color: ${props => props.read ? '#10b981' : 'rgba(255, 255, 255, 0.6)'};
`;

export const ChatInputContainer = styled.div`
  padding: 15px 25px;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;

export const InputWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f3f4f6;
  border-radius: 24px;
  padding: 10px 18px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  
  &:focus-within {
    background: white;
    border-color: #2d5016;
    box-shadow: 0 0 0 4px rgba(45, 80, 22, 0.1), 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  &:hover:not(:focus-within) {
    background: #e5e7eb;
  }
`;

export const ChatInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const AttachButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 20px;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(45, 80, 22, 0.1);
    transform: scale(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: #2d5016;
    transform: scale(1.15) rotate(15deg);
    
    &::after {
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  &:active {
    transform: scale(1) rotate(0deg);
  }
`;

export const SendButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${props => props.disabled 
    ? '#e5e7eb' 
    : 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)'};
  color: white;
  font-size: 20px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover:not(:disabled) {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 6px 20px rgba(45, 80, 22, 0.4);
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: scale(0.9) rotate(0deg);
    box-shadow: 0 2px 8px rgba(45, 80, 22, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  text-align: center;
  padding: 40px;
  
  .icon {
    font-size: 80px;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 14px;
    color: #9ca3af;
    max-width: 400px;
  }
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  .typing-dots {
    display: flex;
    gap: 4px;
    
    span {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: typing 1.4s infinite;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

export const RecipeShareCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 8px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(45, 80, 22, 0.2);
    border-color: #2d5016;
  }
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  .recipe-info {
    padding: 14px;
    background: linear-gradient(to bottom, #ffffff, #fafafa);
    
    h4 {
      margin: 0 0 8px 0;
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
      transition: color 0.3s ease;
    }
    
    .recipe-meta {
      display: flex;
      gap: 15px;
      font-size: 12px;
      color: #6b7280;
      
      span {
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
        
        &:hover {
          color: #2d5016;
          transform: translateY(-1px);
        }
      }
    }
  }
  
  &:hover .recipe-info h4 {
    color: #2d5016;
  }
`;

export const EmojiPicker = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 320px;
  max-height: 350px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: emojiSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #e5e7eb;
  
  @keyframes emojiSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .emoji-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 2px solid #f3f4f6;
    background: linear-gradient(to bottom, #f9fafb, #ffffff);
    
    span {
      font-weight: 600;
      color: #2d5016;
      font-size: 14px;
    }
    
    button {
      background: none;
      border: none;
      font-size: 24px;
      color: #9ca3af;
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
      
      &:hover {
        background: #f3f4f6;
        color: #1f2937;
        transform: rotate(90deg);
      }
    }
  }
  
  .emoji-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 4px;
    padding: 12px;
    max-height: 280px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 3px;
      
      &:hover {
        background: #a0aec0;
      }
    }
    
    .emoji-item {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: #f0f7ed;
        transform: scale(1.3);
        z-index: 1;
      }
      
      &:active {
        transform: scale(1.1);
      }
    }
  }
`;
