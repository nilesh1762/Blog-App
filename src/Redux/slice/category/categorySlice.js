import { createAsyncThunk, createSlice, createAction  } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

//Action redirect

const redirectAction = createAction("category/reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetCategoryAction = createAction("category/created-reset");

//Create Category
export const createCategoryAction = createAsyncThunk(
    "category/create",
    async(category, {rejectWithValue, getState, dispatch}) => {
       
          const user = getState().Users;
          const { userAuth } = user;
          const config = {

            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
         
        try{

            // http call
            const {data } = await axios.post(`${baseUrl}/api/category`,
             { title: category?.title },
            config
            );
           //disoatch action
            dispatch(resetCategoryAction());
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

//Fetch Category
export const fetchCategoryAction = createAsyncThunk(
    "category/fetch",
    async(category, {rejectWithValue, getState, dispatch}) => {
       
          const user = getState().Users;
          const { userAuth } = user;
          
          const config = {

            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
         
        try{
            // http call
            const {data } = await axios.get(`${baseUrl}/api/category`, config );
           
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

//Update Category
export const updateCategoryAction = createAsyncThunk(
    "category/update",
    async(category, {rejectWithValue, getState, dispatch}) => {
       
          const user = getState().Users;
          const { userAuth } = user;
          
          const config = {

            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
          }
        
        try{
            // http call
            const {data } = await axios.put(`${baseUrl}/api/category/${category?.searchid}`,
            {title: category?.title},
            config );
           
            // dispatch redirect action

             dispatch(redirectAction());

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

//Delete Category
export const deleteCategoryAction = createAsyncThunk(
    "category/delete",
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
            const {data } = await axios.delete(`${baseUrl}/api/category/${id}`, config );
            dispatch(resetDeleteAction());
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

//Fetch Details
export const singlefetchCategoryAction = createAsyncThunk(
    "category/details",
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
            const {data } = await axios.get(`${baseUrl}/api/category/${id}`, config );
          
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

const categorySlice = createSlice({

    name: "category",
    initialState: {},

    extraReducers: builder => {
         //Create Reducer 
        builder.addCase(createCategoryAction.pending, (state, action) =>{
           state.loading = true;

         });
          //dispatch action to redirect
        builder.addCase(resetCategoryAction, (state, action) => {
        state.isCreated = true;
        });

        builder.addCase(createCategoryAction.fulfilled, (state, action) =>{
            
            state.loading = false;
            state.category = action?.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(createCategoryAction.rejected, (state, action) =>{
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        // Fetch Reducer
        builder.addCase(fetchCategoryAction.pending, (state, action) =>{
           state.loading = true;
           
         });

         builder.addCase(fetchCategoryAction.fulfilled, (state, action) =>{
            
            state.loading = false;
            state.categoryList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });

        builder.addCase(fetchCategoryAction.rejected, (state, action) =>{
            
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //Update Reducer

        builder.addCase(updateCategoryAction.pending, (state, action) =>{
            state.loading = true;
            
          });
              //Dispatch action
        builder.addCase(redirectAction, (state, action) => {
         state.isEdited = true;
         });

          builder.addCase(updateCategoryAction.fulfilled, (state, action) =>{
             state.updatedcategory = action?.payload; 
             state.isEdited = false;
             state.loading = false;
             state.appErr = undefined;
             state.serverErr = undefined;
         });
 
         builder.addCase(updateCategoryAction.rejected, (state, action) =>{
             
             state.loading = false;
             state.appErr = action?.payload?.message;
             state.serverErr = action?.error?.message;
         });

           //Delete Reducer

        builder.addCase(deleteCategoryAction.pending, (state, action) =>{
            state.loading = true;
            
          });

          //Dispatch action
          builder.addCase(resetDeleteAction, (state, action) => {
            state.isDeleted = true;
            });
 
          builder.addCase(deleteCategoryAction.fulfilled, (state, action) =>{
             
             state.loading = false;
             state.deletedcategory = action?.payload;
             state.isDeleted = false;
             state.appErr = undefined;
             state.serverErr = undefined;
         });
 
         builder.addCase(deleteCategoryAction.rejected, (state, action) =>{
             
             state.loading = false;
             state.appErr = action?.payload?.message;
             state.serverErr = action?.error?.message;
         });

             //Single Fetch Reducer

        builder.addCase(singlefetchCategoryAction.pending, (state, action) =>{
            state.loading = true;
            
          });
 
          builder.addCase(singlefetchCategoryAction.fulfilled, (state, action) =>{
             
             state.loading = false;
             state.singlecategory = action?.payload;
             state.appErr = undefined;
             state.serverErr = undefined;
         });
 
         builder.addCase(singlefetchCategoryAction.rejected, (state, action) =>{
             
             state.loading = false;
             state.appErr = action?.payload?.message;
             state.serverErr = action?.error?.message;
         });
    }
});


export default categorySlice.reducer;