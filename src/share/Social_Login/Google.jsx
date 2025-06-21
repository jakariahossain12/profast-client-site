import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const Google = () => {
    return (
      
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border bg-gray-100 py-2 rounded-md text-sm hover:bg-gray-200 transition"
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </button>
      
    );
};

export default Google;