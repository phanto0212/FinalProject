import styled, { keyframes } from 'styled-components';
import { Button, Rate, Tag, Card, Avatar } from 'antd';

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
    transform: scale(1.05);
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

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main Container
export const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  animation: ${fadeInUp} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Header Section
export const HeaderSection = styled.div`
  position: relative;
  margin-bottom: 40px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(45, 80, 22, 0.15);
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
`;

export const HeroImage = styled.div`
  position: relative;
  height: 400px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #2d5016, #4a7c59)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px;
  color: white;
  width: 100%;
  animation: ${slideInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

export const RecipeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const RecipeSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 20px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 500;
  
  .anticon {
    font-size: 1.2rem;
    color: #ff8c00;
  }
`;

// Content Section
export const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  margin-bottom: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

export const MainContent = styled.div`
  animation: ${slideInLeft} 0.6s ease-out 0.3s both;
`;

export const Sidebar = styled.div`
  animation: ${slideInRight} 0.6s ease-out 0.4s both;
  
  @media (max-width: 1024px) {
    order: -1;
  }
`;

// Ingredients Card
export const IngredientsCard = styled(Card)`
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(45, 80, 22, 0.1);
  border: none;
  margin-bottom: 25px;
  overflow: hidden;
  
  .ant-card-head {
    background: linear-gradient(135deg, #2d5016, #4a7c59);
    border: none;
    padding: 20px 25px;
    
    .ant-card-head-title {
      color: white;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }
  
  .ant-card-body {
    padding: 25px;
  }
`;

export const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  animation: ${bounceIn} 0.5s ease-out ${props => props.index * 0.1}s both;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(45, 80, 22, 0.05);
    padding-left: 10px;
    border-radius: 8px;
  }
`;

export const IngredientIcon = styled.div`
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #ff8c00, #ffb347);
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;
`;

export const IngredientText = styled.span`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
`;

// Instructions Section
export const InstructionsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 25px rgba(45, 80, 22, 0.1);
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d5016;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &::before {
    content: '';
    width: 4px;
    height: 30px;
    background: linear-gradient(135deg, #ff8c00, #ffb347);
    border-radius: 2px;
  }
`;

export const StepsList = styled.ol`
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
`;

export const StepItem = styled.li`
  position: relative;
  padding: 20px 0 20px 60px;
  border-left: 2px solid #e8f5e8;
  margin-bottom: 20px;
  counter-increment: step-counter;
  animation: ${fadeInUp} 0.5s ease-out ${props => props.index * 0.2}s both;
  
  &:last-child {
    border-left: 2px solid transparent;
  }
  
  &::before {
    content: counter(step-counter);
    position: absolute;
    left: -20px;
    top: 15px;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #2d5016, #4a7c59);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
  }
`;

export const StepContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
`;

// Nutrition Card
export const NutritionCard = styled(Card)`
  background: linear-gradient(135deg, #ff8c00, #ffb347);
  border-radius: 15px;
  border: none;
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.2);
  color: white;
  margin-bottom: 25px;
  
  .ant-card-head {
    border: none;
    background: rgba(255, 255, 255, 0.1);
    
    .ant-card-head-title {
      color: white;
      font-size: 1.3rem;
      font-weight: 600;
    }
  }
  
  .ant-card-body {
    padding: 25px;
  }
`;

export const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const NutritionItem = styled.div`
  text-align: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

export const NutritionValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const NutritionLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

// Rating & Actions
export const RatingSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(45, 80, 22, 0.1);
  margin-bottom: 25px;
  text-align: center;
`;

export const RatingDisplay = styled.div`
  margin-bottom: 20px;
`;

export const RatingValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff8c00;
  margin-bottom: 10px;
`;

export const RatingCount = styled.div`
  color: #666;
  margin-bottom: 15px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

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

// Chef Info
export const ChefSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(45, 80, 22, 0.1);
  margin-bottom: 25px;
`;

export const ChefInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
`;

export const ChefAvatar = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
  border: 3px solid #ff8c00 !important;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2) !important;
`;

export const ChefDetails = styled.div`
  flex: 1;
`;

export const ChefName = styled.h4`
  margin: 0 0 5px 0;
  color: #2d5016;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const ChefTitle = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

export const ChefBio = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
`;

// Tags Section
export const TagsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export const RecipeTag = styled(Tag)`
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(74, 124, 89, 0.1)) !important;
  border: 1px solid rgba(45, 80, 22, 0.2) !important;
  color: #2d5016 !important;
  padding: 5px 12px !important;
  border-radius: 20px !important;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: linear-gradient(135deg, rgba(45, 80, 22, 0.2), rgba(74, 124, 89, 0.2)) !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(45, 80, 22, 0.2);
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

// Responsive adjustments
export const ResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    ${MetaInfo} {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    ${ContentSection} {
      gap: 25px;
    }
    
    ${ActionButtons} {
      flex-direction: column;
      
      ${ActionButton} {
        width: 100%;
      }
    }
    
    ${StepItem} {
      padding-left: 50px;
      
      &::before {
        width: 35px;
        height: 35px;
        left: -17px;
        font-size: 1rem;
      }
    }
  }
`;
