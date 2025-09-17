import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  width: ${props => props.fullWidth ? '100%' : '100%'};
  max-width: ${props => props.fullWidth ? '600px' : '250px'};
  transition: all 0.3s ease;
  
  @media (max-width: 1200px) {
    max-width: ${props => props.fullWidth ? '550px' : '220px'};
  }
  
  @media (max-width: 992px) {
    max-width: ${props => props.fullWidth ? '500px' : '200px'};
  }
  
  @media (max-width: 768px) {
    max-width: ${props => props.fullWidth ? '90%' : '180px'};
  }
  
  @media (max-width: 480px) {
    max-width: ${props => props.fullWidth ? '90%' : '160px'};
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 140, 0, 0.2);
  border-radius: 92px;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.1);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: rgba(255, 140, 0, 0.6);
    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.25);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 1);
  }
  
  &:hover {
    border-color: rgba(255, 140, 0, 0.4);
    box-shadow: 0 5px 18px rgba(255, 140, 0, 0.15);
  }
  
  input {
    flex: 1;
    height: 100%;
    color: #2d5016;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    outline: none;
    background-color: transparent;
    
    &::placeholder {
      color: #999;
      font-weight: 400;
      transition: color 0.3s ease;
    }
    
    &:focus::placeholder {
      color: #bbb;
    }
  }
  
  @media (max-width: 768px) {
    height: 40px;
    padding-left: 12px;
    
    input {
      font-size: 0.95rem;
    }
  }
  
  @media (max-width: 480px) {
    height: 38px;
    padding-left: 10px;
    border-radius: 30px;
    
    input {
      font-size: 0.9rem;
      
      &::placeholder {
        font-size: 0.85rem;
      }
    }
  }
`;

export const Search = styled.button`
  width: 52px;
  height: 100%;
  border-top-right-radius: 92px;
  border-bottom-right-radius: 92px;
  font-size: 1.2rem;
  border: none;
  background: linear-gradient(135deg, #ff8c00, #ffb347);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #ffb347, #ff8c00);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 140, 0, 0.4);
  }
  
  &:active {
    background: linear-gradient(135deg, #e67e00, #ff8c00);
    transform: scale(0.97) translateY(0);
    box-shadow: 0 2px 6px rgba(255, 140, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 46px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    font-size: 1rem;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
  
  /* Tối ưu cho thiết bị cảm ứng */
  @media (hover: none) {
    &:active {
      background: linear-gradient(135deg, #e67e00, #ff8c00);
    }
  }
`;