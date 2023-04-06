import { configureStore  } from "@reduxjs/toolkit";
import categorySlice from "../slice/category/categorySlice";
import post from "../slice/posts/postSlice";
import userReducer from "../slice/users/userSlices"
import  comment  from "../slice/comments/commentSlice";

const store = configureStore({
    reducer:{
        Users: userReducer,
        category: categorySlice,
        post: post,
        comment: comment,
    }
});

export default store;