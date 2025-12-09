import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Avatar, Button, Tabs, Card, Statistic, Badge, message, Modal } from 'antd';
import { 
  faHeart,
  faComment,
  faShare,
  faBookmark,
  faUsers,
  faCrown,
  faEye,
  faThumbsUp,
  faMapMarkerAlt,
  faCalendarAlt,
  faUtensils,
  faTrophy,
  faStar,
  faUserPlus,
  faUserCheck,
  faEllipsisH,
  faClock,
  faFlag,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import CommentComponent from '../../components/CommentComponent/CommentComponent';
import {
  ProfileContainer,
  ProfileHeader,
  CoverImage,
  ProfileInfo,
  UserAvatar,
  UserDetails,
  UserName,
  UserTitle,
  UserStats,
  StatItem,
  ActionButtons,
  ProfileTabs,
  TabContent,
  RecipeGrid,
  RecipeCard,
  RecipeImage,
  RecipeTitle,
  RecipeAuthor,
  RecipeStats,
  AboutSection,
  InfoCard,
  InfoItem,
  AchievementSection,
  AchievementBadge,
  FollowersSection,
  FollowerItem
} from './style';
import newRequest from '../../utils/request';

const { TabPane } = Tabs;

const InfoUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('recipes');
  const [showComments, setShowComments] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  
  // Sample user data (sẽ được thay thế bằng API call)
  const sampleUser = {
    id: userId,
    name: 'Chef Minh Anh',
    title: 'Chuyên gia ẩm thực Việt Nam',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop',
    location: 'Hà Nội, Việt Nam',
    joinDate: 'Tham gia từ tháng 3, 2023',
    bio: 'Đầu bếp chuyên nghiệp với hơn 15 năm kinh nghiệm. Đam mê với ẩm thực truyền thống Việt Nam và các món fusion hiện đại. Chia sẻ những công thức độc đáo và bí quyết nấu ăn.',
    isVerified: true,
    stats: {
      recipes: 124,
      followers: 15420,
      following: 89,
      likes: 45678
    },
    achievements: [
      { id: 1, title: 'Top Chef', description: 'Có hơn 100 công thức', icon: faTrophy, color: '#ffd700' },
      { id: 2, title: 'Người được yêu thích', description: 'Có hơn 10K followers', icon: faHeart, color: '#ef4444' },
      { id: 3, title: 'Chuyên gia', description: 'Đánh giá 5 sao', icon: faStar, color: '#f59e0b' },
      { id: 4, title: 'Chia sẻ nhiều', description: 'Chia sẻ hơn 50 công thức', icon: faUtensils, color: '#10b981' }
    ]
  };

  // Sample recipes data
  const sampleRecipes = [
    {
      id: 1,
      title: 'Phở Bò Hà Nội Đặc Biệt',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&h=200&fit=crop',
      cookTime: '3 giờ',
      difficulty: 'Khó',
      stats: { likes: 234, comments: 45, views: 1200 }
    },
    {
      id: 2,
      title: 'Bún Chả Hà Nội',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop',
      cookTime: '45 phút',
      difficulty: 'Trung bình',
      stats: { likes: 189, comments: 32, views: 890 }
    },
    {
      id: 3,
      title: 'Bánh Mì Việt Nam',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      cookTime: '30 phút',
      difficulty: 'Dễ',
      stats: { likes: 156, comments: 28, views: 650 }
    },
    {
      id: 4,
      title: 'Cơm Tấm Sài Gòn',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop',
      cookTime: '1 giờ',
      difficulty: 'Trung bình',
      stats: { likes: 298, comments: 67, views: 1456 }
    },
    {
      id: 5,
      title: 'Gỏi Cuốn Tôm Thịt',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d293?w=300&h=200&fit=crop',
      cookTime: '20 phút',
      difficulty: 'Dễ',
      stats: { likes: 167, comments: 23, views: 780 }
    },
    {
      id: 6,
      title: 'Chả Cá Lã Vọng',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      cookTime: '40 phút',
      difficulty: 'Trung bình',
      stats: { likes: 203, comments: 41, views: 920 }
    }
  ];

  // Sample followers data
  const sampleFollowers = [
    {
      id: 1,
      name: 'Chef Linda',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=50&h=50&fit=crop&crop=face',
      isVerified: true,
      recipes: 45
    },
    {
      id: 2,
      name: 'Master Cook',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isVerified: false,
      recipes: 23
    },
    {
      id: 3,
      name: 'Food Lover',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      isVerified: false,
      recipes: 12
    }
  ];

  const handleGetFollowing = async () => {
    try{
       const response = await newRequest.get(`/api/recipes/get/isfollowing/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched following list:', response.data.isFollowing);
      if(response.status === 200){
        if(response.data.isFollowing){
          setIsFollowing(true);
        }
        else{
          setIsFollowing(false);
        }
      }
    }
    catch(error){
      console.error('Error fetching following list:', error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    fetchUserInfo();
    fetchUserRecipes();
    fetchSavedRecipes();
    fetchFollowers();
    handleGetFollowing();
  }, [userId]);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      // Tạm thời dùng sample data
      const response = await newRequest.get(`/api/recipes/get/user/info/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Default achievements nếu API không trả về
      const defaultAchievements = [
        { id: 1, title: 'Đầu bếp mới', description: 'Bắt đầu hành trình nấu ăn', icon: faTrophy, color: '#ffd700' },
        { id: 2, title: 'Người chia sẻ', description: 'Đã chia sẻ công thức', icon: faUtensils, color: '#10b981' },
        { id: 3, title: 'Được yêu thích', description: 'Nhận được lượt thích', icon: faHeart, color: '#ef4444' },
        { id: 4, title: 'Ngôi sao', description: 'Đánh giá tốt', icon: faStar, color: '#f59e0b' }
      ];
      
      // Default stats nếu API không trả về
      const defaultStats = {
        recipes: 0,
        followers: 0,
        following: 0,
        likes: 0
      };
      
      const userData = response.data.userInfo;
      setUserInfo({
        ...userData,
        achievements: userData.achievements || defaultAchievements,
        stats: userData.stats || defaultStats,
        coverImage: userData.coverImage || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop',
        bio: userData.bio || 'Chưa có thông tin giới thiệu.',
        location: userData.location || 'Việt Nam',
        joinDate: userData.joinDate || 'Mới tham gia'
      });
      setLoading(false);
      
      // TODO: Thay bằng API call thực
      // const response = await newRequest.get(`/api/users/${userId}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setLoading(false);
    }
  };

  const fetchUserRecipes = async () => {
    try {
      // Tạm thời dùng sample data
      const response = await newRequest.get(`/api/recipes/get/recipeforInfo/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserRecipes(response.data.userRecipes);
      setFavoriteRecipes(response.data.likedRecipes
    
      );
    } catch (error) {
      console.error('Error fetching user recipes:', error);
    }
  };

  const fetchFollowers = async () => {
    try {

      const response = await newRequest.get(`/api/recipes/get/followers/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Fetched followers:', response.data.followers);
      setFollowers(response.data.followers);
      setFollowing(response.data.following);
      
    } catch (error) {
      console.error('Error fetching followers:', error);
    }
  };

  // Fetch saved recipes của user đang xem
  const fetchSavedRecipes = async () => {
    setLoadingSaved(true);
    try {
      const response = await newRequest.get(`/api/recipes/get/saved/recipes/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        setSavedRecipes(response.data.savedRecipes || response.data.recipes || []);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
      setSavedRecipes([]);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        // Unfollow
        setIsFollowing(false);
        message.success('Đã bỏ theo dõi!');
      } else {
        // Follow
        setIsFollowing(true);
        message.success('Đã theo dõi!');
      }
      const response = await newRequest.post(`/api/user/followers/add/${userId}`, {}, {
              headers: { Authorization: `Bearer ${token}` }
            });

    } catch (error) {
      console.error('Error following user:', error);
      message.error('Có lỗi xảy ra!');
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/detail/${recipeId}`);
  };

  const handleUserClick = (clickedUserId) => {
    navigate(`/user/info/${clickedUserId}`);
  };

  const handleComment = (recipeId) => {
    setCurrentRecipeId(recipeId);
    setShowComments(true);
  };

  const handleLike = async (recipeId) => {
    try {
      // TODO: API call để like recipe
      message.success('Đã thích công thức!');
    } catch (error) {
      console.error('Error liking recipe:', error);
      message.error('Có lỗi xảy ra!');
    }
  };

  const handleShare = (recipeId) => {
    const shareUrl = `${window.location.origin}/recipe/${recipeId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      message.success('Đã sao chép link công thức!');
    }).catch(() => {
      message.error('Không thể sao chép link!');
    });
  };

  if (loading || !userInfo) {
    return (
      <DefaultComponent>
        <div style={{ padding: '100px', textAlign: 'center' }}>Đang tải...</div>
      </DefaultComponent>
    );
  }

  return (
    <DefaultComponent>
      <ProfileContainer>
        {/* Profile Header */}
        <ProfileHeader>
          <CoverImage src={userInfo.coverImage} />
          <ProfileInfo>
            <UserAvatar>
              <Avatar size={120} src={userInfo.avatar} />
              {userInfo.isVerified && (
                <Badge 
                  count={<FontAwesomeIcon icon={faCrown} style={{ color: '#ffd700' }} />}
                  offset={[-10, 10]}
                />
              )}
            </UserAvatar>
            
            <UserDetails>
              <UserName>{userInfo.name}</UserName>
              <UserTitle>{userInfo.title}</UserTitle>
              
              <div style={{ display: 'flex', gap: '20px', margin: '10px 0', color: '#6b7280', fontSize: '14px' }}>
                <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {userInfo.location}</span>
                <span><FontAwesomeIcon icon={faCalendarAlt} /> {userInfo.joinDate}</span>
              </div>

              <UserStats>
                <StatItem>
                  <Statistic title="Công thức" value={userInfo.stats.recipes} />
                </StatItem>
                <StatItem>
                  <Statistic title="Người theo dõi" value={userInfo.stats.followers} />
                </StatItem>
                <StatItem>
                  <Statistic title="Đang theo dõi" value={userInfo.stats.following} />
                </StatItem>
                <StatItem>
                  <Statistic title="Lượt thích" value={userInfo.stats.likes} />
                </StatItem>
              </UserStats>
            </UserDetails>

            <ActionButtons>
              <Button 
                type={isFollowing ? "default" : "primary"}
                size="large"
                icon={<FontAwesomeIcon icon={isFollowing ? faUserCheck : faUserPlus} />}
                onClick={handleFollow}
              >
                {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
              </Button>
              <Button size="large" icon={<FontAwesomeIcon icon={faEllipsisH} />} />
            </ActionButtons>
          </ProfileInfo>
        </ProfileHeader>

        {/* Profile Content */}
        <ProfileTabs>
          <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
            <TabPane tab={`Công thức (${userRecipes.length})`} key="recipes">
              <TabContent>
                <RecipeGrid>
                  {userRecipes.map(recipe => (
                    <RecipeCard key={recipe.id}>
                      <RecipeImage 
                        src={recipe.image} 
                        alt={recipe.title}
                        onClick={() => handleRecipeClick(recipe.id)}
                      />
                      <div className="recipe-content">
                        <RecipeTitle onClick={() => handleRecipeClick(recipe.id)}>
                          {recipe.title}
                        </RecipeTitle>
                        <RecipeAuthor>
                          <FontAwesomeIcon icon={faClock} /> {recipe.cookTime} • {recipe.difficulty}
                        </RecipeAuthor>
                        <RecipeStats>
                          <span><FontAwesomeIcon icon={faEye} /> {recipe.stats.views}</span>
                          <span><FontAwesomeIcon icon={faThumbsUp} /> {recipe.stats.likes}</span>
                          <span><FontAwesomeIcon icon={faComment} /> {recipe.stats.comments}</span>
                        </RecipeStats>
                        <div className="recipe-actions">
                          <Button 
                            type="text" 
                            icon={<FontAwesomeIcon icon={faThumbsUp} />}
                            onClick={() => handleLike(recipe.id)}
                          >
                            Thích
                          </Button>
                          <Button 
                            type="text" 
                            icon={<FontAwesomeIcon icon={faComment} />}
                            onClick={() => handleComment(recipe.id)}
                          >
                            Bình luận
                          </Button>
                          <Button 
                            type="text" 
                            icon={<FontAwesomeIcon icon={faShare} />}
                            onClick={() => handleShare(recipe.id)}
                          >
                            Chia sẻ
                          </Button>
                        </div>
                      </div>
                    </RecipeCard>
                  ))}
                </RecipeGrid>
              </TabContent>
            </TabPane>

            <TabPane tab={`Yêu thích (${favoriteRecipes.length})`} key="favorites">
              <TabContent>
                <RecipeGrid>
                  {favoriteRecipes.map(recipe => (
                    <RecipeCard key={recipe.id}>
                      <RecipeImage 
                        src={recipe.image} 
                        alt={recipe.title}
                        onClick={() => handleRecipeClick(recipe.id)}
                      />
                      <div className="recipe-content">
                        <RecipeTitle onClick={() => handleRecipeClick(recipe.id)}>
                          {recipe.title}
                        </RecipeTitle>
                        <RecipeAuthor>
                          <FontAwesomeIcon icon={faClock} /> {recipe.cookTime} • {recipe.difficulty}
                        </RecipeAuthor>
                        <RecipeStats>
                          <span><FontAwesomeIcon icon={faEye} /> {recipe.stats.views}</span>
                          <span><FontAwesomeIcon icon={faThumbsUp} /> {recipe.stats.likes}</span>
                          <span><FontAwesomeIcon icon={faComment} /> {recipe.stats.comments}</span>
                        </RecipeStats>
                      </div>
                    </RecipeCard>
                  ))}
                </RecipeGrid>
              </TabContent>
            </TabPane>

            <TabPane tab={`Đã lưu (${savedRecipes.length})`} key="saved">
              <TabContent>
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FontAwesomeIcon icon={faBook} style={{ color: '#2d5016', fontSize: '20px' }} />
                  <h3 style={{ margin: 0, color: '#2d5016' }}>Công thức đã lưu</h3>
                </div>
                
                {loadingSaved ? (
                  <div style={{ textAlign: 'center', padding: '50px 0', color: '#6b7280' }}>
                    Đang tải...
                  </div>
                ) : savedRecipes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '50px 0', color: '#6b7280' }}>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>📚</div>
                    <h4 style={{ color: '#374151', marginBottom: '8px' }}>Chưa có công thức đã lưu</h4>
                    <p>Người dùng này chưa lưu công thức nào.</p>
                  </div>
                ) : (
                  <RecipeGrid>
                    {savedRecipes.map(recipe => (
                      <RecipeCard key={recipe.id}>
                        <RecipeImage 
                          src={recipe.image || recipe.imageUrl || recipe.recipeImage} 
                          alt={recipe.title}
                          onClick={() => handleRecipeClick(recipe.id)}
                        />
                        <div className="recipe-content">
                          <RecipeTitle onClick={() => handleRecipeClick(recipe.id)}>
                            {recipe.title}
                          </RecipeTitle>
                          <RecipeAuthor>
                            <FontAwesomeIcon icon={faClock} /> {recipe.cookTime || recipe.time || 'N/A'} • {recipe.difficulty || 'N/A'}
                          </RecipeAuthor>
                          <RecipeStats>
                            <span><FontAwesomeIcon icon={faEye} /> {recipe.stats?.views || recipe.views || 0}</span>
                            <span><FontAwesomeIcon icon={faThumbsUp} /> {recipe.stats?.likes || recipe.likes || 0}</span>
                            <span><FontAwesomeIcon icon={faComment} /> {recipe.stats?.comments || recipe.comments || 0}</span>
                          </RecipeStats>
                          {recipe.author && (
                            <div style={{ marginTop: '10px', fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Avatar src={recipe.author.avatar} size={24} />
                              <span 
                                style={{ cursor: 'pointer' }}
                                onClick={() => recipe.author.id && handleUserClick(recipe.author.id)}
                              >
                                {recipe.author.name || recipe.authorName || 'Ẩn danh'}
                              </span>
                            </div>
                          )}
                        </div>
                      </RecipeCard>
                    ))}
                  </RecipeGrid>
                )}
              </TabContent>
            </TabPane>

            <TabPane tab="Giới thiệu" key="about">
              <TabContent>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={16}>
                    <AboutSection>
                      <h3>Giới thiệu</h3>
                      <p>{userInfo.bio}</p>
                      
                      <AchievementSection>
                        <h4>Thành tích</h4>
                        <div className="achievement-grid">
                          {userInfo.achievements.map(achievement => (
                            <AchievementBadge key={achievement.id} color={achievement.color}>
                              <FontAwesomeIcon icon={achievement.icon} />
                              <div>
                                <div className="title">{achievement.title}</div>
                                <div className="description">{achievement.description}</div>
                              </div>
                            </AchievementBadge>
                          ))}
                        </div>
                      </AchievementSection>
                    </AboutSection>
                  </Col>
                  
                  <Col xs={24} lg={8}>
                    <InfoCard>
                      <h4>Thông tin</h4>
                      <InfoItem>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        <span>{userInfo.location}</span>
                      </InfoItem>
                      <InfoItem>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                        <span>{userInfo.joinDate}</span>
                      </InfoItem>
                      <InfoItem>
                        <FontAwesomeIcon icon={faUtensils} />
                        <span>{userInfo.stats.recipes} công thức đã chia sẻ</span>
                      </InfoItem>
                      <InfoItem>
                        <FontAwesomeIcon icon={faUsers} />
                        <span>{userInfo.stats.followers} người theo dõi</span>
                      </InfoItem>
                    </InfoCard>
                  </Col>
                </Row>
              </TabContent>
            </TabPane>

            <TabPane tab={`Người theo dõi (${followers.length})`} key="followers">
              <TabContent>
                <FollowersSection>
                  {followers.map(follower => (
                    <FollowerItem key={follower.id}>
                      <Avatar 
                        src={follower.avatar} 
                        size={60} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleUserClick(follower.id)}
                      />
                      <div className="follower-info">
                        <div 
                          className="name"
                          onClick={() => handleUserClick(follower.id)}
                        >
                          {follower.name}
                          {follower.isVerified && (
                            <FontAwesomeIcon icon={faCrown} style={{ color: '#ffd700', marginLeft: '5px' }} />
                          )}
                        </div>
                        <div className="recipes">{follower.recipes} công thức</div>
                      </div>
                      <Button size="small" type="primary">
                        Theo dõi
                      </Button>
                    </FollowerItem>
                  ))}
                </FollowersSection>
              </TabContent>
            </TabPane>
          </Tabs>
        </ProfileTabs>

        {/* Comments Modal */}
        <Modal
          title="Bình luận"
          open={showComments}
          onCancel={() => {
            setShowComments(false);
            setCurrentRecipeId(null);
          }}
          width={800}
          footer={null}
          bodyStyle={{ padding: 0 }}
        >
          {currentRecipeId && (
            <CommentComponent recipeId={currentRecipeId} />
          )}
        </Modal>
      </ProfileContainer>
    </DefaultComponent>
  );
};

export default InfoUserPage;
