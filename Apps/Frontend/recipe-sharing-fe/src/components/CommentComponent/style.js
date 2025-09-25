import styled, { keyframes } from 'styled-components';
import { Button, Avatar, Card, Rate, Input } from 'antd';

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

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
`;

// Main Container
export const CommentsContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 20px;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 0 15px;
    margin: 30px auto 0;
  }
`;

export const CommentsSection = styled(Card)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(45, 80, 22, 0.1);
  border: none;
  overflow: hidden;
  
  .ant-card-head {
    background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
    border: none;
    padding: 30px 35px 20px;
    border-bottom: 2px solid rgba(45, 80, 22, 0.1);
    
    .ant-card-head-title {
      color: #2d5016;
      font-size: 1.8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 15px;
      
      &::before {
        content: '';
        width: 4px;
        height: 35px;
        background: linear-gradient(135deg, #ff8c00, #ffb347);
        border-radius: 2px;
      }
    }
  }
  
  .ant-card-body {
    padding: 35px;
  }
  
  @media (max-width: 768px) {
    .ant-card-head {
      padding: 25px 20px 15px;
      
      .ant-card-head-title {
        font-size: 1.5rem;
        
        &::before {
          height: 30px;
        }
      }
    }
    
    .ant-card-body {
      padding: 25px 20px;
    }
  }
`;

// Comment Stats
export const CommentStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 20px 25px;
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.05), rgba(74, 124, 89, 0.05));
  border-radius: 15px;
  border: 1px solid rgba(45, 80, 22, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 18px 20px;
  }
`;

export const StatsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2d5016;
  font-weight: 600;
  
  .anticon {
    color: #ff8c00;
    font-size: 1.2rem;
  }
`;

export const StatsNumber = styled.span`
  color: #ff8c00;
  font-size: 1.3rem;
  font-weight: 700;
`;

// Add Comment Form
export const AddCommentForm = styled.div`
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 35px;
  border: 2px solid rgba(45, 80, 22, 0.1);
  box-shadow: 0 5px 15px rgba(45, 80, 22, 0.05);
  
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

export const FormHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export const UserAvatar = styled(Avatar)`
  border: 2px solid #ff8c00 !important;
  box-shadow: 0 3px 10px rgba(255, 140, 0, 0.2) !important;
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.div`
  color: #2d5016;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const RatingInput = styled.div`
  margin: 15px 0;
  
  span {
    color: #666;
    margin-right: 10px;
    font-weight: 500;
  }
  
  .ant-rate {
    color: #ddd !important;
    font-size: 18px !important;
    
    .ant-rate-star {
      margin-right: 4px !important;
      transition: all 0.3s ease !important;
      
      &:hover {
        transform: scale(1.1) !important;
      }
      
      &.ant-rate-star-full {
        color: #ff8c00 !important;
      }
      
      &.ant-rate-star-half {
        .ant-rate-star-first {
          color: #ff8c00 !important;
        }
        .ant-rate-star-second {
          color: #ddd !important;
        }
      }
      
      &.ant-rate-star-zero {
        color: #ddd !important;
        
        &:hover {
          color: #ffb347 !important;
        }
      }
    }
    
    &:hover .ant-rate-star {
      &.ant-rate-star-zero {
        color: #ffb347 !important;
      }
    }
    
    &:focus {
      outline: none !important;
    }
  }
`;

export const TextAreaWrapper = styled.div`
  margin: 20px 0;
  
  .ant-input {
    border-radius: 12px !important;
    border: 2px solid rgba(45, 80, 22, 0.2) !important;
    font-size: 1rem !important;
    padding: 15px 18px !important;
    transition: all 0.3s ease !important;
    
    &:focus {
      border-color: rgba(45, 80, 22, 0.4) !important;
      box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1) !important;
    }
    
    &::placeholder {
      color: #999 !important;
    }
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #2d5016, #4a7c59) !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  height: 45px !important;
  padding: 0 30px !important;
  border-radius: 25px !important;
  box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3) !important;
  transition: all 0.3s ease !important;
  font-size: 1rem !important;
  
  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px rgba(45, 80, 22, 0.4) !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CancelButton = styled(Button)`
  background: white !important;
  border: 2px solid rgba(45, 80, 22, 0.2) !important;
  color: #2d5016 !important;
  font-weight: 600 !important;
  height: 45px !important;
  padding: 0 30px !important;
  border-radius: 25px !important;
  transition: all 0.3s ease !important;
  font-size: 1rem !important;
  
  &:hover {
    border-color: rgba(45, 80, 22, 0.4) !important;
    color: #2d5016 !important;
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Comments List
export const CommentsList = styled.div`
  margin-top: 25px;
