import React, { useEffect, useState, useRef } from 'react';
import { Col, Menu, Dropdown, Badge } from 'antd';
import { 
  faUtensils, 
  faRobot, 
  faEnvelope, 
  faUser,
  faBookOpen,
  faHome,
  faSignOutAlt,
  faBell,
  faUserCircle,
  faSearch,
  faTimes,
  faHeart,
  faCheck,
  faTrash,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import { 
  Container, 
  ContainerButton, 
  Icon, 
  LinkButton, 
  LoginAndSignup, 
  User, 
  UserIcon, 
  Wrapper, 
  WrapperHeaderText,
  MobileMenu,
  MobileMenuButton,
  Overlay,
  SearchContainer,
  NotificationBadge,
  PremiumBadge,
  SearchIconButton,
  MobileSearchOverlay,
  NotificationButton,
  NotificationPanel,
  NotificationItem,
  NotificationHeader,
  NotificationContent,
  NotificationActions,
  NotificationTime,
  NotificationAvatar,
  EmptyNotification,
  ChatButton
} from './style';

import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
import InputComponent from '../InputComponent/InputComponent';

function HeaderComponent() {
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);


  const handleFetchRecipeRating = async() =>{
    try {
      const response = await newRequest.get('/api/recipes/handle/refresh/rating');
      console.log('Recipe ratings:', response.data);
    } catch (error) {
      console.error('Error fetching recipe ratings:', error);
    }
  }

  useEffect(() => {
    handleFetchRecipeRating();
  }, []);

  // Kiểm tra token và fetch user thông tin
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUser(token);
      loadNotifications();
      
      // Giả lập có thông báo mới
      setHasNotifications(Math.random() > 0.3);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('authToken')]);

  // Đóng menu và search khi resize màn hình lớn hơn mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ngăn cuộn trang khi menu hoặc search đang mở
  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, searchOpen]);

  // Click outside để đóng notification panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    if (notificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationOpen]);

  const fetchUser = async (token) => {
    try {
      const response = await newRequest.get('/api/auth/get/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setIsLoggedIn(false);
    }
  };
    
  // Load sample notifications
  const loadNotifications = async () => {
    // const sampleNotifications = [
    //   {
    //     id: 1,
    //     type: 'like',
    //     title: 'Công thức được yêu thích',
    //     message: 'Minh Anh đã thích công thức "Phở Bò Hà Nội" của bạn',
    //     time: '2 phút trước',
    //     isRead: false,
    //     avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=50&h=50&fit=crop&crop=face'
    //   },
    //   {
    //     id: 2,
    //     type: 'comment',
    //     title: 'Bình luận mới',
    //     message: 'Chef Tuấn đã bình luận về công thức "Bánh Mì Thịt Nướng" của bạn',
    //     time: '15 phút trước',
    //     isRead: false,
    //     avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    //   },
    //   {
    //     id: 3,
    //     type: 'follow',
    //     title: 'Người theo dõi mới',
    //     message: 'Thu Hương đã bắt đầu theo dõi bạn',
    //     time: '1 giờ trước',
    //     isRead: false,
    //     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
    //   },
    //   {
    //     id: 4,
    //     type: 'recipe',
    //     title: 'Công thức được phê duyệt',
    //     message: 'Công thức "Mì Quảng Gà Tôm" đã được phê duyệt và xuất bản',
    //     time: '3 giờ trước',
    //     isRead: true,
    //     avatar: null
    //   },
    //   {
    //     id: 5,
    //     type: 'system',
    //     title: 'Cập nhật hệ thống',
    //     message: 'Chúng tôi đã thêm tính năng AI gợi ý món ăn mới',
    //     time: '1 ngày trước',
    //     isRead: true,
    //     avatar: null
    //   }
    // ];

    const response = await newRequest.get('/api/notifications/get/all', {headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }});
    setNotifications(response.data || []);
  };

  const handleToInfo = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/my/info');
      setMenuOpen(false);
    } else {
      navigate('/login');
    }
  };
  
  const handleToTicket = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/my/ticket');
      setMenuOpen(false);
    } else {
      navigate('/login');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (menuOpen) setMenuOpen(false);
    if (notificationOpen) setNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    if (menuOpen) setMenuOpen(false);
    if (searchOpen) setSearchOpen(false);
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId 
        ? { ...notif, isRead: true }
        : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    setHasNotifications(false);
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
    const remainingUnread = notifications.filter(notif => notif.id !== notificationId && !notif.isRead);
    setHasNotifications(remainingUnread.length > 0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'recipe': return '📝';
      case 'system': return '🔔';
      default: return '🔔';
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate('/my/info')} key="1">
        <Icon icon={faUserCircle} /> Quản lý trang cá nhân
      </Menu.Item>
      {/* <Menu.Item onClick={() => navigate('/my/recipes')} key="2">
        <Icon icon={faBookOpen} /> Công thức của tôi
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/my/favorites')} key="3">
        <Icon icon={faHeart} /> Yêu thích
      </Menu.Item> */}
      <Menu.Item onClick={handleLogout} key="4">
        <Icon icon={faSignOutAlt} /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Wrapper>
        <Col xs={14} sm={14} md={6} lg={5} xl={5}>
          <WrapperHeaderText onClick={() => navigate('/')}>
            Recipe Sharing
          </WrapperHeaderText>
        </Col>
        
        <Col xs={0} sm={0} md={10} lg={11} xl={11}>
          <Container>
            <ContainerButton onClick={() => navigate('/')}>
              <LinkButton>
                <Icon icon={faHome} /> Trang chủ
              </LinkButton>
            </ContainerButton>
            
            <ContainerButton onClick={() => navigate('/recipes')}>
              <LinkButton>
                <Icon icon={faUtensils} /> Công thức
                {/* {hasNotifications && <NotificationBadge>1</NotificationBadge>} */}
              </LinkButton>
            </ContainerButton>
            
            <ContainerButton onClick={() => navigate('/ai-chef')}>
              <LinkButton>
                <Icon icon={faRobot} /> Gợi ý AI
              </LinkButton>
            </ContainerButton>
            
            {/* <ContainerButton onClick={() => navigate('/contact')}>
              <LinkButton>
                <Icon icon={faEnvelope} /> Liên hệ
              </LinkButton>
            </ContainerButton> */}
          </Container>
        </Col>
        
        <Col xs={10} sm={10} md={8} lg={8} xl={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <SearchContainer>
            <InputComponent />
          </SearchContainer>
          
          {/* Icon tìm kiếm cho mobile */}
          <SearchIconButton onClick={toggleSearch}>
            <Icon icon={faSearch} />
          </SearchIconButton>

          {/* Chat Button */}
          {isLoggedIn && (
            <ChatButton onClick={() => navigate('/chat')}>
              <Icon icon={faComments} />
            </ChatButton>
          )}

          {/* Notification Button */}
          {isLoggedIn && (
            <div ref={notificationRef} style={{ position: 'relative' }}>
              <NotificationButton onClick={toggleNotifications}>
                <Icon icon={faBell} />
                {hasNotifications && <NotificationBadge />}
              </NotificationButton>
              
              {/* Notification Panel */}
              {notificationOpen && (
                <NotificationPanel>
                  <NotificationHeader>
                    <h3>Thông báo</h3>
                    <div>
                      <button onClick={markAllAsRead} style={{ background: 'none', border: 'none', color: '#2d5016', cursor: 'pointer', marginRight: '10px' }}>
                        <Icon icon={faCheck} /> Đánh dấu tất cả
                      </button>
                      <button onClick={() => setNotificationOpen(false)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                        <Icon icon={faTimes} />
                      </button>
                    </div>
                  </NotificationHeader>
                  
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <EmptyNotification>
                        <Icon icon={faBell} style={{ fontSize: '48px', color: '#ccc', marginBottom: '16px' }} />
                        <p>Không có thông báo nào</p>
                      </EmptyNotification>
                    ) : (
                      notifications.map((notification) => (
                        <NotificationItem 
                          key={notification.id} 
                          $isRead={notification.isRead}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <NotificationAvatar>
                            {notification.avatar ? (
                              <img src={notification.avatar} alt="" />
                            ) : (
                              <span>{getNotificationIcon(notification.type)}</span>
                            )}
                          </NotificationAvatar>
                          
                          <NotificationContent>
                            <h4>{notification.title}</h4>
                            <p>{notification.message}</p>
                            <NotificationTime>{notification.time}</NotificationTime>
                          </NotificationContent>
                          
                          <NotificationActions>
                            <button onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}>
                              <Icon icon={faTrash} />
                            </button>
                          </NotificationActions>
                        </NotificationItem>
                      ))
                    )}
                  </div>
                </NotificationPanel>
              )}
            </div>
          )}
          
          {isLoggedIn ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <User>
                <UserIcon icon={faUser} />
                <LoginAndSignup>
                  {user?.username || 'Người dùng'}
                  {user?.isPremium && <PremiumBadge>VIP</PremiumBadge>}
                </LoginAndSignup>
              </User>
            </Dropdown>
          ) : (
            <User onClick={() => navigate('/login')}>
              <UserIcon icon={faUser} />
              <LoginAndSignup>Đăng nhập</LoginAndSignup>
            </User>
          )}
          
          <MobileMenuButton onClick={toggleMenu} isOpen={menuOpen}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </MobileMenuButton>
        </Col>
      </Wrapper>
      
      <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      
      <MobileMenu isOpen={menuOpen}>
        <div className="mobile-nav-item" onClick={() => { navigate('/'); setMenuOpen(false); }}>
          <Icon icon={faHome} /> Trang chủ
        </div>
        <div className="mobile-nav-item" onClick={() => { navigate('/recipes'); setMenuOpen(false); }}>
          <Icon icon={faUtensils} /> Công thức
          {hasNotifications && <Badge count={1} size="small" style={{marginLeft: 5}} />}
        </div>
        <div className="mobile-nav-item" onClick={() => { navigate('/ai-suggestions'); setMenuOpen(false); }}>
          <Icon icon={faRobot} /> Gợi ý AI
        </div>
        <div className="mobile-nav-item" onClick={() => { navigate('/contact'); setMenuOpen(false); }}>
          <Icon icon={faEnvelope} /> Liên hệ
        </div>
        <div className="mobile-nav-item" onClick={handleToInfo}>
          <Icon icon={faUserCircle} /> Trang cá nhân
        </div>
        {isLoggedIn && (
          <div className="mobile-nav-item" onClick={handleLogout}>
            <Icon icon={faSignOutAlt} /> Đăng xuất
          </div>
        )}
      </MobileMenu>
      
      {/* Search Overlay cho Mobile */}
      <MobileSearchOverlay isOpen={searchOpen}>
        <div className="search-close-btn" onClick={() => setSearchOpen(false)}>
          <Icon icon={faTimes} />
        </div>
        <InputComponent fullWidth />
      </MobileSearchOverlay>
    </div>
  );
}

export default HeaderComponent;