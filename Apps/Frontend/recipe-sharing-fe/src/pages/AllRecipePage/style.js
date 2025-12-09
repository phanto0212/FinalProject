import styled from 'styled-components';
import { Button, Modal } from 'antd';

// Main Container
export const SocialContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 20px;
`;

// Main Content
export const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 25px;
  padding: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 280px 1fr;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 15px;
  }
`;

// Left Sidebar
export const LeftSidebar = styled.aside`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: #2d5016;
    font-size: 18px;
  }
`;

// Suggested Friends Section
export const SuggestedFriendsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f3f4;
  min-height: 500px;
`;

export const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  
  &:hover {
    background: #f8fafc;
    transform: translateX(5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .ant-avatar {
    flex-shrink: 0;
    width: 50px !important;
    height: 50px !important;
    min-width: 50px;
    min-height: 50px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

// Feed Area
export const FeedArea = styled.div`
  min-height: 600px;
`;

export const CreatePostButton = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f3f4;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  
  .ant-avatar {
    flex-shrink: 0;
    width: 40px !important;
    height: 40px !important;
    min-width: 40px;
    min-height: 40px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  
  span {
    flex: 1;
    color: #9ca3af;
    font-size: 15px;
    padding: 12px 16px;
    background: #f9fafb;
    border-radius: 25px;
    border: 1px solid #e5e7eb;
  }
  
  > div {
    display: flex;
    gap: 8px;
    
    button {
      border-radius: 8px;
      border: none;
      background: #f3f4f6;
      color: #6b7280;
      font-size: 12px;
      height: 32px;
      padding: 0 12px;
      
      &:hover {
        background: #2d5016;
        color: white;
      }
    }
  }
`;

export const TabContent = styled.div`
  opacity: 1;
`;

// Feed Post
export const FeedPost = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f3f4;
  margin-bottom: 20px;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
`;

export const PostUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .ant-avatar {
    flex-shrink: 0;
    width: 45px !important;
    height: 45px !important;
    min-width: 45px;
    min-height: 45px;
    transition: transform 0.2s ease;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  > div:last-child {
    > div:first-child {
      font-weight: 600;
      color: #1f2937;
      font-size: 15px;
      display: flex;
      align-items: center;
      transition: color 0.2s ease;
      
      &:hover {
        color: #2d5016;
        text-decoration: underline;
      }
    }
  }
`;

export const PostTime = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
`;

export const PostOptions = styled.div`
  color: #9ca3af;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #6b7280;
  }
`;

export const PostContent = styled.div`
  padding: 0 20px 16px;
`;

export const PostDescription = styled.p`
  color: #374151;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 16px 0;
`;

export const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 16px;
`;

export const PostStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #f1f3f4;
  font-size: 13px;
  color: #6b7280;
  
  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #f1f3f4;
`;

export const PostAction = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  
  &:hover {
    background: #f9fafb;
    color: #2d5016;
    
    svg {
      transform: scale(1.1);
    }
  }
  
  &:active {
    transform: scale(0.95);
    background: #f3f4f6;
  }
  
  &:first-child:hover {
    color: #ef4444;
  }
  
  &:nth-child(2):hover {
    color: #3b82f6;
  }
  
  &:nth-child(3):hover {
    color: #10b981;
  }
  
  &:last-child:hover {
    color: #f59e0b;
  }
  
  svg {
    font-size: 16px;
    transition: all 0.2s ease;
  }
`;

// Right Sidebar
export const RightSidebar = styled.aside`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const FeaturedChefs = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f3f4;
`;

export const ChefCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-radius: 12px;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  
  &:hover {
    background: #f8fafc;
    transform: translateX(5px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ChefAvatar = styled.div`
  position: relative;
  
  .ant-badge {
    position: absolute;
    top: -2px;
    right: -2px;
  }
`;

export const ChefInfo = styled.div`
  flex: 1;
`;

export const ChefName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
`;

export const ChefFollowers = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
`;

export const FollowButton = styled(Button)`
  border-radius: 16px;
  font-weight: 600;
  background: #2d5016;
  border-color: #2d5016;
  color: white;
  font-size: 12px;
  height: 32px;
  padding: 0 16px;
  
  &:hover {
    background: #4a7c59;
    border-color: #4a7c59;
    transform: scale(1.05);
  }
`;

// Challenge Cards
export const ChallengeCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  > div {
    padding: 20px;
  }
`;

export const ChallengeTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 12px 0;
`;

export const ChallengeParticipants = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
  
  svg {
    color: #2d5016;
  }
`;

export const ChallengeDate = styled.div`
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
`;

// Tabs Styling
export const TabsWrapper = styled.div`
  .ant-tabs {
    .ant-tabs-nav {
      background: white;
      border-radius: 16px;
      padding: 4px;
      margin-bottom: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      
      &:before {
        border: none;
      }
      
      .ant-tabs-nav-wrap {
      display: none;
        .ant-tabs-nav-list {
          .ant-tabs-tab {
            border: none;
            background: transparent;
            border-radius: 12px;
            font-weight: 600;
            color: #6b7280;
            transition: all 0.3s ease;
            
            &.ant-tabs-tab-active {
              background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
              color: white;
              
              .ant-tabs-tab-btn {
                color: white;
              }
            }
            
            &:hover {
              color: #2d5016;
            }
          }
        }
      }
      
      .ant-tabs-ink-bar {
        display: none;
      }
    }
  }
`;

// Create Post Modal Components
export const CreatePostModal = styled(Modal)`
  .ant-modal-header {
    border-radius: 16px 16px 0 0;
    
    .ant-modal-title {
      font-weight: 700;
      font-size: 18px;
    }
  }
  
  .ant-modal-content {
    border-radius: 16px;
    overflow: hidden;
  }
  
  .ant-modal-body {
    max-height: 70vh;
    overflow-y: auto;
    padding: 24px;
  }
`;

export const PostForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RecipeFormSection = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  
  h3 {
    color: #1f2937;
    font-weight: 700;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:before {
      content: '';
      width: 4px;
      height: 20px;
      background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
      border-radius: 2px;
    }
  }
`;

export const ImageUploadArea = styled.div`
  .image-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
    margin-top: 16px;
    
    .preview-item {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 1;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .remove-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        background: rgba(239, 68, 68, 0.9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 12px;
        
        &:hover {
          background: #ef4444;
        }
      }
    }
  }
`;

export const IngredientList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .ant-input {
    flex: 1;
  }
  
  .ant-btn {
    flex-shrink: 0;
  }
`;

export const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  .step-number {
    background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    flex-shrink: 0;
    margin-top: 4px;
  }
  
  .ant-input {
    flex: 1;
  }
  
  .ant-btn {
    flex-shrink: 0;
    margin-top: 4px;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  
  .ant-btn-primary {
    background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, #4a7c59 0%, #2d5016 100%);
    }
  }
`;
