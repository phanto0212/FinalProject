import React, { useState } from 'react';
import { Row, Col, Form, message } from 'antd';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faUtensils,
  faHeart,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { 
  ContactContainer,
  ContactHeader,
  ContactTitle,
  ContactSubtitle,
  ContactContent,
  ContactFormSection,
  ContactInfoSection,
  ContactFormWrapper,
  ContactInfoCard,
  ContactInfoItem,
  ContactIcon,
  ContactInfoText,
  SocialLinksSection,
  SocialLink,
  ContactFormTitle,
  StyledForm,
  StyledInput,
  StyledTextArea,
  SubmitButton,
  ContactFeatureSection,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  MapSection,
  BackgroundDecoration
} from './style';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';

const ContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: 'Email',
      content: 'info@recipesharing.com',
      link: 'mailto:info@recipesharing.com'
    },
    {
      icon: faPhone,
      title: 'Điện thoại',
      content: '+84 123 456 789',
      link: 'tel:+84123456789'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Địa chỉ',
      content: '123 Đường Ẩm Thực, Quận 1, TP.HCM',
      link: null
    },
    {
      icon: faClock,
      title: 'Giờ làm việc',
      content: 'T2 - T6: 9:00 - 18:00',
      link: null
    }
  ];

  const features = [
    {
      icon: faUtensils,
      title: 'Chia sẻ công thức',
      description: 'Chia sẻ các công thức nấu ăn yêu thích với cộng đồng'
    },
    {
      icon: faHeart,
      title: 'Kết nối đam mê',
      description: 'Kết nối với những người cùng đam mê ẩm thực'
    },
    {
      icon: faUsers,
      title: 'Cộng đồng lớn',
      description: 'Tham gia cộng đồng hàng nghìn người yêu thích nấu ăn'
    }
  ];

  const socialLinks = [
    { icon: faFacebookF, link: 'https://facebook.com', color: '#1877f2' },
    { icon: faTwitter, link: 'https://twitter.com', color: '#1da1f2' },
    { icon: faInstagram, link: 'https://instagram.com', color: '#e4405f' },
    { icon: faLinkedinIn, link: 'https://linkedin.com', color: '#0a66c2' }
  ];

  return (
    <DefaultComponent>
      <ContactContainer>
        <BackgroundDecoration />
        
        <ContactHeader>
          <ContactTitle>Liên hệ với chúng tôi</ContactTitle>
          <ContactSubtitle>
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn. Hãy liên hệ với chúng tôi!
          </ContactSubtitle>
        </ContactHeader>

        <ContactFeatureSection>
          <Row gutter={[32, 32]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <FeatureCard>
                  <FeatureIcon icon={feature.icon} />
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              </Col>
            ))}
          </Row>
        </ContactFeatureSection>

        <ContactContent>
          <Row gutter={[48, 48]}>
            <Col xs={24} lg={12}>
              <ContactFormSection>
                <ContactFormWrapper>
                  <ContactFormTitle>Gửi tin nhắn cho chúng tôi</ContactFormTitle>
                  <StyledForm
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                  >
                    <Form.Item
                      name="name"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                      <StyledInput placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <StyledInput placeholder="your.email@example.com" />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                    >
                      <StyledInput placeholder="+84 123 456 789" />
                    </Form.Item>

                    <Form.Item
                      name="subject"
                      label="Chủ đề"
                      rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
                    >
                      <StyledInput placeholder="Chủ đề tin nhắn" />
                    </Form.Item>

                    <Form.Item
                      name="message"
                      label="Tin nhắn"
                      rules={[{ required: true, message: 'Vui lòng nhập tin nhắn!' }]}
                    >
                      <StyledTextArea 
                        rows={5} 
                        placeholder="Nhập nội dung tin nhắn của bạn..."
                      />
                    </Form.Item>

                    <Form.Item>
                      <SubmitButton 
                        type="primary" 
                        htmlType="submit"
                        loading={loading}
                        icon={<ContactIcon icon={faPaperPlane} />}
                      >
                        {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                      </SubmitButton>
                    </Form.Item>
                  </StyledForm>
                </ContactFormWrapper>
              </ContactFormSection>
            </Col>

            <Col xs={24} lg={12}>
              <ContactInfoSection>
                <ContactInfoCard>
                  <h3>Thông tin liên hệ</h3>
                  {contactInfo.map((item, index) => (
                    <ContactInfoItem key={index} clickable={!!item.link}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <ContactIcon icon={item.icon} />
                          <ContactInfoText>
                            <strong>{item.title}</strong>
                            <span>{item.content}</span>
                          </ContactInfoText>
                        </a>
                      ) : (
                        <>
                          <ContactIcon icon={item.icon} />
                          <ContactInfoText>
                            <strong>{item.title}</strong>
                            <span>{item.content}</span>
                          </ContactInfoText>
                        </>
                      )}
                    </ContactInfoItem>
                  ))}

                  <SocialLinksSection>
                    <h4>Kết nối với chúng tôi</h4>
                    <div className="social-links">
                      {socialLinks.map((social, index) => (
                        <SocialLink 
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          color={social.color}
                        >
                          <ContactIcon icon={social.icon} />
                        </SocialLink>
                      ))}
                    </div>
                  </SocialLinksSection>
                </ContactInfoCard>

                <MapSection>
                  <h4>Vị trí của chúng tôi</h4>
                  <div className="map-placeholder">
                    <ContactIcon icon={faMapMarkerAlt} />
                    <p>123 Đường Ẩm Thực, Quận 1, TP.HCM</p>
                    <small>Bản đồ sẽ được tích hợp trong phiên bản tiếp theo</small>
                  </div>
                </MapSection>
              </ContactInfoSection>
            </Col>
          </Row>
        </ContactContent>
      </ContactContainer>
    </DefaultComponent>
  );
};

export default ContactPage;
