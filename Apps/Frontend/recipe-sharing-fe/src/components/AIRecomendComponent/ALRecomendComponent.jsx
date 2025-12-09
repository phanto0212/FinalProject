import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Avatar, Spin, message } from 'antd';
import { 
  SendOutlined, 
  RobotOutlined, 
  UserOutlined, 
  BulbOutlined,
  ClockCircleOutlined,
  FireOutlined
} from '@ant-design/icons';
import {
  ChatContainer,
  ChatHeader,
  ChatBody,
  MessageContainer,
  MessageBubble,
  UserMessage,
  AIMessage,
  MessageTime,
  ChatInput,
  SendButton,
  InputContainer,
  SuggestionsContainer,
  SuggestionCard,
  LoadingMessage,
  AIAvatar,
  UserAvatar,
  RecipeCard,
  RecipeImage,
  RecipeContent,
  RecipeTitle,
  RecipeDesc,
  RecipeMeta,
  WelcomeMessage,
  QuickSuggestions,
  QuickButton
} from './style';
import newRequest from '../../utils/request';

const AIRecommendComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom khi có tin nhắn mới
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Khởi tạo với tin nhắn chào mừng
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      type: 'ai',
      content: 'Xin chào! Tôi là AI Chef Assistant 🤖👨‍🍳\n\nTôi có thể giúp bạn:\n• Gợi ý món ăn dựa trên nguyên liệu có sẵn\n• Tìm công thức phù hợp với thời gian nấu\n• Đề xuất món ăn theo sở thích\n• Tư vấn thay thế nguyên liệu\n\nHãy cho tôi biết bạn muốn nấu món gì hôm nay?',
      timestamp: new Date(),
      recipes: []
    };
    setMessages([welcomeMessage]);
  }, []);

  // Gợi ý nhanh
  const quickSuggestions = [
    { icon: '🍲', text: 'Món chính cho bữa tối', query: 'Gợi ý món chính cho bữa tối gia đình' },
    { icon: '🥗', text: 'Món ăn healthy', query: 'Món ăn lành mạnh và ít calo' },
    { icon: '⏰', text: 'Nấu nhanh 30 phút', query: 'Món ăn nấu nhanh trong 30 phút' },
    { icon: '🌶️', text: 'Món cay Việt Nam', query: 'Món ăn cay truyền thống Việt Nam' }
  ];

  // // Danh sách công thức mẫu cho AI response
  // const recommendedRecipes = [
  //   {
  //     id: 1,
  //     title: 'Phở Bò Truyền Thống',
  //     description: 'Món phở bò đậm đà với nước dùng ngọt từ xương bò ninh 6 tiếng',
  //     image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=150&h=100&fit=crop',
  //     time: '3 giờ',
  //     difficulty: 'Khó',
  //     ingredients: ['Xương bò', 'Bánh phở', 'Thịt bò', 'Hành tây', 'Gừng']
  //   },
  //   {
  //     id: 2,
  //     title: 'Salad Tôm Bơ',
  //     description: 'Salad tươi mát với tôm luộc, bơ chín và rau xanh',
  //     image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=100&fit=crop',
  //     time: '20 phút',
  //     difficulty: 'Dễ',
  //     ingredients: ['Tôm sú', 'Bơ', 'Rau xà lách', 'Cà chua cherry']
  //   },
  //   {
  //     id: 3,
  //     title: 'Mì Xào Thập Cẩm',
  //     description: 'Mì xào giòn với tôm, thịt và rau củ đầy màu sắc',
  //     image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=150&h=100&fit=crop',
  //     time: '25 phút',
  //     difficulty: 'Trung bình',
  //     ingredients: ['Mì tươi', 'Tôm', 'Thịt heo', 'Rau củ', 'Gia vị']
  //   }
  // ];

  // Xử lý gửi tin nhắn
  const handleSendMessage = async (overrideText) => {
    const candidateText = typeof overrideText === 'string' ? overrideText : inputValue;
    const messageText = (candidateText ?? '').trim();
    if (!messageText) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Giả lập AI response
    setTimeout(async () => {
      try {
        const aiResponse = await generateAIResponse(messageText);
        setMessages(prev => [...prev, aiResponse]);
      } catch (error) {
        console.error('AI suggestion error:', error);
        message.error('Không thể lấy gợi ý từ AI. Vui lòng thử lại!');
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const getSuggestionsForInput = async (input) => {
    try {
      const response = await newRequest.post('/api/ai/chat', {
        prompt: `Bạn là một trợ lý gợi ý nấu ăn.\nNgười dùng sẽ nhập vào danh sách nguyên liệu.\nNhiệm vụ của bạn:\n1. Gợi ý 1 món ăn phổ biến nhất phù hợp với nguyên liệu.\n2. Nếu người dùng nhập nội dung không liên quan đến nguyên liệu nấu ăn thì trả về đúng text "cancel".\n3. Bạn hãy trả lời đúng chỉ mỗi text của món ăn thôi không thêm lời giải thích không ký tự đặc biệt.\n\nVí dụ:\nNguyên liệu: "trứng, cà chua"\nTrả lời: "Trứng chiên cà chua"\n\nNguyên liệu: "thịt bò, hành tây"\nTrả lời:  "Bò xào hành tây"\n\n Nguyên liệu: "${input}"`
      });

      if (response.status === 200 && response.data?.message !== 'cancel') {
        return {
          response: response.data?.title || response.data?.message || '',
          suggestedRecipes: response.data?.recipes || [],
          isError: false
        };
      } else {
        return {
          response: 'Xin lỗi, tôi chưa có gợi ý phù hợp cho nguyên liệu này.',
          suggestedRecipes: [],
          isError: true
        };
      }
    } catch (error) {
      console.error('getSuggestionsForInput error:', error);
      return {
        response: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại!',
        suggestedRecipes: [],
        isError: true
      };
    }
  };
  const generateAIResponse = async (userInput) => {
    const cleanedInput = (userInput || '').trim();
    const { response, suggestedRecipes, isError } = await getSuggestionsForInput(cleanedInput);

    // Nếu là lỗi hoặc không có gợi ý -> trả về message trực tiếp, không thêm intro
    if (isError || response === '' || response.includes('Xin lỗi')) {
      return {
        id: Date.now() + 1,
        type: 'ai',
        content: response || 'Xin lỗi, tôi chưa có gợi ý phù hợp cho nguyên liệu này.',
        timestamp: new Date(),
        recipes: []
      };
    }

    // Có gợi ý thành công -> thêm intro phrases
    const introPhrases = [
      '🍳 Mình gợi ý bạn thử món',
      '🥗 Dựa trên nguyên liệu của bạn, hãy khám phá',
      '🔥 Một lựa chọn đậm đà dành cho bạn là',
      '🍽️ Thực đơn hôm nay gọi tên',
      '🌿 Một gợi ý tươi mới:'
    ];

    const randomIntro = introPhrases[Math.floor(Math.random() * introPhrases.length)];
    const recipeName = (response || '').trim();
    const highlightInput = cleanedInput ? ` — hoàn hảo khi bạn có ${cleanedInput}!` : '!';
    const friendlyMessage = `${randomIntro} ${recipeName}${highlightInput}`;

    return {
      id: Date.now() + 1,
      type: 'ai',
      content: friendlyMessage,
      timestamp: new Date(),
      recipes: Array.isArray(suggestedRecipes) && suggestedRecipes.length > 0
        ? suggestedRecipes
        : []
    };
  };

  // Xử lý quick suggestion
  const handleQuickSuggestion = (suggestion) => {
    const preset = typeof suggestion?.query === 'string' ? suggestion.query.trim() : '';
    if (!preset) return;
    setInputValue(preset);
    handleSendMessage(preset);
  };

  return (
    <ChatContainer>
      <ChatBody>
        {messages.length === 1 && (
          <WelcomeMessage>
            <QuickSuggestions>
              <h4 style={{ color: '#2d5016', marginBottom: '15px', textAlign: 'center' }}>
                🚀 Gợi ý nhanh:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {quickSuggestions.map((suggestion, index) => (
                  <QuickButton
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                  >
                    <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>{suggestion.icon}</span>
                    {suggestion.text}
                  </QuickButton>
                ))}
              </div>
            </QuickSuggestions>
          </WelcomeMessage>
        )}

        {messages.map((message) => (
          <MessageContainer key={message.id} $isUser={message.type === 'user'}>
            {message.type === 'user' ? (
              <UserMessage>
                <MessageBubble $isUser={true}>
                  {message.content}
                  <MessageTime>{message.timestamp.toLocaleTimeString()}</MessageTime>
                </MessageBubble>
                <UserAvatar size={40} icon={<UserOutlined />} />
              </UserMessage>
            ) : (
              <AIMessage>
                <AIAvatar size={40} icon={<RobotOutlined />} />
                <MessageBubble $isUser={false}>
                  {message.content}
                  <MessageTime>{message.timestamp.toLocaleTimeString()}</MessageTime>
                  
                  {message.recipes && message.recipes.length > 0 && (
                    <SuggestionsContainer>
                      {message.recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} onClick={() => navigate(`/recipe/detail/${recipe.id}`)}>
                          <RecipeImage src={recipe.image} alt={recipe.title} />
                          <RecipeContent>
                            <RecipeTitle>{recipe.title}</RecipeTitle>
                            <RecipeDesc>{recipe.description}</RecipeDesc>
                            <RecipeMeta>
                              <span><ClockCircleOutlined /> {recipe.time}</span>
                              <span><FireOutlined /> {recipe.difficulty}</span>
                            </RecipeMeta>
                            <div style={{ marginTop: '8px' }}>
                              <strong>Nguyên liệu chính:</strong>
                              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                                {recipe.ingredients.join(', ')}
                              </div>
                            </div>
                          </RecipeContent>
                        </RecipeCard>
                      ))}
                    </SuggestionsContainer>
                  )}
                </MessageBubble>
              </AIMessage>
            )}
          </MessageContainer>
        ))}

        {isLoading && (
          <MessageContainer $isUser={false}>
            <AIMessage>
              <AIAvatar size={40} icon={<RobotOutlined />} />
              <LoadingMessage>
                <Spin size="small" />
                <span style={{ marginLeft: '10px' }}>AI đang suy nghĩ...</span>
              </LoadingMessage>
            </AIMessage>
          </MessageContainer>
        )}

        <div ref={messagesEndRef} />
      </ChatBody>

      <ChatInput>
        <InputContainer>
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Hỏi tôi về món ăn bạn muốn nấu... (VD: Tôi có thịt bò và rau, nấu món gì ngon?)"
            rows={3}
            style={{
              border: 'none',
              background: 'transparent',
              resize: 'none',
              fontSize: '16px',
              lineHeight: '1.5'
            }}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <SendButton
            type="primary"
            icon={<SendOutlined />}
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
          />
        </InputContainer>
      </ChatInput>
    </ChatContainer>
  );
};

export default AIRecommendComponent;
