import styled, { keyframes } from 'styled-components';
import { Avatar, Tag, Button } from 'antd';

// Animations
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// Main Card Container
export const CardContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 0 30px 0;
  animation: ${slideUp} 0.6s ease-out;
`;

export const CardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 8px 32px rgba(45, 80, 22, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  min-height: 280px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 40px rgba(45, 80, 22, 0.15),
      0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: rgba(45, 80, 22, 0.3);
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #2d5016, #ff8c00, #2d5016);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

// Image Section
export const ImageSection = styled.div`
  position: relative;
  width: 320px;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  gap: 10px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${CardWrapper}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SaveButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isSaved 
    ? 'linear-gradient(135deg, #ff6b6b, #ff8e53)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$isSaved ? 'white' : '#666'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ShareButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, #2d5016, #3d6b1f);
    color: white;
    box-shadow: 0 6px 20px rgba(45, 80, 22, 0.3);
  }
`;

// Content Section
export const ContentSection = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 14px;
  }
`;

export const Header = styled.div`
  margin-bottom: 4px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #2d5016;
  margin: 0 0 8px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const CategoryTag = styled(Tag)`
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  background: ${props => 
    props.color === 'green' 
      ? 'linear-gradient(135deg, #2d5016, #3d6b1f)'
      : 'linear-gradient(135deg, #ff8c00, #ff6b35)'
  };
  color: white;
  margin: 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const MetaSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MetaIcon = styled.div`
  color: #ff8c00;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const MetaText = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;

export const ChefSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(45, 80, 22, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(45, 80, 22, 0.1);
`;

export const ChefAvatar = styled(Avatar)`
  border: 2px solid rgba(45, 80, 22, 0.2);
`;

export const ChefInfo = styled.div`
  flex: 1;
`;

export const ChefName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #2d5016;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ChefBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #00c851, #00a085);
  color: white;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
`;

export const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

export const RatingStars = styled.div`
  .ant-rate-star {
    margin-right: 2px;
  }
`;

export const RatingCount = styled.span`
  font-size: 13px;
  color: #666;
  font-weight: 500;
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
`;

export const ViewButton = styled(Button)`
  flex: 1;
  height: 44px;
  border-radius: 12px;
  border: 2px solid #2d5016;
  background: linear-gradient(135deg, #2d5016, #3d6b1f);
  color: white;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.3);
    border-color: #3d6b1f;
    background: linear-gradient(135deg, #3d6b1f, #2d5016);
    color: white;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CommentButton = styled(Button)`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid rgba(45, 80, 22, 0.2);
  background: rgba(45, 80, 22, 0.05);
  color: #2d5016;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2d5016;
    background: rgba(45, 80, 22, 0.1);
    color: #2d5016;
    transform: translateY(-2px);
  }
`;

export const StatsSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0 0 0;
  border-top: 1px solid rgba(45, 80, 22, 0.1);
`;

export const StatItem = styled.div`
  text-align: center;
  flex: 1;
  
  .number {
    font-size: 16px;
    font-weight: 700;
    color: #2d5016;
    display: block;
  }
  
  .label {
    font-size: 12px;
    color: #666;
    margin-top: 2px;
  }
`;