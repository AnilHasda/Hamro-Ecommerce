import React from "react";
import { BrowserRouter as Router, Routes, Route,Outlet } from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import Layout from "../components/Outlet/Outlet";
import Profile from "../components/Profile";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import SignUp from "../components/Signup/SignUp";
import Admin from "../components/Admin/Admin";
import ShowAllData from "../components/Admin/adminShowData/ShowAllData";
import CreateCategory from "../components/Admin/createCategory/CreateCategory";
const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Admin" element={<Outlet />}>
            {/* Render the child routes inside Outlet */}
            <Route index element={<Admin/>} />
            <Route path="showAllData" element={<ShowAllData />}/>
            <Route path="createCategory"element={<CreateCategory/>}/>
          </Route>
          <Route path="Login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
