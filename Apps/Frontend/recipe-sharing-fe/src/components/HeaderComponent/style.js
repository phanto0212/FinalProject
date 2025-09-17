import { Row } from "antd";
import styled, { keyframes, css } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
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
    content: '�';
    margin-right: 8px;
    font-size: 24px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, #ff8c00, transparent);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
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
  margin-right: 8px;
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
  
  &:hover {
    background: rgba(255, 140, 0, 0.25);
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.2);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: 12px;
    right: 60px; // Khoảng cách đến edge
    padding: 3px 10px;
  }
  
  @media (max-width: 480px) {
    top: 10px;
    right: 60px;
    padding: 3px 8px;
    max-width: 100px;
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
  margin-right: 15px;
  flex: 1;
  max-width: 300px;
  
  @media (max-width: 992px) {
    max-width: 220px;
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: 12px;
    right: 170px; // Tăng giá trị này để đẩy xa khỏi User
    max-width: 150px; // Giảm chiều rộng để tránh chồng lấn
    margin-right: 0;
  }
  
  @media (max-width: 576px) {
    right: 150px;
    max-width: 120px;
  }
  
  @media (max-width: 480px) {
    display: none; // Ẩn trên mobile nhỏ và sử dụng SearchIconButton thay thế
  }
`;

export const SearchIconButton = styled.div`
  display: none;
  
  @media (max-width: 480px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 110px; // Tăng khoảng cách với User
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 140, 0, 0.15);
    border: 1px solid rgba(255, 140, 0, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    
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
  top: -5px;
  right: -5px;
  background: #ff0000;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 0 0 rgba(255, 0, 0, 0.4);
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