import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

export const SearchPageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8faf5 0%, #e8f5e9 50%, #f1f8e9 100%);
  padding-top: 90px;
  padding-bottom: 40px;
`;

export const SearchHeader = styled.div`
  background: linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #5d8f3a 100%);
  padding: 40px 20px 60px;
  margin-top: -16px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }
  
  &::after {
    content: '🍳';
    position: absolute;
    right: 10%;
    top: 20%;
    font-size: 80px;
    opacity: 0.1;
    animation: ${float} 4s ease-in-out infinite;
  }
`;

export const SearchHeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

export const SearchTitle = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  span {
    color: #ff8c00;
  }
  
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const SearchSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  padding: 8px 8px 8px 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: 0 auto;
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    background: transparent;
    
    &::placeholder {
      color: #999;
    }
  }
  
  @media (max-width: 768px) {
    padding: 6px 6px 6px 16px;
    
    input {
      font-size: 14px;
    }
  }
`;

export const SearchButton = styled.button`
  background: linear-gradient(135deg, #ff8c00, #ffb347);
  border: none;
  border-radius: 50px;
  padding: 14px 32px;
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #e67e00, #ff8c00);
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(255, 140, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

export const QuickFilters = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const QuickFilterTag = styled.button`
  background: ${props => props.$active ? 'rgba(255, 140, 0, 0.9)' : 'rgba(255, 255, 255, 0.2)'};
  border: 1px solid ${props => props.$active ? '#ff8c00' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 20px;
  padding: 8px 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 140, 0, 0.7);
    border-color: #ff8c00;
    transform: translateY(-2px);
  }
`;

export const MainContent = styled.div`
  max-width: 1400px;
  margin: -30px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 10;
`;

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

export const ResultsInfo = styled.div`
  h2 {
    font-size: 20px;
    color: #2d5016;
    margin: 0 0 4px 0;
    font-weight: 700;
    
    span {
      color: #ff8c00;
    }
  }
  
  p {
    color: #6b7280;
    font-size: 14px;
    margin: 0;
  }
`;

export const FilterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #2d5016, #4a7c59)' : '#f3f4f6'};
  color: ${props => props.$active ? '#fff' : '#4b5563'};
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? 'linear-gradient(135deg, #3d6a20, #5a8c69)' : '#e5e7eb'};
    transform: translateY(-1px);
  }
  
  svg {
    font-size: 16px;
  }
`;

export const SortSelect = styled.select`
  background: #f3f4f6;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e5e7eb;
  }
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(45, 80, 22, 0.2);
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const FilterSidebar = styled.aside`
  width: 280px;
  flex-shrink: 0;
  
  @media (max-width: 992px) {
    width: 100%;
    display: ${props => props.$isOpen ? 'block' : 'none'};
  }
`;

export const FilterCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  animation: ${fadeIn} 0.5s ease;
`;

export const FilterTitle = styled.h3`
  font-size: 16px;
  color: #2d5016;
  margin: 0 0 16px 0;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: #ff8c00;
  }
`;

export const FilterSection = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #4b5563;
  font-size: 14px;
  
  &:hover {
    background: #f0f7ed;
    color: #2d5016;
  }
  
  input[type="checkbox"], input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #2d5016;
    cursor: pointer;
  }
`;

export const RangeSlider = styled.div`
  padding: 10px 0;
  
  input[type="range"] {
    width: 100%;
    accent-color: #2d5016;
  }
  
  .range-values {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 13px;
    color: #6b7280;
  }
`;

export const ClearFiltersButton = styled.button`
  width: 100%;
  background: #fff;
  border: 2px dashed #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff8c00;
    color: #ff8c00;
    background: #fff8f0;
  }
`;

export const ResultsArea = styled.main`
  flex: 1;
  min-width: 0;
`;

export const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
`;

export const RecipeCard = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.5s ease;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(45, 80, 22, 0.15);
  }
