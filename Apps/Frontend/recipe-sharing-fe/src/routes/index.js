import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/Registerpage/RegisterPage";

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
    }



]