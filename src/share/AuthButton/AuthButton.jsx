import React from 'react';

const AuthButton = ({lavle}) => {
    return (
      <button
        type="submit"
        className="w-full bg-primary text-black font-medium py-2 rounded-md hover:bg-lime-500 transition"
      >
       {lavle}
      </button>
    );
};

export default AuthButton;