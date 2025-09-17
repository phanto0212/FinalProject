import styled, { keyframes } from 'styled-components';
import { Row, Col, Form, Input, Button, Checkbox, Progress } from 'antd';

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

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 140, 0, 0.4);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 140, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 140, 0, 0);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main Container
export const RegisterPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #e8f5e8 0%, #f0fff4 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="leaves" patternUnits="userSpaceOnUse" width="25" height="25"><path d="M12.5 5c-2.5 0-5 2.5-5 5s2.5 5 5 5 5-2.5 5-5-2.5-5-5-5z" fill="rgba(45, 80, 22, 0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23leaves)"/></svg>');
    pointer-events: none;
  }
`;

export const RegisterRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
  margin: 0;
`;

// Left Side - Hero Section (Opposite of Login)
export const HeroSection = styled(Col)`
  position: relative;
  background: linear-gradient(-45deg, #ff8c00, #ffb347, #2d5016, #4a7c59);
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    min-height: 35vh;
    order: 1;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 40px;
  animation: ${fadeInLeft} 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const HeroTitle = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 25px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #ffb347, #fff);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientShift} 3s ease infinite;
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  line-height: 1.7;
  opacity: 0.95;
  max-width: 450px;
  margin: 0 auto 30px;
`;

export const HeroBenefits = styled.div`
  text-align: left;
  max-width: 350px;
  margin: 0 auto;
  
  .benefit-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 1.1rem;
    animation: ${fadeInUp} 0.6s ease-out;
    
    &:nth-child(1) { animation-delay: 0.2s; }
    &:nth-child(2) { animation-delay: 0.4s; }
    &:nth-child(3) { animation-delay: 0.6s; }
    &:nth-child(4) { animation-delay: 0.8s; }
    
    .icon {
      font-size: 1.5rem;
      margin-right: 12px;
      animation: ${bounce} 2s infinite;
    }
  }
`;

export const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  
  .floating-icon {
    position: absolute;
    font-size: 2.5rem;
    opacity: 0.2;
    animation: ${float} 8s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 5%;
      left: 5%;
      animation-delay: -1s;
    }
    
    &:nth-child(2) {
      top: 15%;
      right: 10%;
      animation-delay: -2s;
    }
    
    &:nth-child(3) {
      top: 50%;
      left: 8%;
      animation-delay: -3s;
    }
    
    &:nth-child(4) {
      bottom: 25%;
      right: 15%;
      animation-delay: -4s;
    }
    
    &:nth-child(5) {
      bottom: 10%;
      left: 20%;
      animation-delay: -5s;
    }
    
    &:nth-child(6) {
      top: 35%;
      right: 5%;
      animation-delay: -6s;
    }
    
    &:nth-child(7) {
      bottom: 40%;
      left: 10%;
      animation-delay: -7s;
    }
  }
`;

// Right Side - Form Section
export const FormSection = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  
  @media (max-width: 768px) {
    padding: 18px;
    order: 2;
  }
  
  @media (max-width: 576px) {
    padding: 12px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 380px;
  animation: ${fadeInRight} 0.8s ease-out;
`;

export const RegisterTitle = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  color: #2d5016;
  text-align: center;
  margin-bottom: 6px;
  position: relative;
  
  &::before {
    content: '👥';
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    animation: ${float} 4s ease-in-out infinite;
  }
  
  @media (max-width: 576px) {
    &::before {
      left: -32px;
      font-size: 1.6rem;
    }
  }
`;

export const RegisterSubtitle = styled.p`
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  line-height: 1.5;
`;

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
  
  .ant-form-item-label > label {
    font-weight: 600;
    color: #2d5016;
    font-size: 0.95rem;
  }
  
  .ant-form-item-required {
    &::before {
      color: #ff8c00 !important;
    }
  }
`;

