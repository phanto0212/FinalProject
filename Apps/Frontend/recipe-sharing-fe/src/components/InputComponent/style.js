import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  width: ${props => props.fullWidth ? '100%' : '100%'};
  max-width: ${props => props.fullWidth ? '600px' : '280px'};
  transition: all 0.3s ease;
  
  @media (max-width: 1200px) {
    max-width: ${props => props.fullWidth ? '550px' : '250px'};
  }
  
  @media (max-width: 992px) {
    max-width: ${props => props.fullWidth ? '500px' : '220px'};
  }
  
  @media (max-width: 768px) {
    max-width: ${props => props.fullWidth ? '90%' : '200px'};
  }
  
  @media (max-width: 480px) {
    max-width: ${props => props.fullWidth ? '90%' : '180px'};
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(45, 80, 22, 0.15);
  border-radius: 25px;
  box-shadow: 0 2px 12px rgba(45, 80, 22, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus-within {
    border-color: rgba(45, 80, 22, 0.4);
    box-shadow: 0 4px 20px rgba(45, 80, 22, 0.15);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 1);
  }
  
  &:hover {
    border-color: rgba(45, 80, 22, 0.25);
    box-shadow: 0 3px 15px rgba(45, 80, 22, 0.1);
  }
  
  input {
    flex: 1;
    height: 100%;
    color: #2d5016;
    font-size: 0.95rem;
    font-weight: 500;
    border: none;
    outline: none;
    background-color: transparent;
    
    &::placeholder {
      color: #8a9a7d;
      font-weight: 400;
      transition: color 0.3s ease;
    }
    
    &:focus::placeholder {
      color: #a8b8a0;
    }
  }
  
  @media (max-width: 768px) {
    height: 38px;
    padding-left: 14px;
    border-radius: 20px;
    
    input {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    height: 36px;
    padding-left: 12px;
    border-radius: 18px;
    
    input {
      font-size: 0.85rem;
      
      &::placeholder {
        font-size: 0.8rem;
      }
    }
  }
`;

export const Search = styled.button`
  width: 48px;
  height: 100%;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  font-size: 1rem;
  border: none;
  background: linear-gradient(135deg, #2d5016, #4a7c59);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: linear-gradient(135deg, #3d6a20, #5a8c69);
    transform: scale(1.02);
  }
  
  &:active {
    background: linear-gradient(135deg, #1f3d0d, #3a6c49);
    transform: scale(0.98);
  }
  
  @media (max-width: 768px) {
    width: 42px;
    font-size: 0.95rem;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  @media (max-width: 480px) {
    width: 38px;
    font-size: 0.9rem;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  
  /* Tối ưu cho thiết bị cảm ứng */
  @media (hover: none) {
    &:active {
      background: linear-gradient(135deg, #1f3d0d, #3a6c49);
    }
  }
`;