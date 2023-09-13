import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import toast from 'react-hot-toast';
import { isEmail, isPassword } from "../helper/regexMatcher";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    avatar: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  function handleUserInput(e){
    const {name, value}=e.target;
    setSignupDetails({
        ...signupDetails,
        [name]: value
    })
  }

  function handleImage(e){
    e.preventDefault();
    const uploadedImage=e.target.files[0];
    if(!uploadedImage) return;
    setSignupDetails({
        ...signupDetails,
        avatar: uploadedImage,
    })
    const fileReader=new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function(){
        setPreviewImage(this.result);
    })
  }

  async function onFormSubmit(e){
    e.preventDefault();
    console.log(signupDetails);
    if(!signupDetails.fullName || !signupDetails.email || !signupDetails.password){
        toast.error("Please fill all the details!");
        return;
    }
    if(signupDetails.fullName.length<5){
        toast.error('Name should contain atleast 5 Characters!');
        return;
    }
    if(!isEmail(signupDetails.email)){
        toast.error("Invalid Email Provided");
    }
    if(!isPassword(signupDetails.password)){
        toast.error("Choose a Stronger Password, with a length of atleast 6");
    }
    const formData=new FormData();
    formData.append("fullName", signupDetails.fullName);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);

    const response=await dispatch(createAccount(formData));
    console.log(response);
    if(response?.payload?.data){
        navigate("/login");
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
          <h1 className="text-2xl text-center font-bold">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            onChange={handleImage}
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg "
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Name
            </label>
            <input
              required
              type="text"
              onChange={handleUserInput}
              value={signupDetails.fullName}
              name="fullName"
              id="fullName"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter Your Username..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              required
              type="email"
              onChange={handleUserInput}
              value={signupDetails.email}
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
              value={signupDetails.password}
              type="password"
              name="password"
              id="password"
              className="bg-transparent px-2 py-1 border"
              placeholder="Enter Your Password..."
            />
          </div>
          <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-500 font-semibold text-lg py-2 cursor-pointer">
            Create Account
          </button>
          <p className="text-center">
            Already have an account ? <Link to='/login' className="cursor-pointer text-accent">Login</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default Signup;
