import { createAction, createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

//Redirect action

const resetUserAction = createAction("user/profile/reset");

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

//fetch all users
export const fetchUsersAction = createAsyncThunk(
  "user/list",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.Users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const { data } = await axios.get(`${baseUrl}/api/users`, config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Block User details
export const blockUserAction = createAsyncThunk(
  "user/block",
  async (id, { rejectWithValue, getState, dispatch }) => {

    const user = getState().Users;
    const { userAuth } = user;
    const config = {

      headers: {
          Authorization: `Bearer ${userAuth?.token}`
      }
    }

    try {
      const { data } = await axios.put(`${baseUrl}/api/users/block-user/${id}`,
      {},
      config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Un-Block User details
export const UnblockUserDetailsAction = createAsyncThunk(
  "user/unblock",
  async (id, { rejectWithValue, getState, dispatch }) => {

    const user = getState().Users;
    const { userAuth } = user;
    const config = {

      headers: {
          Authorization: `Bearer ${userAuth?.token}`
      }
    }

    try {
      const { data } = await axios.put(`${baseUrl}/api/users/unblock-user/${id}`,
      {},
      config
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
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
             console.log("errror--", error)
            if(!error?.response){
                throw error
            }
             
            return rejectWithValue(error.response.data)
        }
    }
);

//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
    "user/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//Update action
export const updateUserAction = createAsyncThunk(
    "users/update",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        console.log("usrdata==", userData)
      //get user token
      const user = getState()?.Users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/users`,
          {
            lastName: userData?.lastName,
            firstName: userData?.firstName,
            bio: userData?.bio,
            email: userData?.email,
          },
          config
        );
        //dispatch
        dispatch(resetUserAction());
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//Upload Profile Photo
export const uploadProfilePhototAction = createAsyncThunk(
    "user/profile-photo",
    async (userImg, { rejectWithValue, getState, dispatch }) => {
      console.log(userImg);
      //get user token
      const user = getState()?.Users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        //http call
        const formData = new FormData();
  
        formData.append("image", userImg?.image);
  
        const { data } = await axios.put(
          `${baseUrl}/api/users/profilephoto-upload`,
          formData,
          config
        );
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  // Follow
export const followUserAction = createAsyncThunk(
    "user/follow",
    async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
     
      //get user token
      const user = getState()?.Users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/users/followuser`,
          { followId: userToFollowId },
          config
        );
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  // unFollow
export const unfollowUserAction = createAsyncThunk(
    "user/unfollow",
    async (unfollowId, { rejectWithValue, getState, dispatch }) => {
   console.log("unfollowId==", unfollowId)
      //get user token
      const user = getState()?.Users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      //http call
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/users/unfollowuser`,
          { unfollowId },
          config
        );
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
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

         //All Users
    builder.addCase(fetchUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUsersAction.rejected, (state, action) => {
      console.log(action.payload);
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
            state.profileLoading = true;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });

        builder.addCase(userProfileAction.fulfilled, (state, action) =>{
            state.profile = action?.payload;
            state.profileLoading = false;
            state.profileAppErr = undefined;
            state.profileServerErr = undefined;
        });

        builder.addCase(userProfileAction.rejected, (state, action) =>{
       
            state.profileAppErr = action?.payload?.message;
            state.profileServerErr = action?.error?.message;
            state.profileLoading = false;
        });

        //Upload Profile photo
    builder.addCase(uploadProfilePhototAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(uploadProfilePhototAction.fulfilled, (state, action) => {
        state.profilePhoto = action?.payload;
        state.loading = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(uploadProfilePhototAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
        state.loading = false;
      });

          //user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

       //update
    builder.addCase(updateUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(resetUserAction, (state, action) => {
        state.isUpdated = true;
      });
      builder.addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userUpdated = action?.payload;
        state.isUpdated = false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(updateUserAction.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

      //user Follow
    builder.addCase(followUserAction.pending, (state, action) => {
   
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(followUserAction.fulfilled, (state, action) => {
       
        state.loading = false;
        state.followed = action?.payload;
        state.unFollowed = undefined;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(followUserAction.rejected, (state, action) => {
       
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.unFollowed = undefined;
        state.serverErr = action?.error?.message;
      });

      
    //user unFollow
    builder.addCase(unfollowUserAction.pending, (state, action) => {
   
        state.unfollowLoading = true;
        state.unFollowedAppErr = undefined;
        state.unfollowServerErr = undefined;
      });
      builder.addCase(unfollowUserAction.fulfilled, (state, action) => {
       
        state.unfollowLoading = false;
        state.unFollowed = action?.payload;
        state.followed = undefined;
        state.unFollowedAppErr = undefined;
        state.unfollowServerErr = undefined;
      });
      builder.addCase(unfollowUserAction.rejected, (state, action) => {
       
        state.unfollowLoading = false;
        state.unFollowedAppErr = action?.payload?.message;
        state.unfollowServerErr = action?.error?.message;
      });

      // Block user details
       builder.addCase(blockUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(blockUserAction.fulfilled, (state, action) => {
      
        state.loading = false;
        state.block = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(blockUserAction.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });

           //UN-Block user details
          builder.addCase(UnblockUserDetailsAction.pending, (state, action) => {
        
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(UnblockUserDetailsAction.fulfilled, (state, action) => {
       
            state.loading = false;
            state.unblock = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
          });
          builder.addCase(UnblockUserDetailsAction.rejected, (state, action) => {
         
            console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
          });
      }
});


export default userSlice.reducer;

