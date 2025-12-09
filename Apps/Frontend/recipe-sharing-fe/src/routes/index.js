import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/Registerpage/RegisterPage";
import TestPage from "../pages/TestPage/TestPage";
import AIPage from "../pages/AIPage/AIPage";
import MyInfoPage from "../pages/MyInfoPage/MyInfoPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import AllRecipePage from "../pages/AllRecipePage/AllRecipePage";
import ChatPage from "../pages/ChatPages/ChatPage";
import SearchPage from "../pages/SearchPage/SearchPage";

export const routes = [
    {
        path : '/',
        page : HomePage,
        isShowHeader : true
    },
    {
        path : '/login',
        page : LoginPage,
        isShowHeader : false
    },
     {
        path : '/register',
        page : RegisterPage,
        isShowHeader : false
    },
    {
        path : '/test',
        page : TestPage,
        isShowHeader : false
    },
    {
        path : '/ai-chef',
        page : AIPage,
        isShowHeader : true
    },
    {
        path : '/my/info',
        page : MyInfoPage,
        isShowHeader : true
    },
    {
        path : '/contact',
        page : ContactPage,
        isShowHeader : true
    },
    {
        path : '/recipes',
        page : AllRecipePage,
        isShowHeader : true
    },
    {
        path : '/chat',
        page : ChatPage,
        isShowHeader : false
    },
    {
        path : '/search',
        page : SearchPage,
        isShowHeader : true
    }

]