import { Row } from "antd";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

export const Wrapper = styled(Row)`
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #5d8f3a 100%);
  padding: 15px 40px;
  color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(45, 80, 22, 0.4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  height: auto;
  
  @media (min-width: 1200px) {
    padding: 23px 120px;
  }
  
  @media (max-width: 992px) {
    padding: 15px 30px;
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    height: 60px; // Set fixed height
  }
  
  @media (max-width: 480px) {
    padding: 10px 15px;
    height: 56px; // Reduce height slightly
  }
`;
export const WrapperHeaderText = styled.span`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  
  &::before {
    content: '👨‍🍳';
    margin-right: 10px;
    font-size: 28px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 38px;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #a8d5a8, #7fb069);
    transition: width 0.4s ease;
    border-radius: 1px;
  }
  
  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    
    &::after {
      width: calc(100% - 38px);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 22px;
    max-width: 180px; // Giới hạn chiều rộng
    
    &::before {
      font-size: 20px;
    }
  }
  
  @media (max-width: 576px) {
    font-size: 20px;
    max-width: 140px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
    
    &::before {
      font-size: 18px;
      margin-right: 5px;
    }
    
    &::after {
      bottom: -3px;
      height: 1px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    justify-content: flex-end;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: ${props => props.isOpen ? '60px' : '-100vh'};
    right: ${props => props.isOpen ? '0' : '-100%'};
    opacity: ${props => props.isOpen ? '1' : '0'};
    width: 80%;
    max-width: 300px;
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%);
    padding: 20px;
    flex-direction: column;
    z-index: 999;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
    border-left: 3px solid #ff8c00;
    
    .mobile-nav-item {
      padding: 15px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 8px;
      margin-bottom: 2px;
      
      &:hover {
        background: rgba(255, 140, 0, 0.15);
        color: #ff8c00;
        padding-left: 15px;
        transform: translateX(5px);
      }
      
      svg {
        margin-right: 12px;
        color: #ff8c00;
        transition: transform 0.2s ease;
      }
      
      &:hover svg {
        transform: translateX(3px) scale(1.1);
      }
      
      &:active {
        opacity: 0.8;
        background: rgba(255, 140, 0, 0.25);
      }
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
    
    .mobile-nav-item {
      padding: 16px 0;
      font-size: 16px;
    }
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: relative;
    z-index: 1001;
    border-radius: 50%;
    background: rgba(255, 140, 0, 0.1);
    border: 1px solid rgba(255, 140, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 140, 0, 0.2);
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(255, 140, 0, 0.15);
    }
    
    &:active {
      background: rgba(255, 140, 0, 0.3);
      transform: translateY(0);
    }
    
    .bar {
      width: 24px;
      height: 2px;
      background-color: white;
      position: absolute;
      transition: all 0.3s ease;
      border-radius: 1px;
      
      &:nth-child(1) {
        top: ${props => props.isOpen ? '50%' : '30%'};
        transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      }
      
      &:nth-child(2) {
        top: 50%;
        opacity: ${props => props.isOpen ? '0' : '1'};
      }
      
      &:nth-child(3) {
        top: ${props => props.isOpen ? '50%' : '70%'};
        transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    
    .bar {
      width: 20px;
    }
  }
`;

export const LinkButton = styled.a`
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  letter-spacing: 0.5px;
  
  @media (max-width: 992px) {
    font-size: 14px;
    letter-spacing: 0;
  }
`;

export const ContainerButton = styled.div`
  position: relative;
  border-radius: 8px;
  height: 42px;
  min-width: 120px;
  cursor: pointer;
  margin-right: 15px;
  overflow: hidden;
  background: linear-gradient(135deg, #4a7c59, #5d8f3a);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(74, 124, 89, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
  
  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #5d8f3a, #6fa143);
    box-shadow: 0 6px 20px rgba(74, 124, 89, 0.35);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.2) 50%, 
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 992px) {
    min-width: 100px;
    margin-right: 10px;
    height: 38px;
  }
  
  @media (min-width: 769px) and (max-width: 880px) {
    min-width: 90px;
    margin-right: 8px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 16px;
  color: #fff;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 140, 0, 0.15);
  border-radius: 30px;
  padding: 5px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 140, 0, 0.3);
  backdrop-filter: blur(10px);
  margin-right: 16px;
  
  &:hover {
    background: rgba(255, 140, 0, 0.25);
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.2);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 4px 10px;
    margin-right: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 3px 8px;
    margin-right: 8px;
  }
`;

