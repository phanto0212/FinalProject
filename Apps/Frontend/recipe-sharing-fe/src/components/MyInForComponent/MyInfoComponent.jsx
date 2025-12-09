import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  message, 
  Upload, 
  DatePicker, 
  Select,
  Switch,
  Divider,
  Modal,
  Rate
} from 'antd';
import {
  UserOutlined,
  CameraOutlined,
  EditOutlined,
  SettingOutlined,
  TrophyOutlined,
  HeartOutlined,
  EyeOutlined,
  StarOutlined,
  ClockCircleOutlined,
  FireOutlined,
  TeamOutlined,
  PlusOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  SafetyOutlined,
  BellOutlined,
  GlobalOutlined,
  LockOutlined,
  BookOutlined,
  DeleteOutlined
} from '@ant-design/icons';

import {
  ProfileContainer,
  ProfileHeader,
  HeaderContent,
  AvatarSection,
  ProfileAvatar,
  AvatarUpload,
  UserInfo,
  UserName,
  UserBio,
  UserStats,
  StatItem,
  ContentLayout,
  Sidebar,
  MainContent,
  ProfileTabs,
  SidebarCard,
  AchievementItem,
  AchievementIcon,
  AchievementInfo,
  RecipesGrid,
  RecipeCard,
  RecipeTitle,
  RecipeMeta,
  RecipeStats,
  ProfileForm,
  ActionButton,
  SettingsSection,
  EmptyState,
  ResponsiveWrapper
} from './style';
import newRequest from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const { TabPane } = ProfileTabs;
const { TextArea } = Input;
const { Option } = Select;

const MyInfoComponent = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState(''); 
  const [token, setToken] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [quickStats, setQuickStats] = useState({
    averageRating: 0,
    totalViews: 0,
    popularRecipe: '',
    memberSince: ''
  });
  const navigate = useNavigate();
  // Sample user data
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    avatar: '',
    stats: {
      recipes: 0,
      followers: 0,
      following: 0,
      likes: 0
    }
  });
