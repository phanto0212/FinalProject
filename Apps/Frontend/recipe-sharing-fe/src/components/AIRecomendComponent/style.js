import styled, { keyframes } from 'styled-components';
import { Button, Avatar } from 'antd';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const typing = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Main Container
export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 92vh;
  max-width: 1400px;
  width: 98%;
  margin: 10px auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 95vh;
    width: 99%;
    margin: 2px auto;
    border-radius: 15px;
  }
  
  @media (min-width: 1200px) {
    max-width: 1600px;
    height: 94vh;
  }
  
  @media (min-width: 1600px) {
    max-width: 1800px;
    height: 95vh;
  }
`;

// Chat Header
export const ChatHeader = styled.div`
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
  padding: 25px 30px;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff8c00, #ffb347);
  }
  
  h3 {
    font-size: 1.4rem !important;
  }
  
  span {
    font-size: 1rem !important;
  }
  
  @media (max-width: 768px) {
    padding: 18px 22px;
    
    h3 {
      font-size: 1.2rem !important;
    }
    
    span {
      font-size: 0.9rem !important;
    }
  }
  
  @media (min-width: 1200px) {
    padding: 30px 35px;
    
    h3 {
      font-size: 1.6rem !important;
    }
    
    span {
      font-size: 1.1rem !important;
    }
  }
`;

// Chat Body
export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 25px 30px;
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(45, 80, 22, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #2d5016, #4a7c59);
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    padding: 18px 20px;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
  
  @media (min-width: 1200px) {
    padding: 30px 40px;
    
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
`;

// Message Container
export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 25px;
  animation: ${fadeInUp} 0.3s ease-out;
  
  @media (min-width: 1200px) {
    margin-bottom: 30px;
  }
`;

// Message Bubble
export const MessageBubble = styled.div`
  max-width: 80%;
  padding: 22px 28px;
  width: 700px;
  border-radius: ${props => props.$isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px'};
  background: ${props => props.$isUser 
    ? 'linear-gradient(135deg, #ff8c00, #ffb347)' 
    : 'white'
  };
  color: ${props => props.$isUser ? 'white' : '#333'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word;
  white-space: pre-line;
  line-height: 1.7;
  font-size: 16px;
  
  ${props => !props.$isUser && `
    border: 1px solid rgba(45, 80, 22, 0.1);
  `}
  
  @media (max-width: 768px) {
    max-width: 88%;
    padding: 18px 22px;
    font-size: 15px;
  }
  
  @media (min-width: 1200px) {
    max-width: 82%;
    padding: 25px 32px;
    font-size: 17px;
  }
  
  @media (min-width: 1600px) {
    padding: 28px 35px;
    font-size: 18px;
  }
`;

// User Message
export const UserMessage = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  animation: ${slideInRight} 0.3s ease-out;
`;

// AI Message
export const AIMessage = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  animation: ${slideInLeft} 0.3s ease-out;
`;

// Message Time
export const MessageTime = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 10px;
  text-align: right;
`;

// Avatars
export const AIAvatar = styled(Avatar)`
  background: linear-gradient(135deg, #2d5016, #4a7c59) !important;
  flex-shrink: 0;
`;

export const UserAvatar = styled(Avatar)`
  background: linear-gradient(135deg, #ff8c00, #ffb347) !important;
  flex-shrink: 0;
`;

// Chat Input
export const ChatInput = styled.div`
  padding: 25px 30px;
  background: white;
  border-top: 1px solid rgba(45, 80, 22, 0.1);
  
  @media (max-width: 768px) {
    padding: 18px 22px;
  }
  
  @media (min-width: 1200px) {
    padding: 30px 40px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 18px;
  padding: 18px 24px;
  background: rgba(45, 80, 22, 0.05);
  border-radius: 30px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: rgba(45, 80, 22, 0.3);
    background: rgba(45, 80, 22, 0.08);
  }
  
  .ant-input {
    font-size: 16px !important;
    
    &:focus {
      box-shadow: none !important;
    }
  }
  
  @media (max-width: 768px) {
    padding: 15px 20px;
    gap: 15px;
    
    .ant-input {
      font-size: 15px !important;
    }
  }
  
  @media (min-width: 1200px) {
    padding: 20px 28px;
    gap: 20px;
    
    .ant-input {
      font-size: 17px !important;
    }
  }
  
  @media (min-width: 1600px) {
    padding: 22px 30px;
    
    .ant-input {
      font-size: 18px !important;
    }
  }
`;

export const SendButton = styled(Button)`
  background: linear-gradient(135deg, #ff8c00, #ffb347) !important;
  border: none !important;
  border-radius: 50% !important;
  width: 45px !important;
  height: 45px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3) !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4) !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
  
  &:disabled {
    background: #ccc !important;
    transform: none !important;
    box-shadow: none !important;
  }
  
  @media (min-width: 1200px) {
    width: 48px !important;
    height: 48px !important;
  }
`;

// Loading Message
export const LoadingMessage = styled.div`
  background: white;
  padding: 15px 18px;
  border-radius: 20px 20px 20px 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(45, 80, 22, 0.1);
  display: flex;
  align-items: center;
  color: #666;
  font-style: italic;
  
  .ant-spin-dot {
    animation: ${typing} 1.4s infinite ease-in-out;
  }
`;

// Recipe Suggestions
export const SuggestionsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RecipeCard = styled.div`
  display: flex;
  background: rgba(45, 80, 22, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(45, 80, 22, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(45, 80, 22, 0.15);
    background: rgba(45, 80, 22, 0.08);
  }
`;

export const RecipeImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

export const RecipeContent = styled.div`
  padding: 12px 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const RecipeTitle = styled.h4`
  margin: 0 0 6px 0;
  color: #2d5016;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
`;

export const RecipeDesc = styled.p`
  margin: 0 0 8px 0;
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RecipeMeta = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  color: #999;
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
  }
`;

// Welcome Message
export const WelcomeMessage = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const QuickSuggestions = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(45, 80, 22, 0.1);
  margin-bottom: 20px;
  border: 1px solid rgba(45, 80, 22, 0.1);
`;

export const QuickButton = styled.button`
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 89, 0.05));
  border: 1px solid rgba(45, 80, 22, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  color: #2d5016;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 50px;
  
  &:hover {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.15), rgba(74, 124, 89, 0.1));
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(45, 80, 22, 0.15);
    animation: ${pulse} 0.6s ease;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 0.85rem;
    min-height: 45px;
  }
`;

// Responsive adjustments
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${RecipeCard} {
      flex-direction: column;
      
      ${RecipeImage} {
        width: 100%;
        height: 120px;
      }
    }
    
    ${MessageBubble} {
      font-size: 0.9rem;
    }
    
    ${QuickButton} {
      font-size: 0.8rem;
      padding: 8px 12px;
    }
  }
`;
