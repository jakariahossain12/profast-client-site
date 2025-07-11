import React from 'react';

const LoadingSpiner = () => {
    return (
      <div className='flex justify-center items-center'>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-primary"></div>
      </div>
    );
};

export default LoadingSpiner;