useEffect(()=>{
setToken(localStorage.getItem('authToken') || '')
},[]);

  const getInformation = async () =>{
 try{
   const response = await newRequest.get('/api/auth/get/info',
    {headers:{
      Authorization: `Bearer ${token}`
    }});
    if(response.status === 200){
      console.log("User Information:", response.data.myInfo);
      const myInfo = response.data.myInfo || {};
      setUserData({
        name: myInfo.name || '',
        bio: myInfo.bio || '',
        avatar: myInfo.avatar || '',
        email: myInfo.email || '',
        phone: myInfo.phone || '',
        location: myInfo.location || '',
        stats: {
          recipes: myInfo.stats?.recipes || 0,
          followers: myInfo.stats?.followers || 0,
          following: myInfo.stats?.following || 0,
          likes: myInfo.stats?.likes || 0
        }
      });
    }
 }catch(error){
    console.log("Error fetching user information:", error);
  }
 };

  useEffect(() => {
    if (token) {
      getInformation();
      loadAchievements();
      loadQuickStats();
    }
  }, [token]);

  // Load achievements from API
  const loadAchievements = async () => {
    try {
      const response = await newRequest.get('/api/recipes/get/achievements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        const data = response.data.achievements || {};
        
        // Transform API data thành format hiển thị
        const achievementsList = [];
        
        if (data.totalRecipes) {
          achievementsList.push({
            icon: '🏆',
            title: 'Master Chef',
            description: `${data.totalRecipes} công thức được chia sẻ`
          });
        }
        
        if (data.averageRating) {
          achievementsList.push({
            icon: '⭐',
            title: 'Top Rated',
            description: `Đánh giá trung bình ${data.averageRating}/5`
          });
        }
        
        if (data.trendingCount) {
          achievementsList.push({
            icon: '🔥',
            title: 'Trending Cook',
            description: `${data.trendingCount} công thức trending`
          });
        }
        
        if (data.totalLikes) {
          achievementsList.push({
            icon: '💝',
            title: 'Community Favorite',
            description: `${data.totalLikes.toLocaleString()} lượt yêu thích`
          });
        }
        
        setAchievements(achievementsList);
      }
    } catch (error) {
      console.log("Error fetching achievements:", error);
      // Không hiển thị gì nếu API lỗi
      setAchievements([]);
    }
  };

  // Load quick stats from API
  const loadQuickStats = async () => {
    try {
      const response = await newRequest.get('/api/recipes/quick-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        const stats = response.data.stats || {};
        setQuickStats({
          averageRating: stats.averageRating || 0,
          totalViews: stats.totalViews || 0,
          popularRecipe: stats.popularRecipe || '',
          memberSince: stats.memberSince || ''
        });
      }
    } catch (error) {
      console.log("Error fetching quick stats:", error);
      // Fallback data nếu API lỗi
      setQuickStats({
        averageRating: 4.8,
        totalViews: 12487,
        popularRecipe: 'Phở Bò',
        memberSince: 'Tháng 3, 2020'
      });
    }
  };

  // // Sample recipes
  // const userRecipes = [
  //   {
  //     id: 1,
  //     title: 'Phở Bò Hà Nội',
  //     image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop',
  //     rating: 4.8,
  //     views: 2341,
  //     likes: 189,
  //     time: '3h',
  //     difficulty: 'Khó'
  //   },
  //   {
  //     id: 2,
  //     title: 'Bánh Mì Thịt Nướng',
  //     image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop',
  //     rating: 4.6,
  //     views: 1876,
  //     likes: 142,
  //     time: '45m',
  //     difficulty: 'Dễ'
  //   },
  //   {
  //     id: 3,
  //     title: 'Bún Bò Huế',
  //     image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
  //     rating: 4.9,
  //     views: 3120,
  //     likes: 267,
  //     time: '2h',
  //     difficulty: 'Trung bình'
  //   },
  //   {
  //     id: 4,
  //     title: 'Gỏi Cuốn Tôm Thịt',
  //     image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&h=200&fit=crop',
  //     rating: 4.7,
  //     views: 1654,
  //     likes: 128,
  //     time: '30m',
  //     difficulty: 'Dễ'
  //   }
  // ];
  const loadUserRecipes = async () => {
    try {
      const response = await newRequest.get('/api/recipes/get/all/recipe/user', {
        headers: {  
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUserRecipes(response.data.userRecipes || []);
      }
    } catch (error) {
      console.log("Error fetching user recipes:", error);
    }
  };
  useEffect(() => {
    if (token) {
      loadUserRecipes();
      loadSavedRecipes();
      loadAchievements();
      loadQuickStats();
    }
  }, [token]);

  // Load saved recipes from API
  const loadSavedRecipes = async () => {
    setLoadingSaved(true);
    try {
      const response = await newRequest.get('/api/recipes/get/saved/recipes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setSavedRecipes(response.data.savedRecipes || []);
      }
    } catch (error) {
      console.log("Error fetching saved recipes:", error);
      setSavedRecipes([]);
    } finally {
      setLoadingSaved(false);
    }
  };

  // Handle unsave recipe
  const handleUnsaveRecipe = async (recipeId) => {
    try {
      const response = await newRequest.post(`/api/recipes/save/recipe/${recipeId}`,{}  , {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        message.success('Đã bỏ lưu công thức!');
        // Reload saved recipes
        loadSavedRecipes();
      }
    } catch (error) {
      console.log("Error unsaving recipe:", error);
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  // Handle form submission
  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setUserData({ ...userData, ...values });
        setEditMode(false);
        setLoading(false);
        message.success('Cập nhật thông tin thành công!');
      }, 1000);
      const response  = await newRequest.post('/api/auth/recipe/change/info', 
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          location: values.location,
          bio: values.bio
        }
        , {
        headers: { Authorization: `Bearer ${token}` }
      }   
      );
      if (response.status === 200) {
        alert('Cập nhật thông tin thành công!');
      }
    } catch (error) {
      setLoading(false);
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async ({ file, onSuccess, onError }) => {
    try {
       const formData = new FormData();
    formData.append("file", file); // key phải trùng với DTO

    const response = await newRequest.post(
      '/api/recipes/upload/image',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
      if (response.status === 200) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserData({ ...userData, avatar: e.target.result });
          setAvatarUrl(e.target.result);
          onSuccess();
          message.success('Cập nhật ảnh đại diện thành công!');
        };
        reader.readAsDataURL(file);
      }
      // Simulate upload
      // setTimeout(() => {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     setUserData({ ...userData, avatar: e.target.result });
      //     setAvatarUrl(e.target.result);
      //     onSuccess();
      //     message.success('Cập nhật ảnh đại diện thành công!');
      //   };
      //   reader.readAsDataURL(file);
      // }, 1000);
    } catch (error) {
      onError(error);
      message.error('Upload ảnh thất bại!');
    }
  };

  // Initialize form values
  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData, form]);

  return (
    <ResponsiveWrapper style={{marginTop: '74px'}}>
      <ProfileContainer>
        {/* Profile Header */}
        <ProfileHeader>
          <HeaderContent>
            <AvatarSection>
              <ProfileAvatar
                src={userData.avatar}
                icon={<UserOutlined />}
              />
              <AvatarUpload
                customRequest={handleAvatarUpload}
                showUploadList={false}
                accept="image/*"
              >
                <CameraOutlined />
              </AvatarUpload>
            </AvatarSection>

            <UserInfo>
              <UserName>{userData.name}</UserName>
              <UserBio>{userData.bio}</UserBio>
              
              <UserStats>
                <StatItem>
                  <span className="number">{userData?.stats?.recipes || 0}</span>
                  <span className="label">Công thức</span>
                </StatItem>
                <StatItem>
                  <span className="number">{userData?.stats?.followers || 0}</span>
                  <span className="label">Người theo dõi</span>
                </StatItem>
                <StatItem>
                  <span className="number">{userData?.stats?.following || 0}</span>
                  <span className="label">Đang theo dõi</span>
                </StatItem>
                <StatItem>
                  <span className="number">{userData?.stats?.likes || 0}</span>
                  <span className="label">Lượt thích</span>
                </StatItem>
              </UserStats>
            </UserInfo>

            <div style={{ marginLeft: 'auto' }}>
              <ActionButton 
                primary={!editMode}
                onClick={() => setEditMode(!editMode)}
                icon={<EditOutlined />}
              >
                {editMode ? 'Hủy chỉnh sửa' : 'Chỉnh sửa'}
              </ActionButton>
            </div>
          </HeaderContent>
        </ProfileHeader>

        <ContentLayout>
          {/* Sidebar */}
          <Sidebar>
            {/* Achievements */}
            <SidebarCard 
              title={
                <>
                  <TrophyOutlined />
                  Thành tích
                </>
              }
            >
              {achievements.map((achievement, index) => (
                <AchievementItem key={index}>
                  <AchievementIcon>
                    {achievement.icon}
                  </AchievementIcon>
                  <AchievementInfo>
                    <div className="title">{achievement.title}</div>
                    <div className="description">{achievement.description}</div>
                  </AchievementInfo>
                </AchievementItem>
              ))}
            </SidebarCard>

            {/* Quick Stats */}
            <SidebarCard 
              title={
                <>
                  <StarOutlined />
                  Thống kê nhanh
                </>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Đánh giá trung bình:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Rate disabled value={quickStats.averageRating} style={{ fontSize: '14px' }} />
                    <span style={{ color: '#ff8c00', fontWeight: '600' }}>{quickStats.averageRating.toFixed(1)}</span>
                  </div>
                </div>
                <Divider style={{ margin: '5px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tổng lượt xem:</span>
                  <span style={{ color: '#2d5016', fontWeight: '600' }}>{quickStats.totalViews.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Công thức phổ biến nhất:</span>
                  <span style={{ color: '#2d5016', fontWeight: '600' }}>{quickStats.popularRecipe || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Thành viên từ:</span>
                  <span style={{ color: '#2d5016', fontWeight: '600' }}>{quickStats.memberSince || 'N/A'}</span>
                </div>
              </div>
            </SidebarCard>
          </Sidebar>

          {/* Main Content */}
          <MainContent>
            <ProfileTabs 
              activeKey={activeTab}
              onChange={setActiveTab}
            >
              {/* Profile Tab */}
              <TabPane tab="Thông tin cá nhân" key="profile">
                <ProfileForm
                  form={form}
                  layout="vertical"
                  onFinish={handleUpdateProfile}
                  disabled={!editMode}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <Form.Item
                      label="Họ và tên"
                      name="name"
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />}
                        placeholder="Nhập họ và tên"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined />}
                        placeholder="Nhập email"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                    >
                      <Input 
                        prefix={<PhoneOutlined />}
                        placeholder="Nhập số điện thoại"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Địa chỉ"
                      name="location"
                    >
                      <Input 
                        prefix={<EnvironmentOutlined />}
                        placeholder="Nhập địa chỉ"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="bio"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Chia sẻ về bản thân, kinh nghiệm nấu ăn..."
                      maxLength={500}
                      showCount
                    />
                  </Form.Item>

                  {editMode && (
                    <Form.Item>
                      <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setEditMode(false)}>
                          Hủy
                        </Button>
                        <Button 
                          type="primary" 
                          htmlType="submit"
                          loading={loading}
                        >
                          Cập nhật thông tin
                        </Button>
                      </div>
                    </Form.Item>
                  )}
                </ProfileForm>
              </TabPane>

              {/* My Recipes Tab */}
              <TabPane tab="Công thức của tôi" key="recipes">
                <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#2d5016' }}>
                    Công thức của tôi ({userRecipes.length})
                  </h3>
                  {/* <ActionButton icon={<PlusOutlined />}>
                    Thêm công thức mới
                  </ActionButton> */}
                </div>

                <RecipesGrid>
                  {userRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      cover={<img alt={recipe.title} src={recipe.image} />}
                      hoverable
                      onClick={() =>{navigate(`/recipe/detail/${recipe.id}`)}}
                    >
                      <RecipeTitle>{recipe.title}</RecipeTitle>
                      <RecipeMeta>
                        <Rate disabled value={recipe.rating} style={{ fontSize: '12px' }} />
                        <span style={{ color: '#ff8c00', fontWeight: '600' }}>
                          {recipe.rating}
                        </span>
                      </RecipeMeta>
                      <RecipeStats>
                        <div className="stat-item">
                          <EyeOutlined />
                          <span>{recipe.views}</span>
                        </div>
                        <div className="stat-item">
                          <HeartOutlined />
                          <span>{recipe.likes}</span>
                        </div>
                        <div className="stat-item">
                          <ClockCircleOutlined />
                          <span>{recipe.time}</span>
                        </div>
                        <div className="stat-item">
                          <FireOutlined />
                          <span>{recipe.difficulty}</span>
                        </div>
                      </RecipeStats>
                    </RecipeCard>
                  ))}
                </RecipesGrid>
              </TabPane>

              {/* Saved Recipes Tab */}
              <TabPane tab="Công thức đã lưu" key="saved">
                <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#2d5016', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOutlined />
                    Công thức đã lưu ({savedRecipes.length})
                  </h3>
                </div>

                {loadingSaved ? (
                  <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <span>Đang tải...</span>
                  </div>
                ) : savedRecipes.length === 0 ? (
                  <EmptyState>
                    <div className="empty-icon">📚</div>
                    <h4>Chưa có công thức đã lưu</h4>
                    <p>Bạn chưa lưu công thức nào. Hãy khám phá và lưu các công thức yêu thích!</p>
                  </EmptyState>
                ) : (
                  <RecipesGrid>
                    {savedRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        cover={<img alt={recipe.title} src={recipe.image || recipe.imageUrl || recipe.recipeImage} />}
                        hoverable
                        onClick={() =>{navigate(`/recipe/detail/${recipe.id}`)}}
                        actions={[
                          <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnsaveRecipe(recipe.id);
                            }}
                          >
                            Bỏ lưu
                          </Button>
                        ]}
                      >
                        <RecipeTitle>{recipe.title}</RecipeTitle>
                        <RecipeMeta>
                          <Rate disabled value={recipe.rating || 0} style={{ fontSize: '12px' }} />
                          <span style={{ color: '#ff8c00', fontWeight: '600' }}>
                            {recipe.rating || 0}
                          </span>
                        </RecipeMeta>
                        <RecipeStats>
                          <div className="stat-item">
                            <EyeOutlined />
                            <span>{recipe.views || 0}</span>
                          </div>
                          <div className="stat-item">
                            <HeartOutlined />
                            <span>{recipe.likes || 0}</span>
                          </div>
                          <div className="stat-item">
                            <ClockCircleOutlined />
                            <span>{recipe.time || recipe.cookTime || 'N/A'}</span>
                          </div>
                          <div className="stat-item">
                            <FireOutlined />
                            <span>{recipe.difficulty || 'N/A'}</span>
                          </div>
                        </RecipeStats>
                        {recipe.author && (
                          <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
                            <UserOutlined /> {recipe.author.name || recipe.authorName || 'Ẩn danh'}
                          </div>
                        )}
                      </RecipeCard>
                    ))}
                  </RecipesGrid>
                )}
              </TabPane>

              {/* Settings Tab */}
              <TabPane tab="Cài đặt" key="settings">
                <SettingsSection>
                  <div className="section-title">
                    <SafetyOutlined />
                    Bảo mật tài khoản
                  </div>
                  <Form layout="vertical">
                    <Form.Item label="Mật khẩu hiện tại">
                      <Input.Password 
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </Form.Item>
                    <Form.Item label="Mật khẩu mới">
                      <Input.Password 
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu mới"
                      />
                    </Form.Item>
                    <Form.Item label="Xác nhận mật khẩu mới">
                      <Input.Password 
                        prefix={<LockOutlined />}
                        placeholder="Xác nhận mật khẩu mới"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary">Đổi mật khẩu</Button>
                    </Form.Item>
                  </Form>
                </SettingsSection>

                <SettingsSection>
                  <div className="section-title">
                    <BellOutlined />
                    Thông báo
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#2d5016' }}>Email thông báo</div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>Nhận thông báo qua email khi có hoạt động mới</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#2d5016' }}>Thông báo push</div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>Nhận thông báo trực tiếp trên trình duyệt</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#2d5016' }}>Thông báo marketing</div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>Nhận thông tin về các chương trình khuyến mãi</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </SettingsSection>

                <SettingsSection>
                  <div className="section-title">
                    <GlobalOutlined />
                    Quyền riêng tư
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#2d5016' }}>Hồ sơ công khai</div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>Cho phép mọi người xem hồ sơ của bạn</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#2d5016' }}>Hiển thị email</div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>Cho phép người khác thấy email của bạn</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </SettingsSection>
              </TabPane>
            </ProfileTabs>
          </MainContent>
        </ContentLayout>
      </ProfileContainer>
    </ResponsiveWrapper>
  );
};

export default MyInfoComponent;
