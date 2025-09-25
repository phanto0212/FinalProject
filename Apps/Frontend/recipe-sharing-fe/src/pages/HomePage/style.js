import styled, { keyframes } from 'styled-components';
import { Row, Col } from 'antd';

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

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounceIn = keyframes`
  0%, 20%, 40%, 60%, 80% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
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

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Main Container
export const HomePageContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed header */
  overflow-x: hidden;
`;

// Hero Section
export const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  background: linear-gradient(-45deg, #2d5016, #4a7c59, #ff8c00, #ffb347);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  &::after {
    content: '🍳🥗🍅🌿🧄🥕';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 120px;
    opacity: 0.1;
    z-index: 1;
    letter-spacing: 20px;
    animation: ${float} 6s ease-in-out infinite;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  color: white;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #fff, #ffb347, #fff);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeInDown} 1s ease-out, ${gradientShift} 3s ease infinite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 40px;
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out 0.3s forwards;
  line-height: 1.6;
`;

export const CTAButton = styled.button`
  background: linear-gradient(45deg, #ff8c00, #ffb347);
  border: none;
  padding: 18px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: ${bounceIn} 1s ease-out 0.6s forwards;
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 140, 0, 0.4);
    animation: ${pulse} 2s ease infinite;
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #2d5016, #ff8c00);
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #2d5016;
  margin-bottom: 20px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ff8c00, #2d5016);
    border-radius: 2px;
  }
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 80px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

export const FeatureGrid = styled(Row)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const FeatureCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #ff8c00, #2d5016);
    transition: left 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    &::before {
      left: 0;
    }
  }
`;

export const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 25px;
  animation: ${float} 3s ease-in-out infinite;
  
  ${FeatureCard}:hover & {
    animation: ${pulse} 1s ease infinite;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d5016;
  margin-bottom: 15px;
`;

export const FeatureDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
`;

// Popular Recipes Section
export const PopularSection = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
  color: white;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  }
`;

export const RecipeGrid = styled(Row)`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

export const RecipeCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }
`;

export const RecipeImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, #ff8c00, #ffb347);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '🍽️';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    opacity: 0.7;
  }
`;

export const RecipeContent = styled.div`
  padding: 25px;
`;

export const RecipeTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d5016;
  margin-bottom: 10px;
`;

export const RecipeDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

export const RecipeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9rem;
`;

// Stats Section
export const StatsSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #fff 0%, #f8fffe 100%);
`;

export const StatsGrid = styled(Row)`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StatNumber = styled.div`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #ff8c00;
  margin-bottom: 10px;
  position: relative;
  
  &::after {
    content: '+';
    position: absolute;
    top: 0;
    right: -15px;
    font-size: 0.8em;
    opacity: 0.7;
  }
`;

export const StatLabel = styled.p`
  font-size: 1.2rem;
  color: #2d5016;
  font-weight: 600;
  margin: 0;
`;

// Responsive styles
export const ResponsiveCol = styled(Col)`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;
