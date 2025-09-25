import React from 'react';
import AIRecommendComponent from '../../components/AIRecomendComponent/ALRecomendComponent';
import styled from 'styled-components';

const AIPageContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed header */
  background: linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%);
  
  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  padding: 40px 20px 20px;
  
  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    color: #2d5016;
    margin-bottom: 15px;
    font-weight: 700;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: 20px 15px 15px;
    
    h1 {
      margin-bottom: 10px;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const AIPage = () => {
  return (
    <AIPageContainer>
      <AIRecommendComponent />
    </AIPageContainer>
  );
};

export default AIPage;