export const LoginAndSignup = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60px;
  }
`;

export const UserIcon = styled(FontAwesomeIcon)`
  color: #ff8c00;
  font-size: 18px;
  margin-right: 5px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-right: 3px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-right: 3px;
  }
`;

export const SearchContainer = styled.div`
  margin-right: 20px;
  flex: 1;
  max-width: 280px;
  
  @media (max-width: 992px) {
    max-width: 200px;
    margin-right: 16px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;


export const SearchIconButton = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 140, 0, 0.15);
    border: 1px solid rgba(255, 140, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 10px;
    
    &:hover {
      background: rgba(255, 140, 0, 0.25);
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(255, 140, 0, 0.2);
    }
    
    svg {
      color: #ff8c00;
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
    margin-right: 8px;
    
    svg {
      font-size: 14px;
    }
  }
`;


export const NotificationButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1));
  border: 1px solid rgba(76, 175, 80, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: 16px;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(139, 195, 74, 0.15));
    border-color: rgba(76, 175, 80, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(76, 175, 80, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
  }
  
  svg {
    color: #4CAF50;
    font-size: 18px;
    transition: all 0.2s ease;
  }
  
  &:hover svg {
    color: #388E3C;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 50%;
    
    svg {
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
    margin-right: 8px;
    
    svg {
      font-size: 14px;
    }
  }
`;


export const NotificationPanel = styled.div`
  position: absolute;
  top: 100%;
  right: -160px;
  width: 380px;
  max-height: 500px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #e4e6ea;
  z-index: 1001;
  overflow: hidden;
  margin-top: 8px;
  animation: slideDown 0.2s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    right: -140px;
    width: 340px;
    max-height: 450px;
  }
  
  @media (max-width: 480px) {
    right: -280px;
    left: auto;
    width: 95vw;
    max-width: 350px;
    max-height: 400px;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e4e6ea;
  background: #ffffff;
  
  h3 {
    margin: 0;
    color: #1c1e21;
    font-size: 20px;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  
  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  button {
    background: none;
    border: none;
    color: #65676b;
    font-size: 15px;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    
    &:hover {
      background-color: #f2f3f4;
    }
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  position: relative;
  background: ${props => props.$isRead ? '#ffffff' : '#e7f3ff'};
  
  &:hover {
    background-color: #f2f3f4;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    left: 12px;
    width: 8px;
    height: 8px;
    background: ${props => props.$isRead ? 'transparent' : '#1877f2'};
    border-radius: 50%;
  }
`;

export const NotificationAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 12px;
  margin-left: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #f0f2f5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  span {
    font-size: 20px;
    opacity: 0.6;
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
  padding-right: 12px;
  
  h4 {
    margin: 0 0 4px 0;
    color: #1c1e21;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  
  p {
    margin: 0 0 4px 0;
    color: #65676b;
    font-size: 13px;
    line-height: 1.4;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`;

export const NotificationTime = styled.span`
  color: #1877f2;
  font-size: 13px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

export const NotificationActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  opacity: 0;
  
  ${NotificationItem}:hover & {
    opacity: 1;
  }
  
  button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    background: none;
    color: #65676b;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
      background: #f2f3f4;
    }
  }
`;

export const EmptyNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  
  p {
    color: #65676b;
    font-size: 16px;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`;

export const MobileSearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1002;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 70px 20px 0;
  opacity: ${props => props.isOpen ? '1' : '0'};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  transition: all 0.3s ease;
  
  .search-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    svg {
      color: white;
      font-size: 18px;
    }
  }
`;

export const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  backdrop-filter: blur(3px);
  transition: opacity 0.3s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  animation: ${pulse} 3s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
    opacity: 0.3;
    animation: ${pulse} 3s ease-in-out infinite;
  }
`;

export const PremiumBadge = styled.span`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #5D4037;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 480px) {
    display: none;
  }
`;

export const ChatButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(66, 165, 245, 0.1));
  border: 1px solid rgba(33, 150, 243, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: 16px;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(66, 165, 245, 0.15));
    border-color: rgba(33, 150, 243, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(33, 150, 243, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.1);
  }
  
  svg {
    color: #2196F3;
    font-size: 18px;
    transition: all 0.2s ease;
  }
  
  &:hover svg {
    color: #1976D2;
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 50%;
    
    svg {
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    width: 34px;
    height: 34px;
    margin-right: 8px;
    
    svg {
      font-size: 14px;
    }
  }
`;
