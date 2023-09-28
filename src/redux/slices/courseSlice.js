import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';

const initialState={
    courseList: []
}

export const getAllCourses=createAsyncThunk("/course/getAllCourses", async(data)=>{
    try {
        const response=axiosInstance.get("/courses", data);
        toast.promise(response, {
            loading: "Wait! Fetching all Courses...",
            success: (data)=>{
                return data?.data?.message
            },
            error: "Failed to load courses"
        })
        return (await response).data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})

const courseSlice=createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            console.log(action.payload);
            if(action?.payload){
                state.courseList=[...action.payload]
            }
        })
    }
})

export default courseSlice.reducer;
