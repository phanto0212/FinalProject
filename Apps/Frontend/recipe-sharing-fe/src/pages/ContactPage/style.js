import styled, { keyframes } from 'styled-components';
import { Form, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

export const ContactContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 120px 20px 80px;
  overflow: hidden;
`;

export const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 20%,
      rgba(45, 80, 22, 0.05) 0%,
      transparent 50%
    );
    animation: ${float} 20s ease-in-out infinite;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 70% 80%,
      rgba(255, 140, 0, 0.05) 0%,
      transparent 50%
    );
    animation: ${float} 25s ease-in-out infinite reverse;
  }
`;

export const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 2;
`;

export const ContactTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  letter-spacing: -1px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ContactSubtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const ContactFeatureSection = styled.div`
  margin-bottom: 80px;
  animation: ${slideUp} 1s ease-out 0.2s both;
  position: relative;
  z-index: 2;
`;

export const FeatureCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.4) 50%, 
      transparent 100%
    );
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    
    &:before {
      left: 100%;
    }
  }
`;

export const FeatureIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: #2d5016;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(255, 140, 0, 0.1));
  border-radius: 50%;
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: #ff8c00;
    transform: scale(1.1);
    animation: ${pulse} 0.6s ease;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 15px;
`;

export const FeatureDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

export const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: ${slideUp} 1s ease-out 0.4s both;
  position: relative;
  z-index: 2;
`;

export const ContactFormSection = styled.div`
  height: 100%;
`;

export const ContactFormWrapper = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2d5016 0%, #ff8c00 50%, #2d5016 100%);
    background-size: 200% 100%;
    animation: ${shimmer} 3s ease-in-out infinite;
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
  }
`;

export const ContactFormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 30px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #2d5016, #ff8c00);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

export const StyledForm = styled(Form)`
  .ant-form-item-label > label {
    font-weight: 600;
    color: #374151;
    font-size: 15px;
  }
  
  .ant-form-item {
    margin-bottom: 24px;
  }
  
  .ant-form-item-explain-error {
    color: #ef4444;
    font-size: 13px;
  }
`;

export const StyledInput = styled(Input)`
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  padding: 12px 16px;
  font-size: 15px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #2d5016;
    box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
  }
  
  &:hover {
    border-color: #9ca3af;
  }
`;

export const StyledTextArea = styled(Input.TextArea)`
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  padding: 12px 16px;
  font-size: 15px;
  transition: all 0.3s ease;
  resize: vertical;
  
  &:focus {
    border-color: #2d5016;
    box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.1);
  }
  
  &:hover {
    border-color: #9ca3af;
  }
`;

export const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
  border: none;
  border-radius: 12px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  box-shadow: 0 4px 15px rgba(45, 80, 22, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      transparent 100%
    );
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #4a7c59 0%, #2d5016 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(45, 80, 22, 0.4);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.ant-btn-loading {
    background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
  }
`;

export const ContactInfoSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ContactInfoCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 30px;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #ff8c00, #2d5016);
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    transform: ${props => props.clickable ? 'translateX(5px)' : 'none'};
    background: ${props => props.clickable ? 'rgba(45, 80, 22, 0.02)' : 'transparent'};
    border-radius: 12px;
    margin: 0 -10px;
    padding: 20px 10px;
  }
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
`;

export const ContactIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  color: #2d5016;
  margin-right: 20px;
  width: 24px;
  text-align: center;
  padding: 12px;
  background: linear-gradient(135deg, rgba(45, 80, 22, 0.1), rgba(255, 140, 0, 0.1));
  border-radius: 50%;
  transition: all 0.3s ease;
  
  ${ContactInfoItem}:hover & {
    color: #ff8c00;
    transform: scale(1.1);
  }
`;

export const ContactInfoText = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    font-weight: 600;
    color: #1e293b;
    font-size: 15px;
    margin-bottom: 4px;
  }
  
  span {
    color: #64748b;
    font-size: 14px;
    line-height: 1.4;
  }
`;

export const SocialLinksSection = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #f1f5f9;
  
  h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 20px;
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  color: ${props => props.color};
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.color};
    border-radius: 50%;
    transform: scale(0);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  &:hover {
    transform: translateY(-3px);
    border-color: ${props => props.color};
    color: white;
    box-shadow: 0 8px 25px ${props => props.color}40;
    
    &:before {
      transform: scale(1);
    }
    
    svg {
      position: relative;
      z-index: 1;
    }
  }
`;

export const MapSection = styled.div`
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  
  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 20px;
  }
  
  .map-placeholder {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-radius: 16px;
    padding: 40px 20px;
    text-align: center;
    border: 2px dashed #cbd5e1;
    
    svg {
      font-size: 3rem;
      color: #2d5016;
      margin-bottom: 15px;
    }
    
    p {
      font-size: 16px;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
    
    small {
      color: #6b7280;
      font-size: 13px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;
