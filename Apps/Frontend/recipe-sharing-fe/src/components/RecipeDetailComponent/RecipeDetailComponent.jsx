import React, { useState, useEffect } from 'react';
import { Rate, Button, message, Spin } from 'antd';
import {
  ClockCircleOutlined,
  FireOutlined,
  UserOutlined,
  TeamOutlined,
  HeartOutlined,
  ShareAltOutlined,
  BookOutlined,
  StarOutlined,
  TrophyOutlined,
  CrownOutlined
} from '@ant-design/icons';

import {
  DetailContainer,
  HeaderSection,
  HeroImage,
  HeroContent,
  RecipeTitle,
  RecipeSubtitle,
  MetaInfo,
  MetaItem,
  ContentSection,
  MainContent,
  Sidebar,
  IngredientsCard,
  IngredientsList,
  IngredientItem,
  IngredientIcon,
  IngredientText,
  InstructionsSection,
  SectionTitle,
  StepsList,
  StepItem,
  StepContent,
  NutritionCard,
  NutritionGrid,
  NutritionItem,
  NutritionValue,
  NutritionLabel,
  RatingSection,
  RatingDisplay,
  RatingValue,
  RatingCount,
  ActionButtons,
  ActionButton,
  ChefSection,
  ChefInfo,
  ChefAvatar,
  ChefDetails,
  ChefName,
  ChefTitle,
  ChefBio,
  TagsSection,
  RecipeTag,
  ResponsiveWrapper,
  LoadingSkeleton
} from './style';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/request';

