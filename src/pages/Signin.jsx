import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import toast from 'react-hot-toast';
import { isEmail, isPassword } from "../helper/regexMatcher";
import { useDispatch } from "react-redux";
import { createAccount, login } from "../redux/slices/authSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e){
    const {name, value}=e.target;
    setSigninDetails({
        ...signinDetails,
        [name]: value
    })
  }

  async function onFormSubmit(e){
    e.preventDefault();
    console.log(signinDetails);
    if(!signinDetails.email || !signinDetails.password){
        toast.error("Please fill all the details!");
        return;
    }
    if(!isEmail(signinDetails.email)){
        toast.error("Invalid Email Provided");
    }

    const response=await dispatch(login(signinDetails));
    console.log(response);
    if(response?.payload?.data){
        navigate("/");
    }
  }
  return (
    <HomeLayout>
      <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-[35]"
        >
          <h1 className="text-2xl text-center font-bold">Login Page</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              required
              type="email"
              onChange={handleUserInput}
              value={signinDetails.email}
              name="email"
              id="email"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter Your Email..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Password
            </label>
            <input
              required
              onChange={handleUserInput}
              value={signinDetails.password}
              type="password"
              name="password"
              id="password"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter Your Password..."
            />
          </div>
          <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-500 font-semibold text-lg py-2 cursor-pointer">
            Login
          </button>
          <p className="text-center">
            Not Registered ? <Link to='/signup' className="cursor-pointer text-accent">Register</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signin;
