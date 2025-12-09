import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faClock, 
  faStar, 
  faHeart, 
  faFire,
  faUtensils,
  faChevronLeft,
  faChevronRight,
  faHistory,
  faTimes,
  faEye,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';

import {
  SearchPageContainer,
  SearchHeader,
  SearchHeaderContent,
  SearchTitle,
  SearchSubtitle,
  SearchInputWrapper,
  SearchButton,
  QuickFilters,
  QuickFilterTag,
  MainContent,
  ResultsHeader,
  ResultsInfo,
  FilterControls,
  FilterButton,
  SortSelect,
  ContentWrapper,
  FilterSidebar,
  FilterCard,
  FilterTitle,
  FilterSection,
  FilterLabel,
  RangeSlider,
  ClearFiltersButton,
  ResultsArea,
  RecipeGrid,
  RecipeCard,
  RecipeImageWrapper,
  RecipeOverlay,
  RecipeBadges,
  RecipeBadge,
  SaveRecipeButton,
  RecipeContent,
  RecipeCategory,
  RecipeTitle,
  RecipeDescription,
  RecipeMeta,
  RecipeMetaItem,
  RecipeChef,
  ChefAvatar,
  ChefInfo,
  RecipeRating,
  Pagination,
  PageButton,
  NoResults,
  SuggestionsBox,
  SuggestionTag,
  LoadingGrid,
  LoadingCard,
  RecentSearches,
  RecentSearchTag
} from './style';
import newRequest from '../../utils/request';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    cookingTime: searchParams.get('time') || '',
    cuisine: searchParams.get('cuisine') || '',
    sortBy: searchParams.get('sort') || 'relevance'
  });

  // Quick filter categories
  const quickFilters = [
    { label: '🍝 Món Ý', value: 'italian' },
    { label: '🍜 Món Á', value: 'asian' },
    { label: '🥗 Healthy', value: 'healthy' },
    { label: '⏱️ Nhanh gọn', value: 'quick' },
    { label: '🍰 Tráng miệng', value: 'dessert' },
    { label: '🥬 Chay', value: 'vegetarian' }
  ];

  // Categories for filter
  const categories = [
    { label: 'Tất cả', value: '' },
    { label: 'Món chính', value: 'main' },
    { label: 'Khai vị', value: 'appetizer' },
    { label: 'Tráng miệng', value: 'dessert' },
    { label: 'Đồ uống', value: 'drink' },
    { label: 'Bánh', value: 'bakery' },
    { label: 'Salad', value: 'salad' }
  ];

  // Difficulty levels
  const difficulties = [
    { label: 'Tất cả', value: '' },
    { label: 'Dễ', value: 'easy' },
    { label: 'Trung bình', value: 'medium' },
    { label: 'Khó', value: 'hard' }
  ];

  // Cooking time ranges
  const cookingTimes = [
    { label: 'Tất cả', value: '' },
    { label: 'Dưới 15 phút', value: '0-15' },
    { label: '15 - 30 phút', value: '15-30' },
    { label: '30 - 60 phút', value: '30-60' },
    { label: 'Trên 60 phút', value: '60+' }
  ];

  // Suggested searches
  const suggestions = [
    'Phở bò', 'Bánh mì', 'Bún chả', 'Gỏi cuốn', 
    'Cơm tấm', 'Chả giò', 'Canh chua', 'Bánh xèo'
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Search recipes
  const searchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.cookingTime) params.append('time', filters.cookingTime);
      if (filters.cuisine) params.append('cuisine', filters.cuisine);
      if (filters.sortBy) params.append('sort', filters.sortBy);
      params.append('page', currentPage);
      params.append('limit', 12);

      const response = await newRequest.get(`/recipes/search?${params.toString()}`);
      
      if (response.data) {
        setRecipes(response.data.recipes || []);
        setTotalResults(response.data.total || 0);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Set mock data for demo
      setRecipes(getMockRecipes());
      setTotalResults(24);
      setTotalPages(2);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, filters, currentPage]);

  // Initial search and on filter change
  useEffect(() => {
    searchRecipes();
  }, [searchRecipes]);

  // Handle search submit
  const handleSearch = (e) => {
    e?.preventDefault();
    
    // Save to recent searches
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      const newRecent = [searchQuery, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
    
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (filters.category) params.set('category', filters.category);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.cookingTime) params.set('time', filters.cookingTime);
    setSearchParams(params);
    
    setCurrentPage(1);
    searchRecipes();
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // Handle quick filter
  const handleQuickFilter = (value) => {
    setFilters(prev => ({
      ...prev,
      cuisine: prev.cuisine === value ? '' : value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      difficulty: '',
      cookingTime: '',
      cuisine: '',
      sortBy: 'relevance'
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Toggle save recipe
  const toggleSaveRecipe = (recipeId) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Navigate to recipe detail
  const goToRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  // Clear recent search
  const clearRecentSearch = (search) => {
    const newRecent = recentSearches.filter(s => s !== search);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  // Mock data for demo
  const getMockRecipes = () => [
    {
      id: 1,
      title: 'Phở Bò Truyền Thống',
      description: 'Phở bò với nước dùng đậm đà, thịt bò tái chín mềm, hành ngò thơm phức',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500',
      category: 'Món chính',
      cookingTime: 120,
      difficulty: 'Khó',
      rating: 4.8,
      reviewCount: 256,
      views: 15420,
      comments: 89,
      isNew: false,
      isPopular: true,
      chef: {
        name: 'Chef Minh',
        avatar: 'https://i.pravatar.cc/100?img=1',
        isVerified: true
      }
    },
    {
      id: 2,
      title: 'Bánh Mì Thịt Nướng',
      description: 'Bánh mì giòn rụm với thịt nướng đậm đà, rau sống tươi mát',
      image: 'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=500',
      category: 'Khai vị',
      cookingTime: 30,
      difficulty: 'Dễ',
      rating: 4.6,
      reviewCount: 189,
      views: 12350,
      comments: 67,
      isNew: true,
      isPopular: false,
      chef: {
        name: 'Bếp Nhà Tôi',
        avatar: 'https://i.pravatar.cc/100?img=2',
        isVerified: false
      }
    },
    {
      id: 3,
      title: 'Gỏi Cuốn Tôm Thịt',
      description: 'Gỏi cuốn tươi mát với tôm, thịt, rau sống và bún tươi',
      image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=500',
      category: 'Khai vị',
      cookingTime: 20,
      difficulty: 'Dễ',
      rating: 4.5,
      reviewCount: 145,
      views: 9870,
      comments: 45,
      isNew: false,
      isPopular: true,
      chef: {
        name: 'Chef Lan',
        avatar: 'https://i.pravatar.cc/100?img=3',
        isVerified: true
      }
    },
    {
      id: 4,
      title: 'Bún Chả Hà Nội',
      description: 'Bún chả đậm đà hương vị Hà Nội với chả nướng thơm lừng',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500',
      category: 'Món chính',
      cookingTime: 45,
      difficulty: 'Trung bình',
      rating: 4.9,
      reviewCount: 312,
      views: 18900,
      comments: 156,
      isNew: false,
      isPopular: true,
      chef: {
        name: 'Bếp Hà Nội',
        avatar: 'https://i.pravatar.cc/100?img=4',
        isVerified: true
      }
    },
    {
      id: 5,
      title: 'Chè Bưởi',
      description: 'Chè bưởi thanh mát với cùi bưởi dai giòn, nước cốt dừa béo ngậy',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500',
      category: 'Tráng miệng',
      cookingTime: 60,
      difficulty: 'Trung bình',
      rating: 4.4,
      reviewCount: 98,
      views: 6540,
      comments: 32,
      isNew: true,
      isPopular: false,
      chef: {
        name: 'Sweet Corner',
        avatar: 'https://i.pravatar.cc/100?img=5',
        isVerified: false
      }
    },
    {
      id: 6,
      title: 'Cơm Tấm Sườn Bì',
      description: 'Cơm tấm với sườn nướng mềm ngọt, bì giòn và chả trứng',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
      category: 'Món chính',
      cookingTime: 40,
      difficulty: 'Trung bình',
      rating: 4.7,
      reviewCount: 234,
      views: 14200,
      comments: 78,
      isNew: false,
      isPopular: true,
      chef: {
        name: 'Sài Gòn Food',
        avatar: 'https://i.pravatar.cc/100?img=6',
        isVerified: true
      }
    }
  ];

  // Render loading skeleton
  const renderLoadingSkeleton = () => (
    <LoadingGrid>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <LoadingCard key={i}>
          <div className="image-skeleton" />
          <div className="content-skeleton">
            <div className="line short" />
            <div className="line title" />
            <div className="line" />
            <div className="line meta" />
          </div>
        </LoadingCard>
      ))}
    </LoadingGrid>
  );

  // Render recipe card
  const renderRecipeCard = (recipe, index) => (
    <RecipeCard key={recipe.id} $index={index} onClick={() => goToRecipe(recipe.id)}>
      <RecipeImageWrapper>
        <img src={recipe.image} alt={recipe.title} />
        <RecipeOverlay />
        <RecipeBadges>
          {recipe.isNew && <RecipeBadge $type="new">Mới</RecipeBadge>}
          {recipe.isPopular && <RecipeBadge $type="popular">Hot</RecipeBadge>}
        </RecipeBadges>
        <SaveRecipeButton 
          $saved={savedRecipes.includes(recipe.id)}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveRecipe(recipe.id);
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </SaveRecipeButton>
      </RecipeImageWrapper>
      
      <RecipeContent>
        <RecipeCategory>{recipe.category}</RecipeCategory>
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeDescription>{recipe.description}</RecipeDescription>
        
        <RecipeMeta>
          <RecipeMetaItem>
            <FontAwesomeIcon icon={faClock} />
            {recipe.cookingTime} phút
          </RecipeMetaItem>
          <RecipeMetaItem>
            <FontAwesomeIcon icon={faEye} />
            {recipe.views?.toLocaleString()}
          </RecipeMetaItem>
          <RecipeMetaItem>
            <FontAwesomeIcon icon={faComment} />
            {recipe.comments}
          </RecipeMetaItem>
        </RecipeMeta>
        
        <RecipeChef>
          <ChefAvatar src={recipe.chef?.avatar} alt={recipe.chef?.name} />
          <ChefInfo>
            <div className="chef-name">{recipe.chef?.name}</div>
            <div className="chef-followers">{recipe.difficulty}</div>
          </ChefInfo>
          <RecipeRating>
            <FontAwesomeIcon icon={faStar} />
            <span>{recipe.rating}</span>
          </RecipeRating>
        </RecipeChef>
      </RecipeContent>
    </RecipeCard>
  );

  return (
    <DefaultComponent>
      <SearchPageContainer>
        {/* Search Header */}
        <SearchHeader>
          <SearchHeaderContent>
            <SearchTitle>
              Khám phá <span>công thức</span> tuyệt vời
            </SearchTitle>
            <SearchSubtitle>
              Tìm kiếm hàng ngàn công thức nấu ăn từ các đầu bếp tài năng
            </SearchSubtitle>
            
            <form onSubmit={handleSearch}>
              <SearchInputWrapper>
                <FontAwesomeIcon icon={faSearch} style={{ color: '#9ca3af', marginRight: '12px' }} />
                <input 
                  type="text"
                  placeholder="Tìm kiếm món ăn, nguyên liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                  Tìm kiếm
                </SearchButton>
              </SearchInputWrapper>
            </form>
            
            {/* Quick Filters */}
            <QuickFilters>
              {quickFilters.map(filter => (
                <QuickFilterTag
                  key={filter.value}
                  $active={filters.cuisine === filter.value}
                  onClick={() => handleQuickFilter(filter.value)}
                >
                  {filter.label}
                </QuickFilterTag>
              ))}
            </QuickFilters>
            
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <RecentSearches>
                <h4>Tìm kiếm gần đây</h4>
                <div className="searches">
                  {recentSearches.map((search, index) => (
                    <RecentSearchTag 
                      key={index}
                      onClick={() => {
                        setSearchQuery(search);
                        handleSearch();
                      }}
                    >
                      <FontAwesomeIcon icon={faHistory} />
                      {search}
                      <FontAwesomeIcon 
                        icon={faTimes} 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearRecentSearch(search);
                        }}
                      />
                    </RecentSearchTag>
                  ))}
                </div>
              </RecentSearches>
            )}
          </SearchHeaderContent>
        </SearchHeader>
        
        {/* Main Content */}
        <MainContent>
          {/* Results Header */}
          <ResultsHeader>
            <ResultsInfo>
              <h2>
                {searchQuery ? (
                  <>Kết quả cho "<span>{searchQuery}</span>"</>
                ) : (
                  <>Tất cả <span>công thức</span></>
                )}
              </h2>
              <p>Tìm thấy {totalResults.toLocaleString()} công thức</p>
            </ResultsInfo>
            
            <FilterControls>
              <FilterButton 
                $active={showFilters}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} />
                Bộ lọc
              </FilterButton>
              
              <SortSelect 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <option value="relevance">Phù hợp nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="views">Xem nhiều</option>
                <option value="newest">Mới nhất</option>
                <option value="cookingTime">Thời gian nấu</option>
              </SortSelect>
            </FilterControls>
          </ResultsHeader>
          
          <ContentWrapper>
            {/* Filter Sidebar */}
            <FilterSidebar $isOpen={showFilters}>
              <FilterCard>
                <FilterTitle>
                  <FontAwesomeIcon icon={faUtensils} />
                  Danh mục
                </FilterTitle>
                <FilterSection>
                  {categories.map(cat => (
                    <FilterLabel key={cat.value}>
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat.value}
                        onChange={() => handleFilterChange('category', cat.value)}
                      />
                      {cat.label}
                    </FilterLabel>
                  ))}
                </FilterSection>
              </FilterCard>
              
              <FilterCard>
                <FilterTitle>
                  <FontAwesomeIcon icon={faFire} />
                  Độ khó
                </FilterTitle>
                <FilterSection>
                  {difficulties.map(diff => (
                    <FilterLabel key={diff.value}>
                      <input
                        type="radio"
                        name="difficulty"
                        checked={filters.difficulty === diff.value}
                        onChange={() => handleFilterChange('difficulty', diff.value)}
                      />
                      {diff.label}
                    </FilterLabel>
                  ))}
                </FilterSection>
              </FilterCard>
              
              <FilterCard>
                <FilterTitle>
                  <FontAwesomeIcon icon={faClock} />
                  Thời gian nấu
                </FilterTitle>
                <FilterSection>
                  {cookingTimes.map(time => (
                    <FilterLabel key={time.value}>
                      <input
                        type="radio"
                        name="cookingTime"
                        checked={filters.cookingTime === time.value}
                        onChange={() => handleFilterChange('cookingTime', time.value)}
                      />
                      {time.label}
                    </FilterLabel>
                  ))}
                </FilterSection>
              </FilterCard>
              
              <ClearFiltersButton onClick={clearFilters}>
                <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
                Xóa tất cả bộ lọc
              </ClearFiltersButton>
            </FilterSidebar>
            
            {/* Results Area */}
            <ResultsArea>
              {loading ? (
                renderLoadingSkeleton()
              ) : recipes.length > 0 ? (
                <>
                  <RecipeGrid>
                    {recipes.map((recipe, index) => renderRecipeCard(recipe, index))}
                  </RecipeGrid>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination>
                      <PageButton
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </PageButton>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PageButton
                          key={i + 1}
                          $active={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PageButton>
                      ))}
                      
                      <PageButton
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </PageButton>
                    </Pagination>
                  )}
                </>
              ) : (
                <NoResults>
                  <div className="icon">🍳</div>
                  <h3>Không tìm thấy công thức</h3>
                  <p>Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</p>
                  
                  <SuggestionsBox>
                    <h4>Gợi ý tìm kiếm</h4>
                    <div className="suggestions">
                      {suggestions.map((suggestion, index) => (
                        <SuggestionTag
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            handleSearch();
                          }}
                        >
                          {suggestion}
                        </SuggestionTag>
                      ))}
                    </div>
                  </SuggestionsBox>
                </NoResults>
              )}
            </ResultsArea>
          </ContentWrapper>
        </MainContent>
      </SearchPageContainer>
    </DefaultComponent>
  );
};

export default SearchPage;
