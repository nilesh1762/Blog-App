import { createAsyncThunk, createSlice, createAction  } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

const redirectAction = createAction("category/reset");
const resetPostEdit = createAction("post/reset");
const resetPostDelete = createAction("post/delete");

//Create Post
export const createPostaction = createAsyncThunk('post/create', 
async (post, {rejectWithValue, getState, dispatch}) =>{

    const user = getState().Users;
    const { userAuth } = user;
    const config = {

      headers: {
          Authorization: `Bearer ${userAuth?.token}`
      }
    };

    try {
         // http call
         const formData = new FormData();
         formData.append("title", post?.title);
         formData.append("category", post?.category);
         formData.append("description", post?.description);
         formData.append("image", post?.image);
        
         const {data } = await axios.post(`${baseUrl}/api/posts`, formData, config);

         //dispatch action
         dispatch(redirectAction())
         return data
        
    } catch (error) {
        console.log("errror", error)
        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

//Update Post
export const updatePostaction = createAsyncThunk('post/update', 
async (post, {rejectWithValue, getState, dispatch}) =>{

    const user = getState().Users;
    const { userAuth } = user;
    const config = {

      headers: {
          Authorization: `Bearer ${userAuth?.token}`
      }
    };

    try {
       
        
         const {data } = await axios.put(`${baseUrl}/api/posts/${post?.id}`,post,  config);

         //dispatch action
         dispatch(resetPostEdit());
         return data
        
    } catch (error) {
        console.log("errror", error)
        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

//Delete
export const deletePostAction = createAsyncThunk(
    "post/delete",
    async (postId, { rejectWithValue, getState, dispatch }) => {

      console.log("postId", postId)
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
        const { data } = await axios.delete(
          `${baseUrl}/api/posts/${postId}`,
          config
        );
        //dispatch
        console.log("data", data)
        dispatch(resetPostDelete());
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//Fetch Post
export const fetchPostaction = createAsyncThunk('post/list', 
async (post, {rejectWithValue, getState, dispatch}) =>{
   
    try {
         // http call
        
         const {data } = await axios.get(
            `${baseUrl}/api/posts`
          );
          
         return data
        
    } catch (error) {
        console.log("errror", error)
        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

//Fetch Filter Post
export const fetchCategoryPostaction = createAsyncThunk('post/list', 
async (category, {rejectWithValue, getState, dispatch}) =>{
   
    try {
         // http call
        
         const {data } = await axios.get(
            `${baseUrl}/api/posts?category=${category}`
          );
         
         return data
        
    } catch (error) {
        console.log("errror", error)
        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

//Fetch Post Details
export const fetchPostDetailaction = createAsyncThunk('post/detail', 
async (id, {rejectWithValue, getState, dispatch}) =>{

    try {
         // http call
        
         const {data } = await axios.get(
            `${baseUrl}/api/posts/${id}`
          );
   
         return data
        
    } catch (error) {
        console.log("errror", error)
        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

// Add Like Post

export const toggleAddlikePost = createAsyncThunk('post/like', 
async (postId, {rejectWithValue, getState, dispatch}) =>{

    const user = getState().Users;
    const { userAuth } = user;
    const config = {

      headers: {
          Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try{

        const { data } =  await axios.put( `${baseUrl}/api/posts/likes`, {postId}, config  );
        console.log("data+++", postId)
        return data

    }catch(error){

        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

// Add DisLike Post

export const toggleAddDislikePost = createAsyncThunk('post/dislike', 
async (postId, {rejectWithValue, getState, dispatch}) =>{

    const user = getState().Users;
    const { userAuth } = user;
    const config = {

      headers: {
          Authorization: `Bearer ${userAuth?.token}`
      }
    };
    try{

        const { data } =  await axios.put( `${baseUrl}/api/posts/dislikes`, {postId}, config  );
      
        return data

    }catch(error){

        if(!error?.response){
            throw error
        }
         
        return rejectWithValue(error.response.data)
    }
});

const post = createSlice({
       
      name: 'post',
      initialState: {},
      extraReducers: builder => {
   //Create Reducer 
   builder.addCase(createPostaction.pending, (state, action) =>{
    state.loading = true;

  });
  
   //dispatch action to redirect
   builder.addCase(redirectAction, (state, action) => {
    state.isCreated = true;
    });

 builder.addCase(createPostaction.fulfilled, (state, action) =>{
     
     state.loading = false;
     state.postcreated = action?.payload;
     state.isCreated = false;
     state.appErr = undefined;
     state.serverErr = undefined;
 });

 builder.addCase(createPostaction.rejected, (state, action) =>{
            
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});

  //Delete post
  builder.addCase(deletePostAction.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(resetPostDelete, (state, action) => {
    state.isDeleted = true;
  });
  builder.addCase(deletePostAction.fulfilled, (state, action) => {
    state.postUpdated = action?.payload;
    state.isDeleted = false;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr = undefined;
  });
  builder.addCase(deletePostAction.rejected, (state, action) => {
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
  });
  
//Update Post action

builder.addCase(updatePostaction.pending, (state, action) =>{
    state.loading = true;

  });
  
   //dispatch action to redirect
   builder.addCase(resetPostEdit, (state, action) => {
    state.isUpdate = true;
    });

 builder.addCase(updatePostaction.fulfilled, (state, action) =>{
     
     state.loading = false;
     state.postupdate = action?.payload;
     state.appErr = undefined;
     state.serverErr = undefined;
     state.isUpdate = false;
 });

 builder.addCase(updatePostaction.rejected, (state, action) =>{
            
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});
   
//Fetch post
builder.addCase(fetchPostaction.pending, (state, action) =>{
    state.loading = true;

  });
  
 builder.addCase(fetchPostaction.fulfilled, (state, action) =>{
    
     state.postList = action?.payload;
     state.loading = false;
     state.appErr = undefined;
     state.serverErr = undefined;
 });

 builder.addCase(fetchPostaction.rejected, (state, action) =>{
            
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});

//Deatils post
builder.addCase(fetchPostDetailaction.pending, (state, action) =>{
    state.loading = true;

  });
  
 builder.addCase(fetchPostDetailaction.fulfilled, (state, action) =>{
    
     state.postDetails = action?.payload;
     state.loading = false;
     state.appErr = undefined;
     state.serverErr = undefined;
 });

 builder.addCase(fetchPostDetailaction.rejected, (state, action) =>{
            
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});

//Likes post
builder.addCase(toggleAddlikePost.pending, (state, action) =>{
    state.loading = true;

  });
  
 builder.addCase(toggleAddlikePost.fulfilled, (state, action) =>{
    
     state.likes = action?.payload;
     state.loading = false;
     state.appErr = undefined;
     state.serverErr = undefined;
 });

 builder.addCase(toggleAddlikePost.rejected, (state, action) =>{
            
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});

//Dislikes post
builder.addCase(toggleAddDislikePost.pending, (state, action) =>{
    state.loading = true;

  });
  
 builder.addCase(toggleAddDislikePost.fulfilled, (state, action) =>{
    
     state.dislikes = action?.payload;
     state.loading = false;
     state.appErr = undefined;
     state.serverErr = undefined;
 });

 builder.addCase(toggleAddDislikePost.rejected, (state, action) =>{
            
    state.loading = false;
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
});
//  //Category Filter Fetch post
// builder.addCase(fetchCategoryPostaction.pending, (state, action) =>{
//     state.loading = true;

//   });
  
//  builder.addCase(fetchCategoryPostaction.fulfilled, (state, action) =>{
    
//      state.postFilterList = action?.payload;
//      state.loading = false;
//      state.appErr = undefined;
//      state.serverErr = undefined;
//  });

//  builder.addCase(fetchCategoryPostaction.rejected, (state, action) =>{
            
//     state.loading = false;
//     state.appErr = action?.payload?.message;
//     state.serverErr = action?.error?.message;
// });

}

});

export default post.reducer;