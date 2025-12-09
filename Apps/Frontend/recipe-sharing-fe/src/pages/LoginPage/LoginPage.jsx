import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import {
  LoginPageContainer,
  LoginRow,
  FormSection,
  HeroSection,
  FormContainer,
  LoginTitle,
  LoginSubtitle,
  StyledForm,
  StyledInput,
  StyledPasswordInput,
  LoginButton,
  RememberForgotRow,
  StyledCheckbox,
  ForgotLink,
  Divider,
  SocialButtons,
  SocialButton,
  SignUpPrompt,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  FloatingElements,
  LoadingSpinner,
  ErrorMessage
} from './style';
import newRequest from '../../utils/request';

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await newRequest.post('/api/auth/login', {
        username: values.email,
        password: values.password
      });
      
      // Mock validation
      if (response.status === 200) {
         localStorage.setItem('authToken', response.data.token);
         localStorage.setItem('user', JSON.stringify(response.data.user));
        message.success('Đăng nhập thành công! Chào mừng bạn trở lại 🍳');
        navigate('/');
      } else {
        setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại!');
      }
    } catch (err) {
       if (err.response && err.response.status === 401) {
      setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại!');
    } else {
      setError('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại!');
    }
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setError('Vui lòng điền đầy đủ thông tin đăng nhập!');
  };

  const handleSocialLogin = (provider) => {
    message.info(`Tính năng đăng nhập với ${provider} sẽ được cập nhật sớm!`);
  };

  const handleForgotPassword = () => {
    message.info('Link reset mật khẩu đã được gửi đến email của bạn!');
  };

  return (
    <LoginPageContainer>
      <LoginRow>
        {/* Left Side - Login Form */}
        <FormSection xs={24} md={12} lg={10} xl={10}>
          <FormContainer>
            <LoginTitle>Đăng Nhập</LoginTitle>
            <LoginSubtitle>
              Chào mừng trở lại! Hãy đăng nhập để khám phá thế giới ẩm thực
            </LoginSubtitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <StyledForm
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Định dạng email không hợp lệ!' }
                ]}
              >
                <StyledInput 
                  placeholder="Nhập địa chỉ email của bạn"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu!' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                ]}
              >
                <StyledPasswordInput
                  placeholder="Nhập mật khẩu của bạn"
                  size="large"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <RememberForgotRow>
                <StyledCheckbox 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Ghi nhớ đăng nhập
                </StyledCheckbox>
                <ForgotLink onClick={handleForgotPassword}>
                  Quên mật khẩu?
                </ForgotLink>
              </RememberForgotRow>

              <Form.Item>
                <LoginButton 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  disabled={loading}
                >
                  {loading && <LoadingSpinner />}
                  {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                </LoginButton>
              </Form.Item>
            </StyledForm>

            {/* <Divider>
              <span>hoặc</span>
            </Divider>

            <SocialButtons>
              <SocialButton 
                className="google"
                icon={<GoogleOutlined />}
                onClick={() => handleSocialLogin('Google')}
              >
                Google
              </SocialButton>
              <SocialButton 
                className="facebook"
                icon={<span style={{color: '#1877f2'}}>f</span>}
                onClick={() => handleSocialLogin('Facebook')}
              >
                Facebook
              </SocialButton>
            </SocialButtons> */}

            <SignUpPrompt>
              Chưa có tài khoản? {' '}
              <Link to="/register">Đăng ký ngay</Link>
            </SignUpPrompt>
          </FormContainer>
        </FormSection>

        {/* Right Side - Hero Section */}
        <HeroSection xs={0} md={12} lg={14} xl={14}>
          <FloatingElements>
            <div className="floating-icon">🍳</div>
            <div className="floating-icon">🥗</div>
            <div className="floating-icon">🍅</div>
            <div className="floating-icon">🌿</div>
            <div className="floating-icon">🧄</div>
            <div className="floating-icon">🥕</div>
          </FloatingElements>
          
          <HeroContent>
            <HeroTitle>Khám Phá Ẩm Thực</HeroTitle>
            <HeroSubtitle>
              Tham gia cộng đồng đầu bếp đam mê, chia sẻ công thức độc đáo và 
              khám phá những hương vị mới mẻ từ khắp nơi trên thế giới.
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>
      </LoginRow>
    </LoginPageContainer>
  );
};

export default LoginPage;
