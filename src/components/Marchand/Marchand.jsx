import React from 'react';
import locationLogo from '../../assets/location-merchant.png'

const Marchand = () => {
    return (
      <div className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-accent flex flex-col border-2 md:flex-row items-center justify-center  rounded-3xl shadow-md   md:p-8 gap-6    ">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left text-white py-16 px-9">
          <h2 className="text-4xl font-extrabold mb-2 ">
            Merchant and Customer Satisfaction is <br /> Our First Priority
          </h2>
          <p className="text-gray-600 mb-4 w-3/5">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
            <button className="px-4 py-2 bg-primary text-black font-semibold rounded-full  transition">
              Become a Merchant
            </button>
            <button className="px-4 py-2 border border-primary text-primary font-semibold rounded-full  transition">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/3">
          <img
            src={locationLogo}
            alt="locationLogo"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
      </div>
    );
};

export default Marchand;