const RecipeDetailComponent = ({ recipeId, recipeData, loading }) => {
  const [userRating, setUserRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [servingSize, setServingSize] = useState(4);
  // Sample data - thay thế bằng data thực từ props hoặc API
  const defaultRecipe = {
    id: 1,
    title: "Phở Bò Hà Nội Truyền Thống",
    subtitle: "Món phở bò đậm đà với nước dùng trong vắt, thơm ngon đặc trưng của Hà Nội cổ",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop",
    cookTime: 180,
    difficulty: "Khó",
    servings: 4,
    rating: 4.8,
    reviewCount: 245,
    calories: 350,
    
    ingredients: [
      { name: "Xương bò", amount: "1kg" },
      { name: "Thịt bò tái", amount: "300g" },
      { name: "Bánh phở tươi", amount: "400g" },
      { name: "Hành tây", amount: "2 củ" },
      { name: "Gừng tươi", amount: "80g" },
      { name: "Quế", amount: "2 thanh" },
      { name: "Hoa hồi", amount: "3 bông" },
      { name: "Thảo quả", amount: "2 quả" },
      { name: "Hành lá", amount: "50g" },
      { name: "Giá đỗ", amount: "200g" },
      { name: "Rau thơm", amount: "1 bó" },
      { name: "Nước mắm", amount: "3 tbsp" },
      { name: "Muối", amount: "1 tsp" },
      { name: "Đường", amount: "1 tsp" }
    ],
    
    instructions: [
      "Rửa sạch xương bò, blanch qua nước sôi để loại bỏ tạp chất và mùi hôi. Sau đó rửa lại với nước lạnh.",
      "Nướng hành tây và gừng trên bếp gas hoặc lò nướng cho đến khi thơm và hơi cháy bề mặt.",
      "Rang các loại gia vị (quế, hoa hồi, thảo quả) trên chảo khô cho thơm, sau đó bọc trong túi vải.",
      "Cho xương vào nồi to, đổ nước ngập xương khoảng 3-4cm. Thêm hành tây, gừng nướng và túi gia vị.",
      "Đun sôi rồi hạ nhỏ lửa, ninh trong 2-3 tiếng. Vớt bọt thường xuyên để nước dùng trong.",
      "Nêm nước dùng với nước mắm, muối, đường vừa ăn. Lọc bỏ xác để được nước dùng trong vắt.",
      "Thái thịt bò tái mỏng, chuẩn bị rau thơm, giá đỗ, hành lá thái nhỏ.",
      "Luộc bánh phở qua nước sôi, cho vào tô. Đặt thịt bò tái lên trên.",
      "Chan nước dùng sôi vào tô, thịt bò sẽ chín tái. Rắc hành lá và ăn kèm rau thơm, giá đỗ."
    ],
    
    nutrition: {
      calories: 350,
      protein: "28g",
      carbs: "45g",
      fat: "8g"
    },
    
    chef: {
      name: "Chef Nguyễn Văn Minh",
      title: "Chuyên gia ẩm thực Việt",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=face",
      bio: "15 năm kinh nghiệm trong ẩm thực truyền thống Việt Nam, từng làm việc tại các nhà hàng 5 sao."
    },
    
    tags: ["Món chính", "Truyền thống", "Hà Nội", "Phở", "Bò", "Nước dùng", "Khó"]
  };

  const recipe = recipeData || defaultRecipe;
  const handlePlusView = async(id) =>{
    try {
      // Gọi API để tăng lượt xem
      await newRequest.post(`/api/recipes/plus/view/${id}`);
    } catch (error) {
      console.error('Lỗi khi tăng lượt xem:', error);
    }
  }

  useEffect(()=>{
    if(recipeId){
      handlePlusView(recipeId);
    }

  }, [recipeId]);

  // Handle rating change
  const handleRatingChange = (value) => {
    setUserRating(value);
    message.success(`Bạn đã đánh giá ${value} sao cho công thức này!`);
  };

  // Handle favorite toggle
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    message.success(isFavorited ? 'Đã bỏ khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.subtitle,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      message.success('Đã copy link công thức!');
    }
  };

  // Loading state
  if (loading) {
    return (
      <DetailContainer>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: '20px', fontSize: '1.1rem', color: '#666' }}>
            Đang tải công thức...
          </div>
        </div>
      </DetailContainer>
    );
  }
  
  return (
    <ResponsiveWrapper>
      <DetailContainer>
        {/* Header Section với Hero Image */}
        <HeaderSection>
          <HeroImage image={recipe.image}>
            <HeroContent>
              <RecipeTitle>{recipe.title}</RecipeTitle>
              <RecipeSubtitle>{recipe.subtitle}</RecipeSubtitle>
              
              <MetaInfo>
                <MetaItem>
                  <ClockCircleOutlined />
                  <span>{Math.floor(recipe.cookTime / 60)}h {recipe.cookTime % 60}m</span>
                </MetaItem>
                <MetaItem>
                  <FireOutlined />
                  <span>{recipe.difficulty}</span>
                </MetaItem>
                <MetaItem>
                  <TeamOutlined />
                  <span>{recipe.servings} người</span>
                </MetaItem>
                <MetaItem>
                  <StarOutlined />
                  <span>{recipe.rating} ({recipe.reviewCount} đánh giá)</span>
                </MetaItem>
              </MetaInfo>
            </HeroContent>
          </HeroImage>
        </HeaderSection>

        <ContentSection>
          {/* Main Content */}
          <MainContent>
            {/* Instructions */}
            <InstructionsSection>
              <SectionTitle>
                <BookOutlined />
                Hướng Dẫn Thực Hiện
              </SectionTitle>
              
              <StepsList>
                {recipe.instructions.map((step, index) => (
                  <StepItem key={index} index={index}>
                    <StepContent>{step}</StepContent>
                  </StepItem>
                ))}
              </StepsList>
            </InstructionsSection>

            {/* Chef Information */}
            <ChefSection>
              <SectionTitle>
                <CrownOutlined />
                Đầu Bếp
              </SectionTitle>
              
              <ChefInfo>
                <ChefAvatar 
                  src={recipe.chef.avatar} 
                  size={60}
                  icon={<UserOutlined />}
                />
                <ChefDetails>
                  <ChefName>{recipe.chef.name}</ChefName>
                  <ChefTitle>{recipe.chef.title}</ChefTitle>
                </ChefDetails>
              </ChefInfo>
              
              <ChefBio>{recipe.chef.bio}</ChefBio>
              
              <TagsSection>
                {recipe.tags.map((tag, index) => (
                  <RecipeTag key={index}>{tag}</RecipeTag>
                ))}
              </TagsSection>
            </ChefSection>
          </MainContent>

          {/* Sidebar */}
          <Sidebar>
            {/* Ingredients */}
            <IngredientsCard title="🥘 Nguyên Liệu">
              <IngredientsList>
                {recipe.ingredients.map((ingredient, index) => (
                  <IngredientItem key={index} index={index}>
                    <IngredientIcon />
                    <IngredientText>
                      <strong>{ingredient.amount}</strong> {ingredient.name}
                    </IngredientText>
                  </IngredientItem>
                ))}
              </IngredientsList>
            </IngredientsCard>

            {/* Nutrition */}
            <NutritionCard title="📊 Dinh Dưỡng (1 phần)">
              <NutritionGrid>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.calories}</NutritionValue>
                  <NutritionLabel>Calories</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.protein}</NutritionValue>
                  <NutritionLabel>Protein</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.carbs}</NutritionValue>
                  <NutritionLabel>Carbs</NutritionLabel>
                </NutritionItem>
                <NutritionItem>
                  <NutritionValue>{recipe.nutrition.fat}</NutritionValue>
                  <NutritionLabel>Chất béo</NutritionLabel>
                </NutritionItem>
              </NutritionGrid>
            </NutritionCard>

            {/* Rating & Actions */}
            <RatingSection>
              <RatingDisplay>
                <RatingValue>{recipe.rating}</RatingValue>
                <Rate 
                  disabled 
                  value={recipe.rating} 
                  style={{ color: '#ff8c00', fontSize: '1.2rem' }} 
                />
                <RatingCount>{recipe.reviewCount} đánh giá</RatingCount>
              </RatingDisplay>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px', fontWeight: '600', color: '#2d5016' }}>
                  Đánh giá của bạn:
                </div>
                <Rate 
                  value={userRating}
                  onChange={handleRatingChange}
                  style={{ color: '#ff8c00', fontSize: '1.2rem' }}
                />
              </div>

              <ActionButtons>
                <ActionButton 
                  primary
                  icon={<HeartOutlined />}
                  onClick={handleFavorite}
                  style={{ 
                    background: isFavorited ? 
                      'linear-gradient(135deg, #ff6b6b, #ff8e8e) !important' : 
                      'linear-gradient(135deg, #2d5016, #4a7c59) !important'
                  }}
                >
                  {isFavorited ? 'Đã yêu thích' : 'Yêu thích'}
                </ActionButton>
                
                <ActionButton 
                  icon={<ShareAltOutlined />}
                  onClick={handleShare}
                >
                  Chia sẻ
                </ActionButton>
              </ActionButtons>
            </RatingSection>
          </Sidebar>
        </ContentSection>
      </DetailContainer>
    </ResponsiveWrapper>
  );
};

export default RecipeDetailComponent;
