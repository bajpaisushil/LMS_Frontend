import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const initialState={
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {}
}

export const createAccount=createAsyncThunk("/auth/signup", async(data)=>{
    try {
        const response=axiosInstance.post("user/register", data);
        toast.promise(response, {
            loading: "Wait! creating your account...",
            success: (data)=>{
                return data?.data?.message
            },
            error: "Failed to Create your account"
        })
        return await response;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

export const login=createAsyncThunk("/auth/signin", async(data)=>{
    try {
        const response=axiosInstance.post("user/login", data);
        toast.promise(response, {
            loading: "Wait! Logging in to your account...",
            success: (data)=>{
                return data?.data?.message
            },
            error: "Failed to Login"
        })
        return response;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})
export const logout=createAsyncThunk("/auth/signout", async()=>{
    
    try {
        const response=axiosInstance.post("user/logout");
        toast.promise(response, {
            loading: "Logging Out...",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to Logout"
        })
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        const nav=useNavigate();
        nav("/login");
    }
})

const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            console.log('action=> ', action);
            localStorage.setItem("data", JSON.stringify(action?.payload?.data));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.data?.user?.role);
            state.isLoggedIn=true;
            state.role=action?.payload?.data?.user?.role;
            state.data=JSON.stringify(action?.payload?.data);
        })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.role="";
            state.data={};
        })
    }
})

export default authSlice.reducer;
