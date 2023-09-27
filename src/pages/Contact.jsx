import React, { useState } from 'react'
import HomeLayout from '../layout/HomeLayout';
import toast from 'react-hot-toast';
import { isEmail } from '../helper/regexMatcher';
import axiosInstance from '../config/axiosInstance';

const Contact = () => {
    const [userInput, setUserInput]=useState({
        name: '',
        email: '',
        message: '',
    })
    function handleInputChange(e){
        const {name, value}=e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All Fields are mandatory!");
            return;
        }
        if(!isEmail(userInput.email)){
            toast.error("Invalid Email Provided");
            return;
        }
        try {
            const response=axiosInstance.post('/contact', userInput);
            toast.promise(response, {
                loading: 'Submitting Your Query',
                success: 'Form submitted successfully',
                error: 'Failed to submit the form',
            })
            const responseData=await response;
            if(responseData?.payload?.data){
                setUserInput({
                    email: "",
                    name: "",
                    message: "",
                })
            }
        } catch (error) {
            console.log(error);
            toast.error("Operation Failed!");
        }
    }
  return (
    <HomeLayout>
        <div className='flex items-center justify-center h-[100vh]'>
            <form onSubmit={onFormSubmit} noValidate className='flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white'>
                <h1 className='text-3xl font-semibold'>Contact Form</h1>
                <div className='flex flex-col w-full gap-1 font-semibold'>
                    <label htmlFor='name' className='text-xl font-semibold'>
                        Name
                    </label>
                    <input name='name' id='name' value={userInput.name} className='bg-white border px-2 py-1 rounded-sm text-black' type='text' placeholder='Enter Your Name' onChange={handleInputChange} />
                </div>
                <div className='flex flex-col w-full gap-1 font-semibold'>
                    <label htmlFor='email' className='text-xl font-semibold'>
                        Email
                    </label>
                    <input name='email' id='email' value={userInput.email} className='bg-white border px-2 py-1 rounded-sm text-black' type='email' placeholder='Enter Your Email' onChange={handleInputChange} />
                </div>
                <div className='flex flex-col w-full gap-1 font-semibold'>
                    <label htmlFor='message' className='text-xl font-semibold'>
                        Message
                    </label>
                    <textarea name='message' id='message' value={userInput.message} className='bg-white border px-2 py-1 rounded-sm resize-none h-40 text-black' type='text' placeholder='Enter Message' onChange={handleInputChange} />
                </div>
                <button type='submit' className='w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>Submit</button>
            </form>
        </div>
    </HomeLayout>
  )
}

export default Contact;
