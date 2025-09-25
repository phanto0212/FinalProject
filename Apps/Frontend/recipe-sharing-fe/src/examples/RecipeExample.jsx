import React from 'react';
import CardComponent from '../components/CardComponent/CardComponent';

const RecipeExample = () => {
  // Dữ liệu mẫu các công thức
  const sampleRecipes = [
    {
      id: 1,
      title: "Phở Bò Truyền Thống",
      image_url: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop",
      category: "Món chính",
      author: "Chef Minh",
      cooking_time: 180,
      difficulty: "Khó",
      ingredients: `• Xương bò: 2kg
• Thịt bò: 500g  
• Bánh phở: 500g
• Hành tây: 2 củ
• Gừng: 100g
• Đinh hương, hồi, quế
• Nước mắm, muối, đường`,
      instructions: `Bước 1: Làm sạch xương bò, chần qua nước sôi
Bước 2: Ninh nước dùng với xương, hành, gừng trong 4-6 tiếng
Bước 3: Chuẩn bị thịt bò thái lát mỏng
Bước 4: Trụng bánh phở qua nước sôi
Bước 5: Xếp bánh, thịt vào tô, chan nước dùng nóng
Bước 6: Thêm rau thơm và thưởng thức`
    },
    {
      id: 2,
      title: "Bánh Mì Việt Nam",
      image_url: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=300&h=200&fit=crop",
      category: "Ăn sáng",
      author: "Cô Lan",
      cooking_time: 30,
      difficulty: "Dễ",
      ingredients: `• Bánh mì: 2 ổ
• Pate gan: 100g
• Thịt nguội: 150g
• Rau cải: 100g
• Dưa chua, cà rót
• Tương ớt, mayonnaise`,
      instructions: `Bước 1: Nướng bánh mì cho giòn
Bước 2: Rửa sạch rau cải, để ráo
Bước 3: Bổ đôi bánh mì, phết pate
Bước 4: Xếp thịt, rau, dưa chua vào bánh
Bước 5: Thêm tương ớt theo khẩu vị
Bước 6: Gói bánh và thưởng thức`
    },
    {
      id: 3,
      title: "Cơm Tấm Sài Gòn",
      image_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
      category: "Món chính", 
      author: "Bác Sáu",
      cooking_time: 45,
      difficulty: "Trung bình",
      ingredients: `• Cơm tấm: 300g
• Sườn heo: 400g
• Trứng: 2 quả
• Đậu hũ: 100g
• Dưa chua
• Nước mắm chua ngọt`,
      instructions: `Bước 1: Ướp sườn với nước mắm, đường, tỏi băm
Bước 2: Nướng sườn trên than hoa cho thơm
Bước 3: Làm chả trứng từ trứng và đậu hũ
Bước 4: Nấu cơm tấm dẻo vừa
Bước 5: Pha nước mắm chua ngọt
Bước 6: Trình bày và thưởng thức`
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ 
        textAlign: 'center',
        color: '#2d5016',
        marginBottom: '30px',
        fontSize: '2.5rem'
      }}>
        🍳 Các Món Ăn Phổ Biến
      </h1>
      
      {/* Grid hiển thị cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {sampleRecipes.map(recipe => (
          <CardComponent 
            key={recipe.id}
            recipe={recipe}
            onClick={() => {
              console.log('Clicked recipe:', recipe.title);
              // Có thể navigate tới trang chi tiết hoặc làm gì đó khác
            }}
          />
        ))}
      </div>

      {/* Responsive cho mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 0 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RecipeExample;