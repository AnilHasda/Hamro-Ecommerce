import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import Layout from "../components/Outlet/Outlet";
import Profile from "../components/Profile";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import SignUp from "../components/Signup/SignUp";
import Admin from "../components/Admin/Admin";
const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="Login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
