import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";


// User Registration

export const registerUserAction = createAsyncThunk(
    "users/register",
    async(user, {rejectWithValue, getState, dispatch}) => {

        try{

            // http call
            const config = {
                headers:{
                    "Content-Type": "application/json",
                },

            };
            const {data } = await axios.post(`${baseUrl}/api/users/register`, user, config);

            return data;

        }catch(error){
             console.log("errror", error)
            if(!error?.response){
                throw error
            }
             
            return rejectWithValue(error.response.data)
        }
    }
);

// User Login

export const loginUserAction = createAsyncThunk(
    "users/login",
    async(userdata, {rejectWithValue, getState, dispatch}) => {

         // http call
         const config = {
            headers:{
                "Content-Type": "application/json",
            },

        };

          try{
                const {data } = await axios.post(`${baseUrl}/api/users/login`, userdata, config);
                localStorage.setItem('userInfo', JSON.stringify(data))
                return data;

          }catch(error){
             console.log("errror", error)
            if(!error?.response){
                throw error
            }
             
            return rejectWithValue(error.response.data)
        }
    }
);

// User Logout

export const logoutUserAction = createAsyncThunk(
    "users/logout",
    async(payload, {rejectWithValue, getState, dispatch}) => {

          try{
                
                localStorage.removeItem('userInfo')
             

          }catch(error){
             
            if(!error?.response){
                throw error
            }
             
            return rejectWithValue(error.response.data)
        }
    }
);

//Profile
export const userProfileAction = createAsyncThunk(
    "user/profile",
    async(id, {rejectWithValue, getState, dispatch}) => {
      
          const user = getState().Users;
          const { userAuth } = user;
          const config = {

            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
         
        try{

            // http call
            const {data } = await axios.get(`${baseUrl}/api/users/profile/${id}`,
           
            config
            );
           
            return data;

        }catch(error){
             console.log("errror", error)
            if(!error?.response){
                throw error
            }
             
            return rejectWithValue(error.response.data)
        }
    }
);

// Get the User from Local Storage
const userLoginFormstorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// Slice

const userSlice = createSlice({

    name: "Users",
    initialState: { 
        userAuth: userLoginFormstorage
    },

      extraReducers: builder => {
        // Register
        builder.addCase(registerUserAction.pending, (state, action) =>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(registerUserAction.fulfilled, (state, action) =>{
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(registerUserAction.rejected, (state, action) =>{
           
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Login
        builder.addCase(loginUserAction.pending, (state, action) =>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(loginUserAction.fulfilled, (state, action) =>{
            state.userAuth = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(loginUserAction.rejected, (state, action) =>{
           
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        // Logout
        builder.addCase(logoutUserAction.pending, (state, action) =>{
            state.loading = true;
           
        });

        builder.addCase(logoutUserAction.fulfilled, (state, action) =>{
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(logoutUserAction.rejected, (state, action) =>{
           
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

           //profile
           builder.addCase(userProfileAction.pending, (state, action) =>{
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(userProfileAction.fulfilled, (state, action) =>{
            state.profile = action.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(userProfileAction.rejected, (state, action) =>{
           
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
      }
});


export default userSlice.reducer;

