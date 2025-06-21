import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

const MainLayOut = () => {
    return (
      <div className="w-11/12 mx-auto pt-5">
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    );
};

export default MainLayOut;