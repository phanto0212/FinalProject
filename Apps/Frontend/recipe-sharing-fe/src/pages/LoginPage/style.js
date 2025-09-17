import styled, { keyframes } from 'styled-components';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';

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
    transform: translateY(-10px);
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

// Main Container
export const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="rgba(45, 80, 22, 0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
    pointer-events: none;
  }
`;

export const LoginRow = styled(Row)`
  width: 100%;
  min-height: 100vh;
  margin: 0;
`;

// Left Side - Form Section
export const FormSection = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 20px;
    order: 2;
  }
  
  @media (max-width: 576px) {
    padding: 15px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  animation: ${fadeInLeft} 0.8s ease-out;
`;

export const LoginTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #2d5016;
  text-align: center;
  margin-bottom: 10px;
  position: relative;
  
  &::before {
    content: '🍳';
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    animation: ${float} 3s ease-in-out infinite;
  }
  
  @media (max-width: 576px) {
    &::before {
      left: -30px;
      font-size: 1.5rem;
    }
  }
`;

export const LoginSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.5;
`;

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 24px;
  }
  
  .ant-form-item-label > label {
    font-weight: 600;
    color: #2d5016;
    font-size: 1rem;
  }
`;

export const StyledInput = styled(Input)`
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e8f5e8;
  font-size: 1rem;
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
    color: #999;
  }
`;

export const StyledPasswordInput = styled(Input.Password)`
  height: 50px;
  border-radius: 10px;
  border: 2px solid #e8f5e8;
  font-size: 1rem;
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
    color: #999;
  }
`;

export const LoginButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(45deg, #2d5016, #4a7c59);
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    background: linear-gradient(45deg, #4a7c59, #2d5016);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.3);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:focus {
    background: linear-gradient(45deg, #2d5016, #4a7c59);
  }
`;

export const RememberForgotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  color: #666;
  
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #ff8c00;
    border-color: #ff8c00;
  }
  
  &:hover .ant-checkbox-inner {
    border-color: #ff8c00;
  }
`;

export const ForgotLink = styled.a`
  color: #ff8c00;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: #ff6600;
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  
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
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

export const SocialButton = styled(Button)`
  flex: 1;
  height: 45px;
  border-radius: 8px;
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

export const SignUpPrompt = styled.div`
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

// Right Side - Hero Section
export const HeroSection = styled(Col)`
  position: relative;
  background: linear-gradient(-45deg, #2d5016, #4a7c59, #ff8c00, #ffb347);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
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
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    min-height: 40vh;
    order: 1;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 40px;
  animation: ${fadeInRight} 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const HeroTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  line-height: 1.6;
  opacity: 0.9;
  max-width: 400px;
  margin: 0 auto;
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
    font-size: 2rem;
    opacity: 0.3;
    animation: ${float} 6s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 10%;
      left: 10%;
      animation-delay: -1s;
    }
    
    &:nth-child(2) {
      top: 20%;
      right: 15%;
      animation-delay: -2s;
    }
    
    &:nth-child(3) {
      top: 60%;
      left: 20%;
      animation-delay: -3s;
    }
    
    &:nth-child(4) {
      bottom: 20%;
      right: 20%;
      animation-delay: -4s;
    }
    
    &:nth-child(5) {
      bottom: 30%;
      left: 15%;
      animation-delay: -5s;
    }
    
    &:nth-child(6) {
      top: 40%;
      right: 10%;
      animation-delay: -6s;
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