`;

export const RecipeImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${RecipeCard}:hover & img {
    transform: scale(1.1);
  }
`;

export const RecipeOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${RecipeCard}:hover & {
    opacity: 1;
  }
`;

export const RecipeBadges = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
`;

export const RecipeBadge = styled.span`
  background: ${props => {
    switch(props.$type) {
      case 'new': return 'linear-gradient(135deg, #10b981, #059669)';
      case 'popular': return 'linear-gradient(135deg, #ff8c00, #ffb347)';
      case 'trending': return 'linear-gradient(135deg, #ef4444, #f87171)';
      default: return 'rgba(0, 0, 0, 0.6)';
    }
  }};
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
`;

export const SaveRecipeButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.$saved ? '#ff6b6b' : 'rgba(255, 255, 255, 0.9)'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  svg {
    color: ${props => props.$saved ? '#fff' : '#ff6b6b'};
    font-size: 16px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: scale(1.1);
    
    svg {
      transform: scale(1.2);
    }
  }
`;

export const RecipeContent = styled.div`
  padding: 20px;
`;

export const RecipeCategory = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  color: #2d5016;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
`;

export const RecipeTitle = styled.h3`
  font-size: 18px;
  color: #1f2937;
  margin: 0 0 8px 0;
  font-weight: 700;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  &:hover {
    color: #2d5016;
  }
`;

export const RecipeDescription = styled.p`
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RecipeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;

export const RecipeMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 13px;
  
  svg {
    color: #ff8c00;
    font-size: 14px;
  }
`;

export const RecipeChef = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;

export const ChefAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e8f5e9;
`;

export const ChefInfo = styled.div`
  flex: 1;
  
  .chef-name {
    font-size: 13px;
    color: #1f2937;
    font-weight: 600;
    
    &:hover {
      color: #2d5016;
    }
  }
  
  .chef-followers {
    font-size: 11px;
    color: #9ca3af;
  }
`;

export const RecipeRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  
  svg {
    color: #fbbf24;
    font-size: 14px;
  }
  
  span {
    font-size: 13px;
    color: #4b5563;
    font-weight: 600;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
`;

export const PageButton = styled.button`
  min-width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: ${props => props.$active ? 'linear-gradient(135deg, #2d5016, #4a7c59)' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#4b5563'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(45, 80, 22, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.08)'};
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? 'linear-gradient(135deg, #3d6a20, #5a8c69)' : '#f3f4f6'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  .icon {
    font-size: 80px;
    margin-bottom: 20px;
    animation: ${float} 3s ease-in-out infinite;
  }
  
  h3 {
    font-size: 24px;
    color: #1f2937;
    margin: 0 0 12px 0;
  }
  
  p {
    color: #6b7280;
    font-size: 16px;
    margin: 0 0 24px 0;
  }
`;

export const SuggestionsBox = styled.div`
  background: #f0f7ed;
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  
  h4 {
    font-size: 14px;
    color: #2d5016;
    margin: 0 0 12px 0;
    font-weight: 600;
  }
  
  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const SuggestionTag = styled.button`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff8c00;
    color: #ff8c00;
    background: #fff8f0;
  }
`;

export const LoadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

export const LoadingCard = styled.div`
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  .image-skeleton {
    height: 200px;
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }
  
  .content-skeleton {
    padding: 20px;
    
    .line {
      height: 14px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: ${shimmer} 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 12px;
      
      &.title {
        height: 20px;
        width: 80%;
      }
      
      &.short {
        width: 60%;
      }
      
      &.meta {
        width: 40%;
        margin-bottom: 0;
      }
    }
  }
`;

export const RecentSearches = styled.div`
  margin-top: 20px;
  
  h4 {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 12px 0;
    font-weight: 500;
  }
  
  .searches {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const RecentSearchTag = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
  
  svg {
    font-size: 10px;
    opacity: 0.7;
  }
`;
