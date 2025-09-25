import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/Registerpage/RegisterPage";
import TestPage from "../pages/TestPage/TestPage";
import AIPage from "../pages/AIPage/AIPage";
import MyInfoPage from "../pages/MyInfoPage/MyInfoPage";

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
        path : '/my-info',
        page : MyInfoPage,
        isShowHeader : true
    }

]