import styled from 'styled-components';
import { Card } from 'antd';

// Main Container
export const ProfileContainer = styled.div`
  min-height: 100vh;
  background: #f5f7fa;
  padding-top: 80px;
`;

// Profile Header
export const ProfileHeader = styled.div`
  position: relative;
  background: white;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const ProfileInfo = styled.div`
  position: relative;
  padding: 20px 40px 40px;
  display: flex;
  align-items: flex-start;
  gap: 30px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const UserAvatar = styled.div`
  position: relative;
  margin-top: -60px;
  
  .ant-avatar {
    border: 4px solid white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 1024px) {
    margin-top: -40px;
  }
`;

export const UserDetails = styled.div`
  flex: 1;
  margin-top: -20px;
  
  @media (max-width: 1024px) {
    margin-top: 0;
  }
`;

export const UserName = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    justify-content: center;
  }
`;

export const UserTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 15px 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const UserStats = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    gap: 20px;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  
  .ant-statistic-title {
    color: #6b7280;
    font-size: 14px;
    font-weight: 500;
  }
  
  .ant-statistic-content {
    color: #1f2937;
    font-size: 24px;
    font-weight: 700;
  }
  
  @media (max-width: 480px) {
    .ant-statistic-content {
      font-size: 20px;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-top: -10px;
  
  .ant-btn {
    border-radius: 12px;
    font-weight: 600;
    height: 44px;
    padding: 0 24px;
    
    &.ant-btn-primary {
      background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
      border: none;
    }
  }
  
  @media (max-width: 1024px) {
    margin-top: 20px;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    
    .ant-btn {
      width: 100%;
    }
  }
`;

// Tabs Section
export const ProfileTabs = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  .ant-tabs {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    
    .ant-tabs-nav {
      margin: 0;
      background: #f8fafc;
      
      .ant-tabs-tab {
        padding: 20px 30px;
        font-size: 16px;
        font-weight: 600;
        color: #6b7280;
        
        &.ant-tabs-tab-active {
          color: #2d5016;
          
          .ant-tabs-tab-btn {
            color: #2d5016;
          }
        }
      }
      
      .ant-tabs-ink-bar {
        background: #2d5016;
        height: 3px;
      }
    }
    
    .ant-tabs-content-holder {
      padding: 0;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0 15px;
    
    .ant-tabs-tab {
      padding: 15px 20px !important;
      font-size: 14px !important;
    }
  }
`;

export const TabContent = styled.div`
  padding: 30px;
  min-height: 400px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Recipe Grid
export const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const RecipeCard = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  .ant-card-body {
    padding: 0;
  }
  
  .recipe-content {
    padding: 20px;
  }
  
  .recipe-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f1f5f9;
    
    .ant-btn {
      border: none;
      box-shadow: none;
      color: #6b7280;
      
      &:hover {
        color: #2d5016;
        background: #f0f9ff;
      }
    }
  }
`;

export const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const RecipeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #2d5016;
  }
`;

export const RecipeAuthor = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    color: #9ca3af;
  }
`;

export const RecipeStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6b7280;
  
  span {
    display: flex;
    align-items: center;
    gap: 4px;
    
    svg {
      color: #9ca3af;
      font-size: 12px;
    }
  }
`;

// About Section
export const AboutSection = styled.div`
  h3 {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 16px;
    line-height: 1.7;
    color: #374151;
    margin-bottom: 30px;
  }
`;

export const AchievementSection = styled.div`
  h4 {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
  }
  
  .achievement-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
`;

export const AchievementBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${props => props.color}20;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  svg {
    font-size: 28px;
    color: ${props => props.color};
  }
  
  .title {
    font-weight: 600;
    color: #1f2937;
    font-size: 16px;
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 14px;
    color: #6b7280;
  }
`;

export const InfoCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f3f4;
  
  h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
  
  svg {
    color: #6b7280;
    font-size: 16px;
    width: 20px;
  }
  
  span {
    color: #374151;
    font-size: 15px;
  }
`;

// Followers Section
export const FollowersSection = styled.div`
  display: grid;
  gap: 16px;
`;

export const FollowerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #f1f3f4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }
  
  .follower-info {
    flex: 1;
    
    .name {
      font-weight: 600;
      color: #1f2937;
      font-size: 16px;
      margin-bottom: 4px;
      cursor: pointer;
      transition: color 0.2s ease;
      
      &:hover {
        color: #2d5016;
      }
    }
    
    .recipes {
      font-size: 14px;
      color: #6b7280;
    }
  }
  
  .ant-btn {
    border-radius: 8px;
    font-weight: 600;
    
    &.ant-btn-primary {
      background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
      border: none;
    }
  }
`;

// Responsive Design
export const ResponsiveGrid = styled.div`
  @media (max-width: 1024px) {
    ${RecipeGrid} {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    ${AchievementSection} {
      .achievement-grid {
        grid-template-columns: 1fr;
      }
    }
  }
  
  @media (max-width: 768px) {
    ${ProfileHeader} {
      margin-bottom: 20px;
    }
    
    ${ProfileTabs} {
      margin: 0 10px;
    }
    
    ${RecipeCard} {
      .recipe-content {
        padding: 15px;
      }
    }
  }
`;
