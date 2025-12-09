import React from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import styled from 'styled-components';

const TestPageContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, 
    rgba(45, 80, 22, 0.05) 0%,
    rgba(255, 140, 0, 0.05) 50%,
    rgba(45, 80, 22, 0.05) 100%
  );
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #2d5016;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TestPage = () => {
  // Sample data cho nhiều cards
  const sampleRecipes = [
    {
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
    },
    {
      id: 2,
      title: "Bánh Mì Thịt Nướng Sài Gòn",
      description: "Bánh mì giòn rụm với thịt nướng thơm lừng, rau răm, dưa leo và nước sốt đặc biệt. Hương vị đậm đà của miền Nam.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      category: "Món ăn nhẹ",
      cookingTime: "45 phút",
      difficulty: "Trung bình",
      rating: 4.6,
      reviewCount: 89,
      views: 1520,
      comments: 28,
      chef: {
        name: "Chef Thu Hương",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=80&h=80&fit=crop&crop=face",
        isVerified: true
      },
      tags: ["Sài Gòn", "Đường phố", "Nướng"]
    },
    {
      id: 3,
      title: "Salad Tôm Bơ Kiểu Thái",
      description: "Salad tươi mát với tôm tích, bơ chín mềm, rau xanh và nước sốt chua ngọt kiểu Thái. Món ăn healthy và bổ dưỡng.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      category: "Món healthy",
      cookingTime: "20 phút",
      difficulty: "Dễ",
      rating: 4.7,
      reviewCount: 124,
      views: 1890,
      comments: 32,
      chef: {
        name: "Chef Minh Tuấn",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        isVerified: false
      },
      tags: ["Thái Lan", "Healthy", "Tôm"]
    },
    {
      id: 4,
      title: "Mì Quảng Gà Tôm",
      description: "Đặc sản miền Trung với sợi mì dai ngon, nước dùng đậm đà từ xương gà, tôm tươi và các loại rau thơm truyền thống.",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop",
      category: "Món chính",
      cookingTime: "2 giờ",
      difficulty: "Khó",
      rating: 4.9,
      reviewCount: 201,
      views: 3200,
      comments: 67,
      chef: {
        name: "Chef Đức Anh",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        isVerified: true
      },
      tags: ["Miền Trung", "Quảng Nam", "Đặc sản"]
    }
  ];

  return (
    <TestPageContainer>
      <PageTitle>🍜 Recipe Cards Test Page</PageTitle>
      <CardsContainer>
        {sampleRecipes.map((recipe) => (
          <CardComponent key={recipe.id} recipe={recipe} />
        ))}
      </CardsContainer>
    </TestPageContainer>
  );
};

export default TestPage;