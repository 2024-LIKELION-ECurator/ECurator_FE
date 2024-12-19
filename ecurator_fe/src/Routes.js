import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostList from "./pages/community/postList";
import PostWrite from "./pages/community/postWrite";
import PostEdit from "./pages/community/postEdit";
import Calendar from "./pages/calendar/CalendarPage";

import Navigation from "./components/navigation/Navigation";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Mypage from "./pages/mypage/Mypage";
import Recommend from "./pages/recommend/Recommend";
import Signup from "./pages/signup/Signup";


const Router = () => {
        return (
        <BrowserRouter>
            <div>
                <Navigation />
                <Routes>
                    <Route path="/community" element={<PostList />} />
                    <Route path="/postwrite" element={<PostWrite />} />
                    <Route path="/postedit/:id" element={<PostEdit />} />  
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/recommend/:emotion" element={<Recommend />} />
                </Routes>
            </div>
        </BrowserRouter>
        );
    };
    
    export default Router;