export const StyledInput = styled(Input)`
  height: 44px;
  border-radius: 10px;
  border: 2px solid #e8f5e8;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff8c00;
    box-shadow: 0 2px 8px rgba(255, 140, 0, 0.1);
  }
  
  &:focus {
    border-color: #ff8c00;
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const StyledPasswordInput = styled(Input.Password)`
  height: 44px;
  border-radius: 10px;
  border: 2px solid #e8f5e8;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  .ant-input {
    border: none;
    box-shadow: none;
  }
  
  &:hover {
    border-color: #ff8c00;
    box-shadow: 0 2px 8px rgba(255, 140, 0, 0.1);
  }
  
  &.ant-input-affix-wrapper-focused {
    border-color: #ff8c00;
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.2);
  }
  
  .ant-input::placeholder {
    color: #aaa;
  }
`;

export const PasswordStrengthContainer = styled.div`
  margin-top: 8px;
  animation: ${slideInUp} 0.3s ease-out;
`;

export const PasswordStrengthLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 0.85rem;
  
  .strength-text {
    color: ${props => 
      props.strength >= 80 ? '#52c41a' :
      props.strength >= 60 ? '#faad14' :
      props.strength >= 40 ? '#ff8c00' : '#ff4d4f'
    };
    font-weight: 600;
  }
`;

export const StyledProgress = styled(Progress)`
  .ant-progress-bg {
    background: ${props => 
      props.percent >= 80 ? 'linear-gradient(90deg, #52c41a, #73d13d)' :
      props.percent >= 60 ? 'linear-gradient(90deg, #faad14, #ffc53d)' :
      props.percent >= 40 ? 'linear-gradient(90deg, #ff8c00, #ffb347)' : 
      'linear-gradient(90deg, #ff4d4f, #ff7875)'
    };
    transition: all 0.3s ease;
  }
  
  .ant-progress-outer {
    padding-right: 0;
  }
`;

export const RegisterButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(45deg, #ff8c00, #ffb347);
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background: linear-gradient(45deg, #ffb347, #ff8c00);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 140, 0, 0.3);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    background: linear-gradient(45deg, #ff8c00, #ffb347);
  }
`;

export const TermsContainer = styled.div`
  margin: 16px 0;
`;

export const StyledCheckbox = styled(Checkbox)`
  color: #666;
  line-height: 1.4;
  font-size: 0.9rem;
  
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff8c00;
    border-color: #ff8c00;
  }
  
  &:hover .ant-checkbox-inner {
    border-color: #ff8c00;
  }
  
  a {
    color: #ff8c00;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      color: #ff6600;
      text-decoration: underline;
    }
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #ddd, transparent);
  }
  
  span {
    margin: 0 20px;
    color: #999;
    font-weight: 500;
    font-size: 0.95rem;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
`;

export const SocialButton = styled(Button)`
  flex: 1;
  height: 45px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &.google {
    background: #fff;
    border: 2px solid #e8f5e8;
    color: #333;
    
    &:hover {
      background: #f8f8f8;
      border-color: #4285f4;
      color: #4285f4;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
    }
  }
  
  &.facebook {
    background: #fff;
    border: 2px solid #e8f5e8;
    color: #333;
    
    &:hover {
      background: #f8f8f8;
      border-color: #1877f2;
      color: #1877f2;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(24, 119, 242, 0.2);
    }
  }
`;

export const LoginPrompt = styled.div`
  text-align: center;
  color: #666;
  
  a {
    color: #ff8c00;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ff6600;
      text-decoration: underline;
    }
  }
`;

// Loading Spinner
export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Success Message
export const SuccessMessage = styled.div`
  background: #f0f9ff;
  border: 1px solid #91d5ff;
  color: #1890ff;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '✅';
    font-size: 1.2rem;
  }
`;

// Error Message
export const ErrorMessage = styled.div`
  background: #ffe6e6;
  border: 1px solid #ffb3b3;
  color: #d63031;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '⚠️';
    font-size: 1.2rem;
  }
`;
