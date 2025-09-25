import styled, { keyframes } from 'styled-components';
import { Card, Button, Avatar, Upload, Form, Tabs } from 'antd';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Main Container
export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Header Section
export const ProfileHeader = styled(Card)`
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
  border: none;
  border-radius: 25px;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 35px rgba(45, 80, 22, 0.2);
  animation: ${slideInLeft} 0.6s ease-out 0.2s both;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    animation: ${shimmer} 3s infinite;
  }
  
  .ant-card-body {
    padding: 40px;
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 30px 25px;
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

export const AvatarSection = styled.div`
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
`;

export const ProfileAvatar = styled(Avatar)`
  width: 120px !important;
  height: 120px !important;
  border: 4px solid rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
  
  @media (max-width: 768px) {
    width: 100px !important;
    height: 100px !important;
  }
`;

export const AvatarUpload = styled(Upload)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  
  .ant-upload {
    width: 35px !important;
    height: 35px !important;
    background: linear-gradient(135deg, #ff8c00, #ffb347) !important;
    border-radius: 50% !important;
    border: 2px solid white !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    transition: all 0.3s ease !important;
    
    &:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 4px 15px rgba(255, 140, 0, 0.4) !important;
    }
    
    .anticon {
      color: white !important;
      font-size: 14px !important;
    }
  }
`;

export const UserInfo = styled.div`
  flex: 1;
`;

export const UserName = styled.h1`
  margin: 0 0 10px 0;
  font-size: 2.2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const UserBio = styled.p`
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const UserStats = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 25px;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.8rem;
    font-weight: 700;
    display: block;
    color: #ff8c00;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 2px;
  }
`;

// Content Layout
export const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

export const Sidebar = styled.div`
  animation: ${slideInLeft} 0.6s ease-out 0.4s both;
  
  @media (max-width: 1024px) {
    order: 2;
  }
`;

export const MainContent = styled.div`
  animation: ${slideInRight} 0.6s ease-out 0.3s both;
`;

// Profile Tabs
export const ProfileTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 25px;
    
    &::before {
      border-bottom: 2px solid rgba(45, 80, 22, 0.1) !important;
    }
  }
  
  .ant-tabs-tab {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    color: #666 !important;
    padding: 12px 20px !important;
    
    &:hover {
      color: #2d5016 !important;
    }
    
    &.ant-tabs-tab-active {
      .ant-tabs-tab-btn {
        color: #2d5016 !important;
      }
    }
  }
  
  .ant-tabs-ink-bar {
    background: linear-gradient(135deg, #2d5016, #4a7c59) !important;
    height: 3px !important;
  }
  
  .ant-tabs-content-holder {
    background: white;
    border-radius: 20px;
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.1);
    padding: 30px;
    
    @media (max-width: 768px) {
      padding: 25px 20px;
    }
  }
`;

// Sidebar Cards
export const SidebarCard = styled(Card)`
  background: white;
  border-radius: 20px;
  border: none;
  box-shadow: 0 8px 25px rgba(45, 80, 22, 0.1);
  margin-bottom: 25px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(45, 80, 22, 0.15);
  }
  
  .ant-card-head {
    background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
    border: none;
    border-radius: 20px 20px 0 0;
    
    .ant-card-head-title {
      color: #2d5016;
      font-weight: 700;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 10px;
      
      .anticon {
        color: #ff8c00;
        font-size: 1.3rem;
      }
    }
  }
  
  .ant-card-body {
    padding: 25px;
  }
`;

// Achievement Cards
export const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.05), rgba(74, 124, 89, 0.05));
  margin-bottom: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 89, 0.1));
    transform: translateX(5px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const AchievementIcon = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #ff8c00, #ffb347);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
`;

export const AchievementInfo = styled.div`
  flex: 1;
  
  .title {
    font-weight: 600;
    color: #2d5016;
    margin-bottom: 2px;
  }
  
  .description {
    color: #666;
    font-size: 0.9rem;
  }
`;

// Recipes Grid
export const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const RecipeCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(45, 80, 22, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(45, 80, 22, 0.15);
  }
  
  .ant-card-cover {
    height: 180px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .ant-card-body {
    padding: 20px;
  }
`;

export const RecipeTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #2d5016;
  font-weight: 600;
  font-size: 1.1rem;
`;

export const RecipeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

export const RecipeStats = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #999;
  font-size: 0.85rem;
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 4px;
    
    .anticon {
      color: #ff8c00;
    }
  }
`;

// Form Styles
export const ProfileForm = styled(Form)`
  .ant-form-item-label > label {
    color: #2d5016;
    font-weight: 600;
  }
  
  .ant-input,
  .ant-input-password,
  .ant-picker,
  .ant-select-selector {
    border-radius: 10px !important;
    border: 2px solid rgba(45, 80, 22, 0.2) !important;
    padding: 12px 15px !important;
    font-size: 1rem !important;
    transition: all 0.3s ease !important;
    
    &:focus,
    &:hover {
      border-color: rgba(45, 80, 22, 0.4) !important;
      box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1) !important;
    }
  }
  
  .ant-btn {
    height: auto;
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &.ant-btn-primary {
      background: linear-gradient(135deg, #2d5016, #4a7c59);
      border: none;
      box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(45, 80, 22, 0.4);
      }
    }
    
    &:not(.ant-btn-primary) {
      border: 2px solid rgba(45, 80, 22, 0.2);
      color: #2d5016;
      
      &:hover {
        border-color: rgba(45, 80, 22, 0.4);
        color: #2d5016;
      }
    }
  }
`;

// Action Buttons
export const ActionButton = styled(Button)`
  background: ${props => props.primary ? 
    'linear-gradient(135deg, #2d5016, #4a7c59)' : 
    'linear-gradient(135deg, #ff8c00, #ffb347)'
  } !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  height: 45px !important;
  padding: 0 25px !important;
  border-radius: 25px !important;
  box-shadow: 0 4px 15px ${props => props.primary ? 
    'rgba(45, 80, 22, 0.3)' : 
    'rgba(255, 140, 0, 0.3)'
  } !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 20px ${props => props.primary ? 
      'rgba(45, 80, 22, 0.4)' : 
      'rgba(255, 140, 0, 0.4)'
    } !important;
  }
  
  &:active {
    transform: translateY(0) !important;
  }
`;

// Settings Section
export const SettingsSection = styled.div`
  margin-bottom: 30px;
  
  .section-title {
    color: #2d5016;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    &::before {
      content: '';
      width: 4px;
      height: 25px;
      background: linear-gradient(135deg, #ff8c00, #ffb347);
      border-radius: 2px;
    }
  }
`;

// Loading States
export const LoadingSkeleton = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #e0e0e0 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 8px;
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  margin-bottom: 10px;
`;

// Empty States
export const EmptyState = styled.div`
  text-align: center;
  padding: 50px 20px;
  color: #999;
  
  .empty-icon {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 20px;
  }
  
  h4 {
    color: #2d5016;
    margin-bottom: 10px;
    font-size: 1.3rem;
  }
  
  p {
    margin: 0;
    line-height: 1.6;
  }
`;

// Responsive Wrapper
export const ResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    ${UserStats} {
      flex-wrap: wrap;
      justify-content: center;
    }
    
    ${RecipesGrid} {
      grid-template-columns: 1fr;
    }
    
    ${ContentLayout} {
      grid-template-columns: 1fr;
    }
    
    ${ProfileForm} {
      .ant-col {
        margin-bottom: 15px;
      }
    }
  }
`;
