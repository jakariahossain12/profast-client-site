import React from 'react';
import logo from '../../assets/logo.png'
const WebsiteLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt="logo" />
            <p className='font-extrabold -ml-3'>ProFast</p>
        </div>
    );
};

export default WebsiteLogo;