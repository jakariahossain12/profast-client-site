import React from 'react';
import { Link, NavLink } from 'react-router';
import WebsiteLogo from '../../share/WebsiteLogo/WebsiteLogo';
import { FiArrowUpRight } from "react-icons/fi";
import './NavBar.css'
import useAuth from '../../hooks/useAuth';
const NavBar = () => {
  const { user } = useAuth();
    const link = (
      <>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/services"}>Services</NavLink>
        </li>
        <li>
          <NavLink to={"/coverage-map"}>Coverage</NavLink>
        </li>
        <li>
          <NavLink to={"/about-us"}>About Us</NavLink>
        </li>

        <li>
          <NavLink to={"/add-parcel"}>Pricing</NavLink>
        </li>

        <li>
          <NavLink to={"/be-a-rider"}>Be a Rider</NavLink>
        </li>
        {user && (
          <li>
            <NavLink to={"/dashboard"}>DashBoard</NavLink>
          </li>
        )}
      </>
    );
    return (
      <div className="navbar bg-base-100 shadow-sm rounded-md mb-5 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          
            <WebsiteLogo></WebsiteLogo>
          
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end flex gap-3">
          <Link className="btn" to={'/sign-in'}>Sign In</Link>
          <a className="btn bg-primary">Be a rider</a>
          <div className='bg-black w-9 h-9 rounded-full flex justify-center items-center'>
            <FiArrowUpRight  className='text-lime-300 text-3xl'></FiArrowUpRight>
          </div>
        </div>
      </div>
    );
};

export default NavBar;