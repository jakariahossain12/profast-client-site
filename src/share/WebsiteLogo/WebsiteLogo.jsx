import React from 'react';
import logo from '../../assets/logo.png'
import { Link } from 'react-router';
const WebsiteLogo = () => {
    return (
        <Link to={'/'} className='flex items-end'>
            <img src={logo} alt="logo" />
            <p className='font-extrabold -ml-3'>ProFast</p>
        </Link>
    );
};

export default WebsiteLogo;