import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col } from 'antd';
import {
  HomePageContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  CTAButton,
  FeaturesSection,
  SectionTitle,
  SectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  PopularSection,
  RecipeGrid,
  RecipeCard,
  RecipeImage,
  RecipeContent,
  RecipeTitle,
  RecipeDescription,
  RecipeMeta,
  StatsSection,
  StatsGrid,
  StatCard,
  StatNumber,
  StatLabel,
  ResponsiveCol
} from './style';

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ recipes: 0, users: 0, shares: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Animation counter for stats
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const targetStats = { recipes: 1250, users: 8500, shares: 15000 };
      const increment = {
        recipes: targetStats.recipes / (duration / 50),
        users: targetStats.users / (duration / 50),
        shares: targetStats.shares / (duration / 50)
      };

      let current = { recipes: 0, users: 0, shares: 0 };
      const timer = setInterval(() => {
        current.recipes = Math.min(current.recipes + increment.recipes, targetStats.recipes);
        current.users = Math.min(current.users + increment.users, targetStats.users);
        current.shares = Math.min(current.shares + increment.shares, targetStats.shares);
        
        setStats({
          recipes: Math.floor(current.recipes),
          users: Math.floor(current.users),
          shares: Math.floor(current.shares)
        });

        if (
          current.recipes >= targetStats.recipes && 
          current.users >= targetStats.users && 
          current.shares >= targetStats.shares
        ) {
          clearInterval(timer);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const features = [
    {
      icon: '🔍',
      title: 'Tìm Công Thức',
      description: 'Khám phá hàng ngàn công thức từ khắp nơi trên thế giới. Tìm kiếm theo nguyên liệu, thời gian nấu, hoặc loại món ăn.'
    },
    {
      icon: '📝',
      title: 'Chia Sẻ Công Thức',
      description: 'Chia sẻ những món ăn yêu thích của bạn với cộng đồng. Tạo công thức riêng với hình ảnh và hướng dẫn chi tiết.'
    },
    {
      icon: '🤖',
      title: 'Gợi Ý AI',
      description: 'Nhận gợi ý thông minh từ AI dựa trên nguyên liệu có sẵn. Khám phá những kết hợp mới lạ và độc đáo.'
    },
    {
      icon: '❤️',
      title: 'Yêu Thích',
      description: 'Lưu lại những công thức ưa thích để nấu lại sau. Tổ chức bộ sưu tập công thức cá nhân của riêng bạn.'
    },
    {
      icon: '👥',
      title: 'Cộng Đồng',
      description: 'Kết nối với những người đam mê nấu ăn. Đánh giá, bình luận và học hỏi từ những đầu bếp khác.'
    },
    {
      icon: '📱',
      title: 'Dễ Sử Dụng',
      description: 'Giao diện thân thiện, sử dụng dễ dàng trên mọi thiết bị. Truy cập công thức mọi lúc, mọi nơi.'
    }
  ];

  const popularRecipes = [
    {
      title: 'Phở Bò Truyền Thống',
      description: 'Công thức phở bò đậm đà với nước dùng được ninh từ xương bò trong 12 tiếng.',
      time: '3 giờ',
      difficulty: 'Trung bình',
      rating: '4.9'
    },
    {
      title: 'Bánh Mì Việt Nam',
      description: 'Bánh mì giòn tan với nhân thịt, pate và rau sống tươi ngon.',
      time: '30 phút',
      difficulty: 'Dễ',
      rating: '4.8'
    },
    {
      title: 'Cơm Tấm Sài Gòn',
      description: 'Cơm tấm thơm ngon với sườn nướng, chả trứng và nước mắm chua ngọt.',
      time: '45 phút',
      difficulty: 'Dễ',
      rating: '4.7'
    },
    {
      title: 'Bún Bò Huế',
      description: 'Món bún đặc sản Huế với nước dùng cay nồng và thịt bò tươi ngon.',
      time: '2 giờ',
      difficulty: 'Khó',
      rating: '4.9'
    }
  ];

  return (
    <HomePageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Khám Phá Thế Giới Ẩm Thực</HeroTitle>
          <HeroSubtitle>
            Chia sẻ công thức, khám phá hương vị và kết nối với cộng đồng đam mê nấu ăn
          </HeroSubtitle>
          <CTAButton onClick={() => navigate('/recipes')}>
            Bắt Đầu Nấu Ăn 🍳
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle>Tại Sao Chọn Recipe Sharing?</SectionTitle>
        <SectionSubtitle>
          Nền tảng chia sẻ công thức hàng đầu với những tính năng độc đáo và cộng đồng sôi động
        </SectionSubtitle>
        
        <FeatureGrid gutter={[30, 30]} justify="center">
          {features.map((feature, index) => (
            <ResponsiveCol key={index} xs={24} sm={12} md={8} lg={8}>
              <FeatureCard>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            </ResponsiveCol>
          ))}
        </FeatureGrid>
      </FeaturesSection>

      {/* Popular Recipes Section */}
      <PopularSection>
        <SectionTitle style={{ color: 'white' }}>Công Thức Phổ Biến</SectionTitle>
        <SectionSubtitle style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Khám phá những món ăn được yêu thích nhất từ cộng đồng
        </SectionSubtitle>
        
        <RecipeGrid gutter={[30, 30]} justify="center">
          {popularRecipes.map((recipe, index) => (
            <ResponsiveCol key={index} xs={24} sm={12} md={6} lg={6}>
              <RecipeCard onClick={() => navigate('/recipes')}>
                <RecipeImage />
                <RecipeContent>
                  <RecipeTitle>{recipe.title}</RecipeTitle>
                  <RecipeDescription>{recipe.description}</RecipeDescription>
                  <RecipeMeta>
                    <span>⏱️ {recipe.time}</span>
                    <span>⭐ {recipe.rating}</span>
                  </RecipeMeta>
                </RecipeContent>
              </RecipeCard>
            </ResponsiveCol>
          ))}
        </RecipeGrid>
      </PopularSection>

      {/* Stats Section */}
      <StatsSection>
        <SectionTitle>Con Số Ấn Tượng</SectionTitle>
        <SectionSubtitle>
          Cộng đồng Recipe Sharing đang phát triển mạnh mẽ mỗi ngày
        </SectionSubtitle>
        
        <StatsGrid gutter={[30, 30]} justify="center">
          <ResponsiveCol xs={24} sm={8} md={8}>
            <StatCard>
              <StatNumber>{stats.recipes.toLocaleString()}</StatNumber>
              <StatLabel>Công Thức</StatLabel>
            </StatCard>
          </ResponsiveCol>
          <ResponsiveCol xs={24} sm={8} md={8}>
            <StatCard>
              <StatNumber>{stats.users.toLocaleString()}</StatNumber>
              <StatLabel>Người Dùng</StatLabel>
            </StatCard>
          </ResponsiveCol>
          <ResponsiveCol xs={24} sm={8} md={8}>
            <StatCard>
              <StatNumber>{stats.shares.toLocaleString()}</StatNumber>
              <StatLabel>Lượt Chia Sẻ</StatLabel>
            </StatCard>
          </ResponsiveCol>
        </StatsGrid>
      </StatsSection>
    </HomePageContainer>
  );
};

export default HomePage;
