import React from 'react'
import CardComponent from '../../components/CardComponent/CardComponent';

function TestPage() {
    // Dữ liệu mẫu - lưu ý CardComponent dùng prop "movie" chứ không phải "recipe"
    const sampleRecipes = [
      {
        id: 1,
        title: "Phở Bò Truyền Thống",
        poster_url: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=220&fit=crop",
        category: "Món chính",
        chef: "Chef Minh",
        cooking_time: "180",
        kind: "Món Việt", // fallback cho category
        director: "Bà Ngoại", // fallback cho chef
        duration: "120" // fallback cho cooking_time
      },
      {
        id: 2,
        title: "Bánh Mì Việt Nam",
        poster_url: "https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=300&h=220&fit=crop",
        category: "Ăn sáng",
        chef: "Cô Lan",
        cooking_time: "30",
        kind: "Bánh mì",
        director: "Cô Lan",
        duration: "25"
      },
      {
        id: 3,
        title: "Cơm Tấm Sài Gòn",
        poster_url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=220&fit=crop",
        category: "Món chính",
        chef: "Bác Sáu",
        cooking_time: "45",
        kind: "Cơm",
        director: "Bác Sáu", 
        duration: "40"
      }
    ];
  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#f8fffe',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ 
          color: '#2d5016',
          fontSize: '2.5rem',
          marginBottom: '10px',
          fontWeight: '700'
        }}>
          🍳 Test CardComponent
        </h1>
        <p style={{ 
          color: '#4a7c59',
          fontSize: '1.2rem'
        }}>
          Xem CardComponent hoạt động với theme recipe sharing
        </p>
      </div>

      {/* Grid Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {sampleRecipes.map(recipe => (
          <div key={recipe.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <CardComponent 
              movie={recipe} // Lưu ý: CardComponent dùng prop "movie"
              onClick={() => {
                console.log('Recipe clicked:', recipe.title);
                alert(`Bạn click vào: ${recipe.title}`);
              }}
            />
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div style={{
        textAlign: 'center',
        marginTop: '50px',
        padding: '30px',
        backgroundColor: 'rgba(45, 80, 22, 0.1)',
        borderRadius: '15px',
        maxWidth: '600px',
        margin: '50px auto 0'
      }}>
        <h3 style={{ color: '#2d5016', marginBottom: '15px' }}>
          ✨ Hướng dẫn sử dụng:
        </h3>
        <p style={{ color: '#4a7c59', lineHeight: '1.6' }}>
          • Hover vào card để xem thông tin chi tiết<br/>
          • Click "Xem Công Thức" để mở modal<br/>
          • Click "Yêu Thích ❤️" để thêm vào favorites<br/>
          • Responsive design cho mọi thiết bị
        </p>
      </div>
    </div>
  )
}

export default TestPage