import {React, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/home';
import LogoutPage from '../pages/LogOut/logOutRedirect';
import SignUp from '../pages/SignUp/signUp';

const MainApp = () => {

    const [userData, setUserData] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home userData={userData} setUserData={setUserData} />} />
                <Route path="/logOutPage" element={<LogoutPage/>} />
                <Route path="/SignUpForm" element={<SignUp userData={userData} />} />
            </Routes>
        </Router>
    );
};

export default MainApp;
