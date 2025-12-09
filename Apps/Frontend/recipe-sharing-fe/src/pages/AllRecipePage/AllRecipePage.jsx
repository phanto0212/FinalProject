import React, { useState, useEffect, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Avatar, Badge, Button, Tabs, Modal, Select, Upload, Form, message, Checkbox, Spin } from 'antd';
import { 
  faSearch, 
  faHeart,
  faComment,
  faShare,
  faBookmark,
  faPlus,
  faUsers,
  faCrown,
  faVideo,
  faCamera,
  faEllipsisH,
  faThumbsUp,
  faEye,
  faUpload,
  faTimes,
  faClock,
  faUtensils,
  faUserPlus,
  faUserCheck,
  faPaperPlane,
  faCopy,
  faLink,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import CommentComponent from '../../components/CommentComponent/CommentComponent';
import {
  SocialContainer,
  MainContent,
  LeftSidebar,
  FeedArea,
  SectionTitle,
  SuggestedFriendsSection,
  FriendItem,
  FeedPost,
  PostHeader,
  PostUser,
  PostTime,
  PostOptions,
  PostContent,
  PostImage,
  PostDescription,
  PostActions,
  PostAction,
  PostStats,
  CreatePostButton,
  TabContent,
  TabsWrapper,
  CreatePostModal,
  PostForm,
  ImageUploadArea,
  RecipeFormSection,
  IngredientList,
  IngredientItem,
  StepList,
  StepItem,
  FormActions
} from './style';
import newRequest from '../../utils/request';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

// Sample data for social media features
const feedPosts = [
  {
    id: 1,
    user: {
      name: 'Chef Minh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      isVerified: true
    },
    time: '2 giờ trước',
    content: {
      text: 'Vừa hoàn thành món Phở Bò đặc biệt với công thức gia truyền! Nước dùng trong vắt, thơm ngon đậm đà 🍜✨',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500&h=400&fit=crop'
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 12,
      views: 1200
    }
  },
  {
    id: 2,
    user: {
      name: 'Chef Lan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=50&h=50&fit=crop&crop=face',
      isVerified: false
    },
    time: '4 giờ trước',
    content: {
      text: 'Bánh Mì Việt Nam - Sự kết hợp hoàn hảo giữa Đông và Tây! Ai đã thử công thức này chưa? 🥖',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop'
    },
    stats: {
      likes: 189,
      comments: 32,
      shares: 8,
      views: 890
    }
  },
  {
    id: 3,
    user: {
      name: 'Chef Tuấn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      isVerified: true
    },
    time: '6 giờ trước',
    content: {
      text: 'Cơm Tấm Sài Gòn authentic - Từng hạt cơm tấm đều thấm đẫm hương vị miền Nam! 🍚',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=400&fit=crop'
    },
    stats: {
      likes: 312,
      comments: 67,
      shares: 23,
      views: 1567
    }
  }
];

const AllRecipePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [form] = Form.useForm();
  const [ingredients, setIngredients] = useState([{ ingredientId: '', quantity: '', unit: '' }]);
  const [steps, setSteps] = useState(['']);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [postStats, setPostStats] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [feedPosts, setFeedPosts] = useState([]); // Add this state
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set()); // Track followed users
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  
  // Share modal states
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePostId, setSharePostId] = useState(null);
  const [shareUsers, setShareUsers] = useState([]);
  const [selectedShareUsers, setSelectedShareUsers] = useState([]);
  const [shareSearchTerm, setShareSearchTerm] = useState('');
  const [loadingShareUsers, setLoadingShareUsers] = useState(false);
  const [sendingShare, setSendingShare] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  // Helper function to convert base64 to blob
  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Common units for ingredients
  const commonUnits = [
    { value: 'g', label: 'gram (g)' },
    { value: 'kg', label: 'kilogram (kg)' },
    { value: 'ml', label: 'milliliter (ml)' },
    { value: 'l', label: 'liter (l)' },
    { value: 'tsp', label: 'muỗng cà phê (tsp)' },
    { value: 'tbsp', label: 'muỗng canh (tbsp)' },
    { value: 'cup', label: 'cốc (cup)' },
    { value: 'piece', label: 'cái/miếng' },
    { value: 'slice', label: 'lát' },
    { value: 'clove', label: 'tép (tỏi)' },
    { value: 'bunch', label: 'bó/nắm' },
    { value: 'package', label: 'gói' },
    { value: 'can', label: 'lon/hộp' },
    { value: 'bottle', label: 'chai' },
    { value: 'pinch', label: 'nhúm' },
    { value: 'dash', label: 'chút' }
  ];

  
  // Initialize post stats when feedPosts changes
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    const initialStats = {};
    feedPosts.forEach(post => {
      if (post.stats) {
        initialStats[post.id] = { ...post.stats };
      }
    });
    setPostStats(initialStats);
  }, [feedPosts]);

  // Load suggested friends from API
  const loadSuggestFriends = async () => {
    try {
      const response = await newRequest.get('/api/user/followers/suggest/friends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const friends = response.data.suggestedUsers || [];
      setSuggestedFriends(friends);
    } catch (error) {
      console.log("Error fetching suggested friends:", error);
      // Fallback với sample data nếu API lỗi
      setSuggestedFriends([
        {
          id: 1,
          name: 'Chef Gordon',
          followers: '1.2M',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
          isVerified: true,
          mutualFriends: 12
        },
        {
          id: 2,
          name: 'Chef Julia',
          followers: '890K',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=60&h=60&fit=crop&crop=face',
          isVerified: true,
          mutualFriends: 8
        },
        {
          id: 3,
          name: 'Chef Tony',
          followers: '654K',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
          isVerified: false,
          mutualFriends: 5
        },
        {
          id: 4,
          name: 'Chef Mai Linh',
          followers: '432K',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
          isVerified: true,
          mutualFriends: 15
        },
        {
          id: 5,
          name: 'Chef Minh Duc',
          followers: '321K',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face',
          isVerified: false,
          mutualFriends: 3
        }
      ]);
    }
  };

  useEffect(() => {
    loadSuggestFriends();
    getAllPost();
    getAvailableIngredients();
    loadFollowedUsers(); 
  }, []);
  const getAllPost = async () => {
    try {
     const response = await newRequest.get('/api/recipes/get/all/recipe/post', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      const posts = response.data.posts || [];
      console.log("Fetched posts from API:", posts);
      
      // Transform API data to match expected format
      const transformedPosts = posts.map(post => ({
        ...post,
        stats: post.stats || {
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0,
          views: post.views || 0
        },
        user: {
          name: post.user?.name || post.author || 'Anonymous',
          avatar: post.user?.avatar || post.userAvatar || 'https://via.placeholder.com/50',
          isVerified: post.user?.verified || post.isVerified || false,
          id: post.user?.id || null
        },
        content: post.content || {
          text: post.description || '',
          image: post.image || post.images?.[0] || ''
        },
        time: post.time || 'Vừa xong',
        isLiked: post.liked || post.isLiked || false,
        isFavorite: post.favorite || post.isFavorite || false
      }));
      
      setFeedPosts(transformedPosts);
      
      // Load liked posts từ API response (check cả liked và isLiked)
      const likedPostIds = posts
        .filter(post => post.liked === true || post.isLiked === true)
        .map(post => post.id);
      setLikedPosts(new Set(likedPostIds));
      
      // Load saved posts từ API response (check cả favorite và isFavorite)
      const savedPostIds = posts
        .filter(post => post.favorite === true || post.isFavorite === true)
        .map(post => post.id);
      setSavedPosts(new Set(savedPostIds));
      
      console.log("All posts fetched:", transformedPosts);
      console.log("Liked posts:", likedPostIds);
      console.log("Saved posts:", savedPostIds);
    } catch (error) {
      console.log("Error fetching all posts:", error);
    }
  };

  // Fetch available ingredients from API
  const getAvailableIngredients = async () => {
    try {
      const response = await newRequest.get('/api/ingredients/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Assuming API returns array of {id, name} objects
      const ingredientsList = response.data.ingredients || response.data || [];
      setAvailableIngredients(ingredientsList);
      console.log("Available ingredients:", ingredientsList);
    } catch (error) {
      console.log("Error fetching ingredients:", error);
      // Fallback with some sample ingredients
      setAvailableIngredients([
        { id: 1, name: 'Thịt bò' },
        { id: 2, name: 'Thịt heo' },
        { id: 3, name: 'Thịt gà' },
        { id: 4, name: 'Cá hồi' },
        { id: 5, name: 'Tôm' },
        { id: 6, name: 'Gạo tẻ' },
        { id: 7, name: 'Bánh phở' },
        { id: 8, name: 'Bún tươi' },
        { id: 9, name: 'Hành tây' },
        { id: 10, name: 'Tỏi' },
        { id: 11, name: 'Gừng' },
        { id: 12, name: 'Ớt' },
        { id: 13, name: 'Rau thơm' },
        { id: 14, name: 'Nước mắm' },
        { id: 15, name: 'Đường' },
        { id: 16, name: 'Muối' },
        { id: 17, name: 'Dầu ăn' },
        { id: 18, name: 'Trứng gà' }
      ]);
    }
  };

  const loadFollowedUsers = async () => {
    try {

      const response = await newRequest.get('/api/user/followers/get/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      let followedUserIds = [];
      
      if (response.data) {
        if (Array.isArray(response.data)) {
          if (response.data.length > 0 && typeof response.data[0] === 'number') {
            followedUserIds = response.data;
          } else if (response.data.length > 0 && response.data[0].id) {
            followedUserIds = response.data.map(user => user.id);
          }
        } else if (response.data.followingIds) {
          followedUserIds = response.data.followingIds;
        } else if (response.data.data) {
          followedUserIds = response.data.data.map(user => user.id);
        }
      }
      
      setFollowedUsers(new Set(followedUserIds));
      console.log("Loaded followed users (users that current user follows):", followedUserIds);
      
    } catch (error) {
      console.error('Error loading followed users:', error);
      // Fallback - set empty nếu API lỗi (chưa follow ai)
      setFollowedUsers(new Set());
    }
  };

  // Functions for create post form
  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientId: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    };
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleImageUpload = (file) => {
    // Chỉ cho phép 1 ảnh duy nhất
    if (uploadedImages.length >= 1) {
      message.warning('Chỉ được phép upload 1 ảnh cho món ăn!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // Lưu cả base64 và file object gốc
      const imageData = {
        base64: e.target.result,
        file: file,
        name: file.name
      };
      setUploadedImages([imageData]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload
  };

  const removeImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleCreatePost = async (values) => {
  try {
    // Validate required image
    if (uploadedImages.length === 0) {
      message.error('Vui lòng thêm ít nhất 1 hình ảnh cho món ăn!');
      return;
    }

    // Lọc dữ liệu hợp lệ
    const filteredIngredients = ingredients.filter(
      (ing) => ing.ingredientId && ing.quantity.trim()
    );
    const filteredSteps = steps.filter((step) => step.trim());

    // Tạo FormData để gửi multipart/form-data
    const formData = new FormData();
    formData.append('recipeName', values.recipeName);
    formData.append('author', 'Current User'); // Hoặc lấy từ context/auth
    formData.append('category', values.category);
    formData.append('cookTime', values.cookTime);
    formData.append('description', values.description || '');
    formData.append('servings', values.servings || '');
    formData.append('calories', values.calories || '');
    formData.append('protein', values.protein || '');
    formData.append('carbs', values.carbs || '');
    formData.append('fat', values.fat || '');
    formData.append('difficulty', values.difficulty || '');
    formData.append('subtitle', values.subtitle || '');
    formData.append('steps', JSON.stringify(filteredSteps));
    formData.append('ingredients', JSON.stringify(filteredIngredients));

    // Append images
    if (uploadedImages.length > 0) {
      const imageData = uploadedImages[0];
      formData.append('images', imageData.file);
    }

    // Gửi request
    const response = await newRequest.post('/api/recipes/add/post', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      alert('Tạo bài viết thành công! Chờ duyệt nha');
    }

    // Reset form
    form.resetFields();
    setIngredients([{ ingredientId: '', quantity: '', unit: '' }]);
    setSteps(['']);
    setUploadedImages([]);
    setShowCreatePost(false);
  } catch (error) {
    console.error(error);
    message.error('Có lỗi xảy ra khi tạo bài viết!');
  }
};

  const resetForm = () => {
    form.resetFields();
    setIngredients([{ ingredientId: '', quantity: '', unit: '' }]);
    setSteps(['']);
    setUploadedImages([]);
  };

  // Like functionality với optimistic update
  const handleLike = async (postId) => {
    if (!token) {
      message.warning('Vui lòng đăng nhập để thích bài viết!');
      return;
    }

    // Lưu trạng thái hiện tại để rollback nếu lỗi
    const wasLiked = likedPosts.has(postId);
    const originalStats = { ...postStats };
    
    // Optimistic UI update - cập nhật ngay lập tức
    const newLikedPosts = new Set(likedPosts);
    const newPostStats = { ...postStats };
    
    // Tìm post để lấy stats
    const currentPost = feedPosts.find(post => post.id === postId);
    if (!currentPost) return;
    
    // Khởi tạo stats nếu chưa có
    if (!newPostStats[postId]) {
      newPostStats[postId] = { ...currentPost.stats };
    }

    if (wasLiked) {
      // Unlike
      newLikedPosts.delete(postId);
      newPostStats[postId].likes = Math.max(0, newPostStats[postId].likes - 1);
    } else {
      // Like
      newLikedPosts.add(postId);
      newPostStats[postId].likes = newPostStats[postId].likes + 1;
    }

    // Cập nhật UI ngay lập tức
    setLikedPosts(newLikedPosts);
    setPostStats(newPostStats);

    try {
      // Call API
      await newRequest.post(`/api/recipes/like/recipe/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success(wasLiked ? 'Đã bỏ thích bài viết!' : 'Đã thích bài viết!');
    } catch (error) {
      // Rollback nếu API lỗi
      setLikedPosts(likedPosts);
      setPostStats(originalStats);
      
      console.error('Error toggling like:', error);
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  const handleSave = async (postId) => {
    const newSavedPosts = new Set(savedPosts);
    
    if (savedPosts.has(postId)) {
      // Unsave
      newSavedPosts.delete(postId);
      message.success('Đã bỏ lưu bài viết!');
    } else {
      // Save
      newSavedPosts.add(postId);
      message.success('Đã lưu bài viết!');
    }
    const reponse = await newRequest.post(`/api/recipes/save/recipe/${postId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Save/Unsave response:', reponse.data);
    
    setSavedPosts(newSavedPosts);
  };

  const handleComment = (postId) => {
    setCurrentPostId(postId);
    setShowComments(true);
  };

  const handleShare = async (postId) => {
    setSharePostId(postId);
    setShowShareModal(true);
    setSelectedShareUsers([]);
    setShareMessage('');
    setShareSearchTerm('');
    await loadShareUsers();
  };

  // Load users for sharing
  const loadShareUsers = async () => {
    setLoadingShareUsers(true);
    try {
      // Lấy danh sách tất cả người dùng để share
      const response = await newRequest.get('/api/user/followers/get/all/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      let users = [];
      if (response.data) {
        users = response.data.users || [];
      }
      
      // Đảm bảo users là array
      if (Array.isArray(users)) {
        setShareUsers(users);
      } else {
        setShareUsers([]);
      }
    } catch (error) {
      console.error('Error loading share users:', error);
      // Fallback với suggested friends nếu API lỗi
      setShareUsers(Array.isArray(suggestedFriends) ? suggestedFriends : []);
    } finally {
      setLoadingShareUsers(false);
    }
  };

  // Toggle user selection for sharing
  const toggleShareUser = (userId) => {
    setSelectedShareUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  // Send share to selected users
  const handleSendShare = async () => {
    if (selectedShareUsers.length === 0) {
      message.warning('Vui lòng chọn ít nhất một người để chia sẻ!');
      return;
    }

    setSendingShare(true);
    try {
      // Gửi share đến từng user đã chọn
      const sharePromises = selectedShareUsers.map(userId => 
        newRequest.post('/api/chat/send/share/message', {
          recipeId: sharePostId,
          receiverId: userId,
          message: shareMessage || 'Đã chia sẻ một công thức với bạn!'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      await Promise.all(sharePromises);
      
      alert(`Đã chia sẻ bài viết đến ${selectedShareUsers.length} người!`);
      setShowShareModal(false);
      setSelectedShareUsers([]);
      setShareMessage('');
    } catch (error) {
      console.error('Error sharing post:', error);
      message.error('Có lỗi xảy ra khi chia sẻ. Vui lòng thử lại!');
    } finally {
      setSendingShare(false);
    }
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/recipe/detail/${sharePostId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      message.success('Đã sao chép link bài viết!');
    }).catch(() => {
      message.error('Không thể sao chép link!');
    });
  };

  // Filter share users based on search
  const filteredShareUsers = shareUsers.filter(user => 
    (user.name || user.username || '').toLowerCase().includes(shareSearchTerm.toLowerCase())
  );

  const handleUserClick = (userId, username) => {
    // Navigate to user profile page
    if (userId) {
      navigate(`/user/info/${userId}`);
    } else if (username) {
      navigate(`/user/info/${username}`);
    }
  };

  const handleFollowUser = async (userId, userName) => {
    if (!token) {
      message.warning('Vui lòng đăng nhập để theo dõi người dùng!');
      return;
    }

    // Lưu trạng thái hiện tại để rollback nếu lỗi
    const wasFollowing = followedUsers.has(userId);
    const newFollowedUsers = new Set(followedUsers);

    // Optimistic UI update
    if (wasFollowing) {
      // Unfollow
      newFollowedUsers.delete(userId);
      setFollowedUsers(newFollowedUsers);
      message.success(`Đã bỏ theo dõi ${userName}!`);
    } else {
      // Follow
      newFollowedUsers.add(userId);
      setFollowedUsers(newFollowedUsers);
      message.success(`Đã theo dõi ${userName}!`);
    }

    try {
      // Call API to follow/unfollow
      const response = await newRequest.post(`/api/user/followers/add/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(`${wasFollowing ? 'Unfollowed' : 'Followed'} user ${userId}:`, response.data);
    } catch (error) {
      // Rollback nếu API lỗi
      setFollowedUsers(followedUsers);
      
      console.error('Error following/unfollowing user:', error);
      message.error(`Không thể ${wasFollowing ? 'bỏ theo dõi' : 'theo dõi'} ${userName}. Vui lòng thử lại!`);
    }
  };

  return (
    <DefaultComponent>
      <SocialContainer style={{ marginTop: '80px' }}>
        {/* Main Content */}
        <MainContent>
          {/* Left Sidebar */}
          <LeftSidebar>
            {/* Suggested Friends */}
            <SuggestedFriendsSection>
              <SectionTitle style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <FontAwesomeIcon 
                  icon={faUsers} 
                  style={{
                    color: '#2d5016',
                    fontSize: '16px'
                  }}
                />
                Gợi ý kết bạn
              </SectionTitle>
              {suggestedFriends.map((friend) => (
                <FriendItem key={friend.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid #f3f4f6',
                  marginBottom: '10px',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s ease',
                  minHeight: '65px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.08)';
                }}
                >
                  <div style={{
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '10px', 
                    flex: 1,
                    minWidth: 0,
                    paddingRight: '10px'
                  }}>
                    <Avatar 
                      src={friend.avatar} 
                      size={40} 
                      style={{ 
                        cursor: 'pointer',
                        border: '2px solid #f8f9fa',
                        flexShrink: 0
                      }}
                      onClick={() => handleUserClick(friend.id, friend.name)}
                    />
                    <div style={{ 
                      flex: 1, 
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}>
                      <div 
                        style={{
                          fontWeight: '600', 
                          color: '#1f2937', 
                          fontSize: '12px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '4px',
                          cursor: 'pointer',
                          transition: 'color 0.2s ease',
                          lineHeight: '1.2',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                        onClick={() => handleUserClick(friend.id, friend.name)}
                        onMouseEnter={(e) => e.target.style.color = '#2d5016'}
                        onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                      >
                        <span style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          flex: 1
                        }}>
                          {friend.name}
                        </span>
                        {friend.isVerified && (
                          <FontAwesomeIcon 
                            icon={faCrown} 
                            style={{
                              color: '#ffd700', 
                              fontSize: '10px',
                              flexShrink: 0
                            }} 
                          />
                        )}
                      </div>
                      <div style={{
                        fontSize: '10px', 
                        color: '#6b7280',
                        fontWeight: '500',
                        lineHeight: '1.2'
                      }}>
                        <div>{friend.mutualFriends} bạn chung • {friend.followers} theo dõi</div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="small" 
                    type={followedUsers.has(friend.id) ? "default" : "primary"}
                    icon={<FontAwesomeIcon 
                      icon={followedUsers.has(friend.id) ? faUserCheck : faUserPlus} 
                      style={{ fontSize: '10px' }}
                    />}
                    style={{
                      borderRadius: '14px',
                      fontSize: '10px',
                      height: '26px',
                      padding: '0 10px',
                      minWidth: '80px',
                      background: followedUsers.has(friend.id) 
                        ? '#f3f4f6' 
                        : 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
                      border: followedUsers.has(friend.id) 
                        ? '1px solid #d1d5db' 
                        : 'none',
                      color: followedUsers.has(friend.id) 
                        ? '#6b7280' 
                        : 'white',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '3px',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      if (followedUsers.has(friend.id)) {
                        e.target.style.background = '#fef2f2';
                        e.target.style.color = '#dc2626';
                        e.target.style.borderColor = '#fca5a5';
                      } else {
                        e.target.style.background = 'linear-gradient(135deg, #1f3a0f 0%, #3a6b47 100%)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (followedUsers.has(friend.id)) {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.color = '#6b7280';
                        e.target.style.borderColor = '#d1d5db';
                      } else {
                        e.target.style.background = 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)';
                      }
                    }}
                    onClick={() => handleFollowUser(friend.id, friend.name)}
                  >
                    {followedUsers.has(friend.id) ? 'Đã theo dõi' : 'Theo dõi'}
                  </Button>
                </FriendItem>
              ))}
            </SuggestedFriendsSection>
          </LeftSidebar>

          {/* Feed Area */}
          <FeedArea>
            <CreatePostButton onClick={() => setShowCreatePost(true)}>
              <Avatar size={40} />
              <span>Chia sẻ công thức mới của bạn...</span>
              <div>
                <Button icon={<FontAwesomeIcon icon={faCamera} />}>Ảnh</Button>
                <Button icon={<FontAwesomeIcon icon={faVideo} />}>Video</Button>
              </div>
            </CreatePostButton>

            <TabsWrapper>
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab="Bảng tin" key="feed" >
                  <TabContent>
                    {feedPosts.map(post => (
                      <FeedPost key={post.id}>
                        <PostHeader>
                          <PostUser>
                            <Avatar 
                              src={post.user.avatar} 
                              size={45} 
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleUserClick(post.user.id , post.user.name)}
                            />
                            <div>
                              <div 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleUserClick(post.user.id, post.user.name)}
                              >
                                {post.user.name}
                                {post.user.isVerified && (
                                  <FontAwesomeIcon icon={faCrown} style={{marginLeft: '5px', color: '#ffd700'}} />
                                )}
                              </div>
                              <PostTime>{post.time}</PostTime>
                            </div>
                          </PostUser>
                          <PostOptions>
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </PostOptions>
                        </PostHeader>

                        <PostContent>
                          <PostDescription>{post.content.text}</PostDescription>
                          <PostImage 
                            src={post.content.image} 
                            alt="Food" 
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/recipe/detail/${post.id}`)}
                          />
                          {/* Nút xem chi tiết */}
                          <div 
                            onClick={() => navigate(`/recipe/detail/${post.id}`)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              padding: '12px 20px',
                              marginTop: '12px',
                              background: 'linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%)',
                              border: '1px solid #2d5016',
                              borderRadius: '10px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              color: '#2d5016',
                              fontWeight: '600',
                              fontSize: '14px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'linear-gradient(135deg, #f8fffe 0%, #f0fff0 100%)';
                              e.currentTarget.style.color = '#2d5016';
                            }}
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                            Xem chi tiết công thức
                          </div>
                        </PostContent>

                        <PostStats>
                          <span><FontAwesomeIcon icon={faEye} /> {postStats[post.id]?.views || post.stats.views}</span>
                          <span>{postStats[post.id]?.likes || post.stats.likes} lượt thích • {postStats[post.id]?.comments || post.stats.comments} bình luận</span>
                        </PostStats>

                        <PostActions>
                          <PostAction 
                            onClick={() => handleLike(post.id)}
                            style={{ 
                              color: likedPosts.has(post.id) ? '#ef4444' : '#6b7280',
                              fontWeight: likedPosts.has(post.id) ? '600' : '500'
                            }}
                          >
                            <FontAwesomeIcon icon={faThumbsUp} />
                            Thích
                          </PostAction>
                          <PostAction onClick={() => handleComment(post.id)}>
                            <FontAwesomeIcon icon={faComment} />
                            Bình luận
                          </PostAction>
                          <PostAction onClick={() => handleShare(post.id)}>
                            <FontAwesomeIcon icon={faShare} />
                            Chia sẻ
                          </PostAction>
                          <PostAction 
                            onClick={() => handleSave(post.id)}
                            style={{ 
                              color: savedPosts.has(post.id) ? '#f59e0b' : '#6b7280',
                              fontWeight: savedPosts.has(post.id) ? '600' : '500'
                            }}
                          >
                            <FontAwesomeIcon icon={faBookmark} />
                            Lưu
                          </PostAction>
                        </PostActions>
                      </FeedPost>
                    ))}
                  </TabContent>
                </TabPane>
              </Tabs>
            </TabsWrapper>
          </FeedArea>
        </MainContent>

        {/* Create Post Modal */}
        <CreatePostModal
          title="Tạo công thức mới"
          open={showCreatePost}
          onCancel={() => {
            setShowCreatePost(false);
            resetForm();
          }}
          width={800}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreatePost}
          >
            <PostForm>
              {/* Basic Info */}
              <RecipeFormSection>
                <h3>Thông tin cơ bản</h3>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Tên món ăn"
                      name="recipeName"
                      rules={[{ required: true, message: 'Vui lòng nhập tên món ăn!' }]}
                    >
                      <Input placeholder="VD: Phở Bò Hà Nội" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Danh mục"
                      name="category"
                      rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                    >
                      <Select placeholder="Chọn danh mục">
                        <Option value="mon-chinh">Món chính</Option>
                        <Option value="mon-khai-vi">Món khai vị</Option>
                        <Option value="trang-mieng">Tráng miệng</Option>
                        <Option value="do-uong">Đồ uống</Option>
                        <Option value="an-vat">Ăn vặt</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Thời gian nấu"
                      name="cookTime"
                      rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
                    >
                      <Input placeholder="VD: 30 phút" prefix={<FontAwesomeIcon icon={faClock} />} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Độ khó"
                      name="difficulty"
                      rules={[{ required: true, message: 'Vui lòng chọn độ khó!' }]}
                    >
                      <Select placeholder="Chọn độ khó">
                        <Option value="dễ">Dễ</Option>
                        <Option value="trung-binh">Trung bình</Option>
                        <Option value="khó">Khó</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label="Số người ăn"
                      name="servings"
                      rules={[{ required: true, message: 'Vui lòng nhập số người ăn!' }]}
                    >
                      <Input placeholder="VD: 4 người" prefix={<FontAwesomeIcon icon={faUsers} />} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Mô tả món ăn"
                  name="description"
                  rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                  <TextArea 
                    rows={3} 
                    placeholder="Mô tả ngắn gọn về món ăn, hương vị, nguồn gốc..."
                  />
                </Form.Item>

                <Form.Item
                  label="Tiêu đề phụ"
                  name="subtitle"
                >
                  <Input placeholder="VD: Món ăn truyền thống, phù hợp cho cả gia đình" />
                </Form.Item>
              </RecipeFormSection>

              {/* Nutrition Info */}
              <RecipeFormSection>
                <h3>Thông tin dinh dưỡng</h3>
                <Row gutter={16}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label="Calories"
                      name="calories"
                    >
                      <Input 
                        placeholder="VD: 350" 
                        type="number"
                        suffix="kcal"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label="Protein"
                      name="protein"
                    >
                      <Input 
                        placeholder="VD: 25g" 
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label="Carbs"
                      name="carbs"
                    >
                      <Input 
                        placeholder="VD: 45g" 
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label="Fat"
                      name="fat"
                    >
                      <Input 
                        placeholder="VD: 12g" 
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </RecipeFormSection>

              {/* Images */}
              <RecipeFormSection>
                <h3>Hình ảnh món ăn <span style={{ color: '#ff4d4f' }}>*</span></h3>
                <ImageUploadArea>
                  {uploadedImages.length === 0 ? (
                    <Upload
                      beforeUpload={handleImageUpload}
                      showUploadList={false}
                      accept="image/*"
                    >
                      <Button 
                        icon={<FontAwesomeIcon icon={faCamera} />}
                        style={{
                          borderColor: '#ff4d4f',
                          borderStyle: 'dashed',
                          borderWidth: '2px',
                          height: '80px',
                          fontSize: '16px'
                        }}
                      >
                        <div>
                          <div>Thêm hình ảnh *</div>
                          <small style={{ color: '#666', fontSize: '12px' }}>
                            Bắt buộc phải có ít nhất 1 ảnh
                          </small>
                        </div>
                      </Button>
                    </Upload>
                  ) : (
                    <div className="image-preview">
                      <div className="preview-item">
                        <img src={uploadedImages[0]?.base64} alt="Preview món ăn" />
                        <button 
                          type="button"
                          onClick={() => setUploadedImages([])}
                          className="remove-btn"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                      <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <Upload
                          beforeUpload={handleImageUpload}
                          showUploadList={false}
                          accept="image/*"
                        >
                          <Button size="small" icon={<FontAwesomeIcon icon={faCamera} />}>
                            Thay đổi ảnh
                          </Button>
                        </Upload>
                      </div>
                    </div>
                  )}
                </ImageUploadArea>
              </RecipeFormSection>

              {/* Ingredients */}
              <RecipeFormSection>
                <h3>Nguyên liệu</h3>
                <IngredientList>
                  {ingredients.map((ingredient, index) => (
                    <IngredientItem key={index}>
                      <Row gutter={8} style={{ width: '100%', alignItems: 'center' }}>
                        <Col xs={12} sm={12}>
                          <Select
                            placeholder="Chọn nguyên liệu..."
                            value={ingredient.ingredientId || undefined}
                            onChange={(value) => updateIngredient(index, 'ingredientId', value)}
                            showSearch
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {availableIngredients.map((ing) => (
                              <Option key={ing.id} value={ing.id}>
                                {ing.name}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col xs={6} sm={6}>
                          <Input
                            placeholder="Số lượng"
                            type="number"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                          />
                        </Col>
                        <Col xs={4} sm={4}>
                          <Select
                            placeholder="Đơn vị"
                            value={ingredient.unit || undefined}
                            onChange={(value) => updateIngredient(index, 'unit', value)}
                            style={{ width: '100%' }}
                          >
                            {commonUnits.map((unit) => (
                              <Option key={unit.value} value={unit.value}>
                                {unit.label}
                              </Option>
                            ))}
                          </Select>
                        </Col>
                        <Col xs={2} sm={2}>
                          {ingredients.length > 1 && (
                            <Button 
                              type="text" 
                              danger
                              icon={<FontAwesomeIcon icon={faTimes} />}
                              onClick={() => removeIngredient(index)}
                            />
                          )}
                        </Col>
                      </Row>
                    </IngredientItem>
                  ))}
                  <Button type="dashed" onClick={addIngredient} style={{ width: '100%' }}>
                    + Thêm nguyên liệu
                  </Button>
                </IngredientList>
              </RecipeFormSection>

              {/* Steps */}
              <RecipeFormSection>
                <h3>Cách làm</h3>
                <StepList>
                  {steps.map((step, index) => (
                    <StepItem key={index}>
                      <span className="step-number">{index + 1}</span>
                      <TextArea
                        placeholder={`Bước ${index + 1}: Mô tả chi tiết cách thực hiện...`}
                        value={step}
                        onChange={(e) => updateStep(index, e.target.value)}
                        rows={2}
                      />
                      {steps.length > 1 && (
                        <Button 
                          type="text" 
                          danger
                          icon={<FontAwesomeIcon icon={faTimes} />}
                          onClick={() => removeStep(index)}
                        />
                      )}
                    </StepItem>
                  ))}
                  <Button type="dashed" onClick={addStep} style={{ width: '100%' }}>
                    + Thêm bước làm
                  </Button>
                </StepList>
              </RecipeFormSection>

              {/* Form Actions */}
              <FormActions>
                <Button 
                  size="large" 
                  onClick={() => {
                    setShowCreatePost(false);
                    resetForm();
                  }}
                >
                  Hủy
                </Button>
                <Button 
                  type="primary" 
                  size="large" 
                  htmlType="submit"
                  icon={<FontAwesomeIcon icon={faUpload} />}
                >
                  Đăng bài
                </Button>
              </FormActions>
            </PostForm>
          </Form>
        </CreatePostModal>

        {/* Comments Modal */}
        <Modal
          title={`Bình luận - ${currentPostId ? feedPosts.find(p => p.id === currentPostId)?.user?.name : ''}`}
          open={showComments}
          onCancel={() => {
            setShowComments(false);
            setCurrentPostId(null);
          }}
          width={1000}
          footer={null}
          bodyStyle={{ padding: 0 }}
          style={{ top: 20 }}
        >
          {currentPostId && (
            <CommentComponent recipeId={currentPostId} />
          )}
        </Modal>

        {/* Share Modal */}
        <Modal
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FontAwesomeIcon icon={faShare} style={{ color: '#2d5016' }} />
              <span>Chia sẻ bài viết</span>
            </div>
          }
          open={showShareModal}
          onCancel={() => {
            setShowShareModal(false);
            setSharePostId(null);
            setSelectedShareUsers([]);
            setShareMessage('');
          }}
          width={500}
          footer={null}
          bodyStyle={{ padding: '20px' }}
        >
          {/* Copy Link Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: '#f8f9fa',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <FontAwesomeIcon icon={faLink} style={{ color: '#6b7280' }} />
            <Input
              value={`${window.location.origin}/recipe/detail/${sharePostId}`}
              readOnly
              style={{ 
                flex: 1, 
                border: 'none', 
                background: 'transparent',
                fontSize: '13px'
              }}
            />
            <Button 
              type="primary"
              icon={<FontAwesomeIcon icon={faCopy} />}
              onClick={handleCopyLink}
              style={{
                background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Sao chép
            </Button>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '20px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span style={{ color: '#9ca3af', fontSize: '13px' }}>hoặc gửi đến</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          {/* Search Users */}
          <Input
            placeholder="Tìm kiếm người dùng..."
            prefix={<FontAwesomeIcon icon={faSearch} style={{ color: '#9ca3af' }} />}
            value={shareSearchTerm}
            onChange={(e) => setShareSearchTerm(e.target.value)}
            style={{
              borderRadius: '10px',
              marginBottom: '16px',
              padding: '10px 12px'
            }}
          />

          {/* Message Input */}
          <Input.TextArea
            placeholder="Thêm tin nhắn (tùy chọn)..."
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            rows={2}
            style={{
              borderRadius: '10px',
              marginBottom: '16px',
              resize: 'none'
            }}
          />

          {/* Users List */}
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            padding: '8px'
          }}>
            {loadingShareUsers ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Spin />
                <p style={{ marginTop: '10px', color: '#6b7280' }}>Đang tải...</p>
              </div>
            ) : filteredShareUsers.length > 0 ? (
              filteredShareUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => toggleShareUser(user.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: selectedShareUsers.includes(user.id) ? '#f0f9ff' : 'transparent',
                    border: selectedShareUsers.includes(user.id) ? '1px solid #2d5016' : '1px solid transparent',
                    marginBottom: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!selectedShareUsers.includes(user.id)) {
                      e.currentTarget.style.background = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!selectedShareUsers.includes(user.id)) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <Checkbox 
                    checked={selectedShareUsers.includes(user.id)}
                    style={{ pointerEvents: 'none' }}
                  />
                  <Avatar 
                    src={user.avatar} 
                    size={45}
                    style={{ border: '2px solid #f3f4f6' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '600',
                      color: '#1f2937',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {user.name || user.username}
                      {user.isVerified && (
                        <FontAwesomeIcon 
                          icon={faCrown} 
                          style={{ color: '#ffd700', fontSize: '12px' }} 
                        />
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {user.followers || user.mutualFriends || 0} người theo dõi
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <FontAwesomeIcon icon={faUsers} style={{ fontSize: '32px', marginBottom: '10px', opacity: 0.5 }} />
                <p>Không tìm thấy người dùng</p>
              </div>
            )}
          </div>

          {/* Selected Count & Send Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>
              Đã chọn: <strong style={{ color: '#2d5016' }}>{selectedShareUsers.length}</strong> người
            </span>
            <Button
              type="primary"
              size="large"
              icon={<FontAwesomeIcon icon={faPaperPlane} />}
              onClick={handleSendShare}
              loading={sendingShare}
              disabled={selectedShareUsers.length === 0}
              style={{
                background: selectedShareUsers.length > 0 
                  ? 'linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)' 
                  : '#d1d5db',
                border: 'none',
                borderRadius: '10px',
                height: '44px',
                paddingLeft: '24px',
                paddingRight: '24px',
                fontWeight: '600'
              }}
            >
              Gửi
            </Button>
          </div>
        </Modal>
      </SocialContainer>
    </DefaultComponent>
  );
};

export default AllRecipePage;
