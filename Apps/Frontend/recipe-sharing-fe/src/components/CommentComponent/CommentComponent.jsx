import React, { use, useEffect, useState } from 'react';
import { Rate, Input, message, Avatar } from 'antd';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import {
  MessageOutlined,
  StarOutlined,
  LikeOutlined,
  ShareAltOutlined,
  UserOutlined,
  HeartOutlined,
  CommentOutlined
} from '@ant-design/icons';

import {
  CommentsContainer,
  CommentsSection,
  CommentStats,
  StatsItem,
  StatsNumber,
  AddCommentForm,
  FormHeader,
  UserAvatar,
  UserInfo,
  UserName,
  RatingInput,
  TextAreaWrapper,
  FormActions,
  SubmitButton,
  CancelButton,
  CommentsList,
  CommentItem,
  CommentHeader,
  CommentAvatar,
  CommentContent,
  CommentMeta,
  CommentAuthor,
  CommentRating,
  CommentDate,
  CommentText,
  CommentActions,
  ActionButton,
  LikeCount,
  ReplySection,
  Reply,
  ReplyHeader,
  ReplyAuthor,
  ReplyDate,
  ReplyText,
  EmptyComments,
  LoadMoreButton,
  ResponsiveWrapper
} from './style';
import newRequest from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const CommentComponent = ({ recipeId }) => {
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [likedComments, setLikedComments] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
useEffect(() => {
      let stompClient;
      let socket;
      
      const connectWebSocket = () => {
          socket = new SockJS('http://localhost:8081/ws'); // Kết nối WebSocket
          stompClient = new Client({
              webSocketFactory: () => socket,
              debug: (str) => console.log('WebSocket Log:', str),
          });
  
          stompClient.onConnect = () => {
              console.log(`Connected to WebSocket for comment ${recipeId}`);
  
              // Subscribe to the payment topic
              stompClient.subscribe(`/topic/message/comment/${recipeId}`, (message) => {
                  const response = message.body;
                 fetchComments(recipeId);
                
                
                  
              });
              //  stompClient.subscribe(`/topic/message/conversation/${selectedChat.id}`, (message) => {
              //     const response = message.body;
              //    if (response === "success") {
              //     loadMessages(selectedChat.id);
              //     handleReadMessage(selectedChat.id);
              //    }
                  
              // });
          };
  
          stompClient.onStompError = (frame) => {
              console.error('STOMP Error:', frame);
          };
  
          stompClient.onDisconnect = () => {
              console.log('Disconnected from WebSocket');
              // Tự động kết nối lại sau 5 giây
              setTimeout(connectWebSocket, 5000); // Sau 5 giây sẽ gọi lại connectWebSocket để thử kết nối lại
          };
  
          stompClient.activate();
      };
  
      connectWebSocket(); // Ban đầu kết nối
  
      // Cleanup WebSocket khi component unmount
      return () => {
          if (stompClient && stompClient.active) {
              stompClient.deactivate();
          }
      };
  }, [recipeId]); // Phụ thuộc vào id và movie.id
  // Sample data - replace with real API data
  const sampleComments = [
    {
      id: 1,
      author: 'Minh Anh',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      date: '2 giờ trước',
      content: 'Công thức tuyệt vời! Tôi đã làm theo và món phở có hương vị rất đậm đà. Nước dùng trong vắt và thơm ngon. Cả nhà đều khen nức nở. Cảm ơn chef đã chia sẻ!',
      likes: 24,
      replies: [
        {
          id: 11,
          author: 'Chef Minh',
          avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&crop=face',
          date: '1 giờ trước',
          content: 'Cảm ơn bạn! Rất vui khi công thức giúp ích được cho gia đình bạn. Chúc bạn có nhiều bữa ăn ngon miệng!'
        }
      ]
    },
    {
      id: 2,
      author: 'Hoàng Nam',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 4,
      date: '5 giờ trước',
      content: 'Làm theo công thức này nhưng tôi thấy cần thêm gia vị một chút. Có thể là do khẩu vị gia đình tôi đậm đà hơn. Nhìn chung vẫn là một công thức rất hay!',
      likes: 18,
      replies: []
    },
    {
      id: 3,
      author: 'Thu Hương',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
      date: '1 ngày trước',
      content: 'Mình là người mới học nấu ăn, lần đầu làm phở mà thành công luôn! Hướng dẫn rất chi tiết và dễ hiểu. Cảm ơn chef nhiều lắm ạ!',
      likes: 32,
      replies: [
        {
          id: 31,
          author: 'Chef Minh',
          avatar: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&crop=face',
          date: '1 ngày trước',
          content: 'Tuyệt vời! Tiếp tục cố gắng nhé, nấu ăn là một hành trình thú vị đấy!'
        }
      ]
    },
    {
      id: 4,
      author: 'Đức Anh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
      rating: 4,
      date: '2 ngày trước',
      content: 'Công thức hay, nhưng theo kinh nghiệm của mình thì nên nướng xương trước khi ninh sẽ thơm hơn. Mọi người thử xem nhé!',
      likes: 15,
      replies: []
    }
  ];
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, [])
  const [comments, setComments] = useState([]);
  const fetchComments = async (recipeId) => {
    try {
      const response = await newRequest.get(`/api/comments/get/all/comment/${recipeId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments(sampleComments); // Fallback to sample data on error
    }
  };
  useEffect(() => {
    fetchComments(recipeId);
  }, [recipeId]);
  // const user = JSON.parse(localStorage.getItem('user'));
  const currentUser = {
    name: 'Bạn',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face'
  };

  // Calculate stats
  const totalComments = comments.reduce((total, comment) => total + 1 + comment.replies.length, 0);
  const averageRating = comments.length > 0 
    ? comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length 
    : 0;
  const totalLikes = comments.reduce((total, comment) => total + comment.likes, 0);

  // Handle comment submission
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      message.warning('Vui lòng nhập nội dung bình luận!');
      return;
    }

    if (newRating === 0) {
      message.warning('Vui lòng đánh giá công thức!');
      return;
    }
    if(!token){
      navigate('/login');
      return;
    }
    setIsSubmitting(true);
        const response = await newRequest.post('/api/comments/add', {
          rating: newRating,
          content: newComment,
          recipeId : recipeId
          
        }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
        setNewComment('');
        setNewRating(0);
        setShowAddForm(false);
        setIsSubmitting(false);
        message.success('Đã thêm bình luận thành công!');
  };

  // Handle like comment
  const handleLikeComment = async (commentId) => {
    const newLikedComments = new Set(likedComments);
    
    if (likedComments.has(commentId)) {
      newLikedComments.delete(commentId);
      message.info('Đã bỏ thích bình luận');
    } else {
      newLikedComments.add(commentId);
      message.success('Đã thích bình luận');
    }
    const response = await newRequest.post(`/api/comment-like/like/${commentId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLikedComments(newLikedComments);

    // Update like count in comments
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            likes: likedComments.has(commentId) 
              ? comment.likes - 1 
              : comment.likes + 1 
          }
        : comment
    ));
  };

  // Handle reply to comment
  const handleReplyToComment = (commentId, authorName) => {
    setReplyingTo(commentId);
    setReplyText(`@${authorName} `);
  };

  // Handle submit reply
  const handleSubmitReply = async (commentId) => {
    if (!replyText.trim() || replyText.trim() === `@${comments.find(c => c.id === commentId)?.author} `) {
      message.warning('Vui lòng nhập nội dung trả lời!');
      return;
    }

    try {
      const newReply = {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        date: 'Vừa xong',
        content: replyText
      };

      const response = await newRequest.post('/api/comment-replies/add', {
          commentId: commentId,
          content: replyText
          
        }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              replies: [...comment.replies, newReply]
            }
          : comment
      ));

      setReplyingTo(null);
      setReplyText('');
      message.success('Đã trả lời bình luận!');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  // Cancel reply
  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText('');
  };

  return (
    <ResponsiveWrapper>
      <CommentsContainer>
        <CommentsSection title={`💬 Bình luận (${totalComments})`}>
          {/* Comment Stats */}
          <CommentStats>
            <StatsItem>
              <MessageOutlined />
              <span>Tổng bình luận:</span>
              <StatsNumber>{totalComments}</StatsNumber>
            </StatsItem>
            <StatsItem>
              <StarOutlined />
              <span>Đánh giá trung bình:</span>
              <StatsNumber>{averageRating.toFixed(1)}</StatsNumber>
              <Rate disabled value={averageRating} style={{ fontSize: '14px' }} />
            </StatsItem>
            <StatsItem>
              <HeartOutlined />
              <span>Tổng lượt thích:</span>
              <StatsNumber>{totalLikes}</StatsNumber>
            </StatsItem>
          </CommentStats>

          {/* Add Comment Form */}
          {!showAddForm ? (
            <AddCommentForm>
              <div style={{ textAlign: 'center' }}>
                <SubmitButton 
                  onClick={() => setShowAddForm(true)}
                  icon={<CommentOutlined />}
                >
                  Thêm bình luận của bạn
                </SubmitButton>
              </div>
            </AddCommentForm>
          ) : (
            <AddCommentForm>
              <FormHeader>
                <UserAvatar 
                  src={currentUser.avatar} 
                  size={45} 
                  icon={<UserOutlined />} 
                />
                <UserInfo>
                  <UserName>{currentUser.name}</UserName>
                  <RatingInput>
                    <span>Đánh giá của bạn:</span>
                    <Rate
                      value={newRating}
                      onChange={setNewRating}
                      style={{ 
                        color: '#ff8c00',
                        fontSize: '18px'
                      }}
                      character="★"
                      allowHalf={false}
                    />
                  </RatingInput>
                </UserInfo>
              </FormHeader>

              <TextAreaWrapper>
                <TextArea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn về công thức này... (VD: Món ăn có vị như thế nào? Có khó làm không? Bạn có gợi ý gì?)"
                  rows={4}
                  maxLength={1000}
                  showCount
                />
              </TextAreaWrapper>

              <FormActions>
                <CancelButton 
                  onClick={() => {
                    setShowAddForm(false);
                    setNewComment('');
                    setNewRating(0);
                  }}
                >
                  Hủy
                </CancelButton>
                <SubmitButton 
                  loading={isSubmitting}
                  onClick={handleSubmitComment}
                  icon={<MessageOutlined />}
                >
                  {isSubmitting ? 'Đang đăng...' : 'Đăng bình luận'}
                </SubmitButton>
              </FormActions>
            </AddCommentForm>
          )}

          {/* Comments List */}
          {comments.length === 0 ? (
            <EmptyComments>
              <div className="empty-icon">💬</div>
              <h4>Chưa có bình luận nào</h4>
              <p>Hãy là người đầu tiên chia sẻ trải nghiệm về công thức này!</p>
            </EmptyComments>
          ) : (
            <CommentsList>
              {comments.map((comment, index) => (
                <CommentItem key={comment.id} index={index}>
                  <CommentHeader>
                    <CommentAvatar 
                      src={comment.avatar} 
                      size={45} 
                      icon={<UserOutlined />} 
                    />
                    <CommentContent>
                      <CommentMeta>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentRating>
                          <Rate 
                            disabled 
                            value={comment.rating} 
                            style={{ fontSize: '12px', color: '#ff8c00' }} 
                          />
                        </CommentRating>
                        <CommentDate>{comment.date}</CommentDate>
                      </CommentMeta>
                      
                      <CommentText>{comment.content}</CommentText>
                      
                      <CommentActions>
                        <ActionButton
                          className={likedComments.has(comment.id) ? 'liked' : ''}
                          onClick={() => handleLikeComment(comment.id)}
                        >
                          <LikeOutlined />
                          <span>Thích</span>
                          <LikeCount>({comment.likes})</LikeCount>
                        </ActionButton>
                        
                        <ActionButton
                          onClick={() => handleReplyToComment(comment.id, comment.author)}
                        >
                          <MessageOutlined />
                          <span>Trả lời</span>
                        </ActionButton>
                        
                        <ActionButton>
                          <ShareAltOutlined />
                          <span>Chia sẻ</span>
                        </ActionButton>
                      </CommentActions>
                      
                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div style={{ marginTop: '15px', paddingLeft: '50px' }}>
                          <div style={{ 
                            background: 'rgba(45, 80, 22, 0.05)',
                            borderRadius: '12px',
                            padding: '15px',
                            border: '1px solid rgba(45, 80, 22, 0.1)'
                          }}>
                            <TextArea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder={`Trả lời ${comment.author}...`}
                              rows={3}
                              style={{
                                border: '1px solid rgba(45, 80, 22, 0.2)',
                                borderRadius: '8px',
                                marginBottom: '10px'
                              }}
                            />
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                              <CancelButton
                                size="small"
                                onClick={handleCancelReply}
                                style={{ height: '32px', padding: '0 15px' }}
                              >
                                Hủy
                              </CancelButton>
                              <SubmitButton
                                size="small"
                                onClick={() => handleSubmitReply(comment.id)}
                                style={{ height: '32px', padding: '0 15px' }}
                              >
                                Trả lời
                              </SubmitButton>
                            </div>
                          </div>
                        </div>
                      )}
                    </CommentContent>
                  </CommentHeader>

                  {/* Replies */}
                  {(comment.replies.length > 0 || replyingTo === comment.id) && (
                    <ReplySection>
                      {comment.replies.map((reply) => (
                        <Reply key={reply.id}>
                          <ReplyHeader>
                            <Avatar 
                              src={reply.avatar} 
                              size={25} 
                              icon={<UserOutlined />} 
                            />
                            <ReplyAuthor>{reply.author}</ReplyAuthor>
                            <ReplyDate>{reply.date}</ReplyDate>
                          </ReplyHeader>
                          <ReplyText>{reply.content}</ReplyText>
                        </Reply>
                      ))}
                    </ReplySection>
                  )}
                </CommentItem>
              ))}
            </CommentsList>
          )}

          {/* Load More Button */}
          {comments.length > 0 && (
            <LoadMoreButton>
              Xem thêm bình luận
            </LoadMoreButton>
          )}
        </CommentsSection>
      </CommentsContainer>
    </ResponsiveWrapper>
  );
};

export default CommentComponent;
