import React from 'react';
import WebsiteLogo from '../../../share/WebsiteLogo/WebsiteLogo';
import Google from '../../../share/Social_Login/Google';
import AuthButton from '../../../share/AuthButton/AuthButton';

const SignIn = () => {
    return (
      <div className="md:w-1/2 flex flex-col justify-center items-center px-8 md:px-24 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="-mt-20 pb-20">
            <WebsiteLogo></WebsiteLogo>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6">Login with Profast</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-1 w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="mt-1 w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div className="text-right text-sm text-lime-600 cursor-pointer hover:underline">
              Forget Password?
            </div>

            <AuthButton lavle={"Login"}></AuthButton>

            <p className="text-sm text-center">
              Don’t have any account?{" "}
              <span className="text-lime-600 font-medium cursor-pointer hover:underline">
                Register
              </span>
            </p>

            <div className="flex items-center justify-center my-4">
              <div className="h-px w-full bg-gray-300"></div>
              <span className="px-2 text-gray-400 text-sm">Or</span>
              <div className="h-px w-full bg-gray-300"></div>
            </div>

                    <Google></Google>
           
          </form>
        </div>
      </div>
    );
};

export default SignIn;