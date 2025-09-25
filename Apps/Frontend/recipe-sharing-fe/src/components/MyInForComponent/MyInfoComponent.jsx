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
  LockOutlined
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

const { TabPane } = ProfileTabs;
const { TextArea } = Input;
const { Option } = Select;

const MyInfoComponent = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Sample user data
  const [userData, setUserData] = useState({
    name: 'Nguyễn Minh Châu',
    email: 'minhaau.chef@gmail.com',
    phone: '0901 234 567',
    bio: 'Đầu bếp với 8 năm kinh nghiệm trong ẩm thực Việt Nam. Yêu thích tạo ra những món ăn truyền thống với hương vị hiện đại.',
    location: 'TP. Hồ Chí Minh',
    joinDate: '2020-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=200&h=200&fit=crop&crop=face',
    stats: {
      recipes: 42,
      followers: 1284,
      following: 156,
      likes: 3247
    }
  });

  // Sample achievements
  const achievements = [
    {
      icon: '🏆',
      title: 'Master Chef',
      description: '50+ công thức được yêu thích'
    },
    {
      icon: '⭐',
      title: 'Top Rated',
      description: 'Đánh giá trung bình 4.8/5'
    },
    {
      icon: '🔥',
      title: 'Trending Cook',
      description: '10 công thức trending'
    },
    {
      icon: '💝',
      title: 'Community Favorite',
      description: '1000+ lượt yêu thích'
    }
  ];

  // Sample recipes
  const userRecipes = [
    {
      id: 1,
      title: 'Phở Bò Hà Nội',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop',
      rating: 4.8,
      views: 2341,
      likes: 189,
      time: '3h',
      difficulty: 'Khó'
    },
    {
      id: 2,
      title: 'Bánh Mì Thịt Nướng',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop',
      rating: 4.6,
      views: 1876,
      likes: 142,
      time: '45m',
      difficulty: 'Dễ'
    },
    {
      id: 3,
      title: 'Bún Bò Huế',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
      rating: 4.9,
      views: 3120,
      likes: 267,
      time: '2h',
      difficulty: 'Trung bình'
    },
    {
      id: 4,
      title: 'Gỏi Cuốn Tôm Thịt',
      image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&h=200&fit=crop',
      rating: 4.7,
      views: 1654,
      likes: 128,
      time: '30m',
      difficulty: 'Dễ'
    }
  ];

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
    } catch (error) {
      setLoading(false);
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = ({ file, onSuccess, onError }) => {
    try {
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserData({ ...userData, avatar: e.target.result });
          setAvatarUrl(e.target.result);
          onSuccess();
          message.success('Cập nhật ảnh đại diện thành công!');
        };
        reader.readAsDataURL(file);
      }, 1000);
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
    <ResponsiveWrapper>
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
                  <span className="number">{userData.stats.recipes}</span>
                  <span className="label">Công thức</span>
                </StatItem>
                <StatItem>
                  <span className="number">{userData.stats.followers}</span>
                  <span className="label">Người theo dõi</span>
                </StatItem>
                <StatItem>
                  <span className="number">{userData.stats.following}</span>
                  <span className="label">Đang theo dõi</span>
                </StatItem>
                <StatItem>
                  <span className="number">{userData.stats.likes}</span>
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
                    <Rate disabled value={4.8} style={{ fontSize: '14px' }} />
                    <span style={{ color: '#ff8c00', fontWeight: '600' }}>4.8</span>
                  </div>
                </div>
                <Divider style={{ margin: '5px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tổng lượt xem:</span>
                  <span style={{ color: '#2d5016', fontWeight: '600' }}>12,487</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Công thức phổ biến nhất:</span>
                  <span style={{ color: '#2d5016', fontWeight: '600' }}>Phở Bò</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Thành viên từ:</span>
                  <span style={{ color: '#2d5016', fontWeight: '600' }}>Tháng 3, 2020</span>
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
                  <ActionButton icon={<PlusOutlined />}>
                    Thêm công thức mới
                  </ActionButton>
                </div>

                <RecipesGrid>
                  {userRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      cover={<img alt={recipe.title} src={recipe.image} />}
                      hoverable
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
