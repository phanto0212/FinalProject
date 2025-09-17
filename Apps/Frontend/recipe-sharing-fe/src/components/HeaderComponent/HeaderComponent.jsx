import React, { useEffect, useState } from 'react';
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
  faHeart
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
  MobileSearchOverlay
} from './style';

import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
import InputComponent from '../InputComponent/InputComponent';

function HeaderComponent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  // Kiểm tra token và fetch user thông tin
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUser(token);
      
      // Giả lập có thông báo mới
      setHasNotifications(Math.random() > 0.5);
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
  };

  const userMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate('/my/info')} key="1">
        <Icon icon={faUserCircle} /> Quản lý trang cá nhân
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/my/recipes')} key="2">
        <Icon icon={faBookOpen} /> Công thức của tôi
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/my/favorites')} key="3">
        <Icon icon={faHeart} /> Yêu thích
      </Menu.Item>
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
                {hasNotifications && <NotificationBadge>1</NotificationBadge>}
              </LinkButton>
            </ContainerButton>
            
            <ContainerButton onClick={() => navigate('/ai-suggestions')}>
              <LinkButton>
                <Icon icon={faRobot} /> Gợi ý AI
              </LinkButton>
            </ContainerButton>
            
            <ContainerButton onClick={() => navigate('/contact')}>
              <LinkButton>
                <Icon icon={faEnvelope} /> Liên hệ
              </LinkButton>
            </ContainerButton>
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