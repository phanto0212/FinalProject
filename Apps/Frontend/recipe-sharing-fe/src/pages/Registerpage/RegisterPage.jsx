import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import {
  RegisterPageContainer,
  RegisterRow,
  HeroSection,
  FormSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroBenefits,
  FloatingElements,
  FormContainer,
  RegisterTitle,
  RegisterSubtitle,
  StyledForm,
  StyledInput,
  StyledPasswordInput,
  PasswordStrengthContainer,
  PasswordStrengthLabel,
  StyledProgress,
  RegisterButton,
  TermsContainer,
  StyledCheckbox,
  Divider,
  SocialButtons,
  SocialButton,
  LoginPrompt,
  LoadingSpinner,
  SuccessMessage,
  ErrorMessage
} from './style';

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  useEffect(() => {
    const calculateStrength = (pwd) => {
      let score = 0;
      if (!pwd) return 0;
      
      // Length check
      if (pwd.length >= 8) score += 25;
      if (pwd.length >= 12) score += 10;
      
      // Character variety
      if (/[a-z]/.test(pwd)) score += 15;
      if (/[A-Z]/.test(pwd)) score += 15;
      if (/[0-9]/.test(pwd)) score += 15;
      if (/[^A-Za-z0-9]/.test(pwd)) score += 20;
      
      return Math.min(score, 100);
    };
    
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  const getStrengthText = (strength) => {
    if (strength >= 80) return 'Rất mạnh';
    if (strength >= 60) return 'Mạnh';
    if (strength >= 40) return 'Trung bình';
    if (strength > 0) return 'Yếu';
    return '';
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Validate password strength
      if (passwordStrength < 40) {
        setError('Mật khẩu quá yếu! Vui lòng chọn mật khẩu mạnh hơn.');
        return;
      }
      
      if (!agreeTerms) {
        setError('Vui lòng đồng ý với điều khoản sử dụng để tiếp tục.');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration logic
      const newUser = {
        id: Date.now(),
        name: values.name,
        email: values.email,
        avatar: null,
        createdAt: new Date().toISOString()
      };
      
      // Save user info (in real app, this would be handled by backend)
      localStorage.setItem('registeredUser', JSON.stringify(newUser));
      
      setSuccess('Tài khoản đã được tạo thành công! Vui lòng kiểm tra email để xác thực.');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Đăng ký thành công! Hãy đăng nhập để tiếp tục.',
            email: values.email 
          }
        });
      }, 3000);

    } catch (err) {
      setError('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setError('Vui lòng điền đầy đủ thông tin hợp lệ!');
  };

  const handleSocialRegister = (provider) => {
    message.info(`Tính năng đăng ký với ${provider} sẽ được cập nhật sớm!`);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <RegisterPageContainer>
      <RegisterRow>
        {/* Left Side - Hero Section */}
        <HeroSection xs={0} md={12} lg={14} xl={14}>
          <FloatingElements>
            <div className="floating-icon">🍳</div>
            <div className="floating-icon">👨‍🍳</div>
            <div className="floating-icon">📖</div>
            <div className="floating-icon">🌟</div>
            <div className="floating-icon">💡</div>
            <div className="floating-icon">🤝</div>
            <div className="floating-icon">🏆</div>
          </FloatingElements>
          
          <HeroContent>
            <HeroTitle>Tham Gia Cộng Đồng</HeroTitle>
            <HeroSubtitle>
              Kết nối với hàng ngàn đầu bếp đam mê, chia sẻ công thức độc đáo 
              và khám phá những món ăn mới mỗi ngày.
            </HeroSubtitle>
            
            <HeroBenefits>
              <div className="benefit-item">
                <span className="icon">🔥</span>
                <span>Chia sẻ công thức độc quyền</span>
              </div>
              <div className="benefit-item">
                <span className="icon">🤖</span>
                <span>Nhận gợi ý từ AI thông minh</span>
              </div>
              <div className="benefit-item">
                <span className="icon">👥</span>
                <span>Kết nối với cộng đồng đầu bếp</span>
              </div>
              <div className="benefit-item">
                <span className="icon">📱</span>
                <span>Truy cập mọi lúc, mọi nơi</span>
              </div>
            </HeroBenefits>
          </HeroContent>
        </HeroSection>

        {/* Right Side - Registration Form */}
        <FormSection xs={24} md={12} lg={10} xl={10}>
          <FormContainer>
            <RegisterTitle>Đăng Ký</RegisterTitle>
            <RegisterSubtitle>
              Tạo tài khoản miễn phí để bắt đầu hành trình ẩm thực của bạn
            </RegisterSubtitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}

            <StyledForm
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên!' },
                  { min: 2, message: 'Tên phải có ít nhất 2 ký tự!' },
                  { max: 50, message: 'Tên không được quá 50 ký tự!' }
                ]}
              >
                <StyledInput 
                  placeholder="Nhập họ và tên của bạn"
                  size="large"
                />
              </Form.Item>

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
                  placeholder="Tạo mật khẩu mạnh"
                  size="large"
                  onChange={handlePasswordChange}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              {password && (
                <PasswordStrengthContainer>
                  <PasswordStrengthLabel strength={passwordStrength}>
                    <span>Độ mạnh mật khẩu:</span>
                    <span className="strength-text">{getStrengthText(passwordStrength)}</span>
                  </PasswordStrengthLabel>
                  <StyledProgress 
                    percent={passwordStrength} 
                    showInfo={false} 
                    size="small"
                    strokeLinecap="round"
                  />
                </PasswordStrengthContainer>
              )}

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                    },
                  }),
                ]}
              >
                <StyledPasswordInput
                  placeholder="Nhập lại mật khẩu"
                  size="large"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <TermsContainer>
                <StyledCheckbox 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                >
                  Tôi đồng ý với{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Điều khoản sử dụng
                  </a>{' '}
                  và{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    Chính sách bảo mật
                  </a>
                </StyledCheckbox>
              </TermsContainer>

              <Form.Item>
                <RegisterButton 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  disabled={loading || !agreeTerms}
                >
                  {loading && <LoadingSpinner />}
                  {loading ? 'Đang tạo tài khoản...' : 'Tạo Tài Khoản'}
                </RegisterButton>
              </Form.Item>
            </StyledForm>

            {/* <Divider>
              <span>hoặc đăng ký với</span>
            </Divider>

            <SocialButtons>
              <SocialButton 
                className="google"
                icon={<GoogleOutlined />}
                onClick={() => handleSocialRegister('Google')}
              >
                Google
              </SocialButton>
              <SocialButton 
                className="facebook"
                icon={<span style={{color: '#1877f2', fontWeight: 'bold'}}>f</span>}
                onClick={() => handleSocialRegister('Facebook')}
              >
                Facebook
              </SocialButton>
            </SocialButtons> */}

            <LoginPrompt>
              Đã có tài khoản? {' '}
              <Link to="/login">Đăng nhập ngay</Link>
            </LoginPrompt>
          </FormContainer>
        </FormSection>
      </RegisterRow>
    </RegisterPageContainer>
  );
};

export default RegisterPage;