`;

export const CommentItem = styled.div`
  padding: 25px 0;
  border-bottom: 1px solid rgba(45, 80, 22, 0.1);
  animation: ${slideInLeft} 0.5s ease-out ${props => props.index * 0.1}s both;
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  
  &:hover {
    background: rgba(45, 80, 22, 0.02);
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 12px;
    margin: 0 -10px;
  }
  
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
`;

export const CommentAvatar = styled(Avatar)`
  border: 2px solid rgba(255, 140, 0, 0.3) !important;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.1) !important;
  flex-shrink: 0;
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const CommentAuthor = styled.span`
  color: #2d5016;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const CommentRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CommentDate = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

export const CommentText = styled.p`
  color: #333;
  line-height: 1.7;
  margin: 15px 0;
  font-size: 1rem;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 15px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #2d5016;
    background: rgba(45, 80, 22, 0.08);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(45, 80, 22, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.liked {
    color: #ff8c00;
    background: rgba(255, 140, 0, 0.1);
    
    &:hover {
      color: #ff8c00;
      background: rgba(255, 140, 0, 0.15);
      box-shadow: 0 2px 8px rgba(255, 140, 0, 0.2);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid rgba(255, 140, 0, 0.3);
      border-radius: 12px;
      pointer-events: none;
    }
  }
  
  .anticon {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }
  
  &:hover .anticon {
    transform: scale(1.1);
  }
`;

export const LikeCount = styled.span`
  font-weight: 500;
  margin-left: 2px;
`;

// Reply Section
export const ReplySection = styled.div`
  margin-top: 20px;
  padding-left: 50px;
  border-left: 2px solid rgba(45, 80, 22, 0.1);
  
  @media (max-width: 768px) {
    padding-left: 30px;
  }
`;

export const Reply = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid rgba(45, 80, 22, 0.05);
  animation: ${bounceIn} 0.4s ease-out;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const ReplyAuthor = styled.span`
  color: #2d5016;
  font-weight: 600;
  font-size: 0.95rem;
`;

export const ReplyDate = styled.span`
  color: #999;
  font-size: 0.8rem;
`;

export const ReplyText = styled.p`
  color: #555;
  line-height: 1.6;
  margin: 8px 0 0 35px;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    margin-left: 25px;
  }
`;

// Empty State
export const EmptyComments = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: #666;
  
  .empty-icon {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #2d5016;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  
  p {
    color: #999;
    margin: 0;
  }
`;

// Pagination
export const LoadMoreButton = styled(Button)`
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 89, 0.1)) !important;
  border: 2px solid rgba(45, 80, 22, 0.2) !important;
  color: #2d5016 !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  border-radius: 15px !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.15), rgba(74, 124, 89, 0.15)) !important;
    border-color: rgba(45, 80, 22, 0.3) !important;
    color: #2d5016 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(45, 80, 22, 0.1);
  }
`;

// Responsive Wrapper
export const ResponsiveWrapper = styled.div`
  /* Global Rate component styles */
  .ant-rate {
    color: #ddd !important;
    
    .ant-rate-star {
      transition: all 0.2s ease !important;
      
      &.ant-rate-star-full {
        color: #ff8c00 !important;
      }
      
      &.ant-rate-star-half {
        .ant-rate-star-first {
          color: #ff8c00 !important;
        }
      }
      
      &:hover {
        color: #ffb347 !important;
        transform: scale(1.05) !important;
      }
    }
    
    &.ant-rate-disabled .ant-rate-star {
      &.ant-rate-star-full {
        color: #ff8c00 !important;
      }
      
      &:hover {
        transform: none !important;
      }
    }
  }

  @media (max-width: 768px) {
    ${CommentMeta} {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
    
    ${CommentActions} {
      gap: 15px;
      
      ${ActionButton} {
        font-size: 0.85rem;
      }
    }
    
    ${FormActions} {
      ${SubmitButton}, ${CancelButton} {
        height: 48px;
        font-size: 1rem;
      }
    }
  }
`;
