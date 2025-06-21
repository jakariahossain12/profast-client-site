import React from 'react';
import SignIn from '../pages/UserAuthentiction/Sign_In/SignIn';
import authImage from '../assets/authImage.png'
import { FcGoogle } from "react-icons/fc";
import WebsiteLogo from '../share/WebsiteLogo/WebsiteLogo';
import { Outlet } from 'react-router';

const AuthLayOut = () => {
    return (
      <div>
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <Outlet></Outlet>

          {/* Right Side - Image/Illustration */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-lime-50">
            <img
              src={authImage} // Replace with your SVG or image
              alt="Delivery illustration"
              className="w-3/4 max-w-md"
            />
          </div>
        </div>
      </div>
    );
};

export default AuthLayOut;