import React, { useState } from 'react';
import { Rate, Button, Avatar, Tag } from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  ClockCircleOutlined,
  FireOutlined,
  UserOutlined,
  EyeOutlined,
  CommentOutlined
} from '@ant-design/icons';
import {
  CardContainer,
  CardWrapper,
  ImageSection,
  RecipeImage,
  ImageOverlay,
  SaveButton,
  ShareButton,
  ContentSection,
  Header,
  Title,
  Description,
  TagsContainer,
  CategoryTag,
  MetaSection,
  MetaItem,
  MetaIcon,
  MetaText,
  ChefSection,
  ChefAvatar,
  ChefInfo,
  ChefName,
  ChefBadge,
  RatingSection,
  RatingStars,
  RatingCount,
  ActionSection,
  ViewButton,
  CommentButton,
  StatsSection,
  StatItem
} from './style';

const CardComponent = ({ 
  recipe = {
    id: 1,
    title: "Phở Bò Hà Nội Đặc Biệt",
    description: "Món phở bò truyền thống với nước dùng trong vắt, thơm ngon từ xương bò ninh nhiều giờ. Đi kèm với thịt bò tái, chín và các loại rau thơm đặc trưng.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop",
    category: "Món chính",
    cookingTime: "3 giờ",
    difficulty: "Khó",
    rating: 4.8,
    reviewCount: 156,
    views: 2340,
    comments: 45,
    chef: {
      name: "Chef Minh Anh",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&crop=face",
      isVerified: true
    },
    tags: ["Việt Nam", "Truyền thống", "Nước dùng"]
  }
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // Logic chia sẻ
    console.log('Share recipe:', recipe.title);
  };

  const handleView = () => {
    // Logic xem chi tiết
    console.log('View recipe:', recipe.id);
  };

  const handleComment = () => {
    // Logic bình luận
    console.log('Comment on recipe:', recipe.id);
  };

  return (
    <CardContainer>
      <CardWrapper>
        <ImageSection>
          <RecipeImage src={recipe.image} alt={recipe.title} />
          <ImageOverlay>
            <SaveButton 
              $isSaved={isSaved}
              onClick={handleSave}
            >
              {isSaved ? <HeartFilled /> : <HeartOutlined />}
            </SaveButton>
            <ShareButton onClick={handleShare}>
              <ShareAltOutlined />
            </ShareButton>
          </ImageOverlay>
        </ImageSection>

        <ContentSection>
          <Header>
            <Title>{recipe.title}</Title>
            <Description>{recipe.description}</Description>
          </Header>

          <TagsContainer>
            <CategoryTag color="green">{recipe.category}</CategoryTag>
            {recipe.tags.map((tag, index) => (
              <CategoryTag key={index} color="orange">{tag}</CategoryTag>
            ))}
          </TagsContainer>

          <MetaSection>
            <MetaItem>
              <MetaIcon>
                <ClockCircleOutlined />
              </MetaIcon>
              <MetaText>{recipe.cookingTime}</MetaText>
            </MetaItem>
            <MetaItem>
              <MetaIcon>
                <FireOutlined />
              </MetaIcon>
              <MetaText>{recipe.difficulty}</MetaText>
            </MetaItem>
            <MetaItem>
              <MetaIcon>
                <EyeOutlined />
              </MetaIcon>
              <MetaText>{recipe.views.toLocaleString()} lượt xem</MetaText>
            </MetaItem>
          </MetaSection>

          <ChefSection>
            <ChefAvatar 
              src={recipe.chef.avatar} 
              size={40}
              icon={<UserOutlined />}
            />
            <ChefInfo>
              <ChefName>
                {recipe.chef.name}
                {recipe.chef.isVerified && (
                  <ChefBadge>✓</ChefBadge>
                )}
              </ChefName>
            </ChefInfo>
          </ChefSection>

          <RatingSection>
            <RatingStars>
              <Rate 
                disabled 
                value={recipe.rating} 
                allowHalf
                style={{ fontSize: '16px', color: '#ff8c00' }}
              />
            </RatingStars>
            <RatingCount>
              {recipe.rating} ({recipe.reviewCount} đánh giá)
            </RatingCount>
          </RatingSection>

          <ActionSection>
            <ViewButton onClick={handleView}>
              <EyeOutlined />
              <span>Xem công thức</span>
            </ViewButton>
            <CommentButton onClick={handleComment}>
              <CommentOutlined />
              <span>{recipe.comments}</span>
            </CommentButton>
          </ActionSection>
        </ContentSection>
      </CardWrapper>
    </CardContainer>
  );
};

export default CardComponent;