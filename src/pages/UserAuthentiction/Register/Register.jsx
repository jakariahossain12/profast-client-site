import React from 'react';
import Google from '../../../share/Social_Login/Google';
import WebsiteLogo from '../../../share/WebsiteLogo/WebsiteLogo';
import AuthButton from '../../../share/AuthButton/AuthButton';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';


const Register = () => {
  const {newUser}=useAuth()
  const notify = () => toast.success("Account Create Successfully");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    newUser(data?.email, data?.password)
      .then(res => {
        console.log(res);
        notify()
        reset()
      }).catch(error => {
      console.log(error);
    })
  }


  
    return (
      <div className="md:w-1/2 flex flex-col justify-center items-center px-8 md:px-24 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="md:-mt-20 pb-20">
            <WebsiteLogo></WebsiteLogo>
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="mt-1 w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && <p className="text-red-600">Input your Name</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email"
                className="mt-1 w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && <p className="text-red-600">Enter your Email</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                })}
                type="password"
                placeholder="Password"
                className="mt-1 w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              {errors.password && (
                <p className="text-red-600">
                  Must be at least 6 characters with 1 uppercase & 1 lowercase
                  letter
                </p>
              )}
            </div>

            <AuthButton lavle={"Register"}></AuthButton>

            <p className="text-sm text-center">
              Have an account?{" "}
              <Link
                to={"/sign-in"}
                className="text-lime-600 font-medium cursor-pointer hover:underline"
              >
                Login
              </Link>
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

export default Register;