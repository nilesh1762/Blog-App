import { configureStore  } from "@reduxjs/toolkit";
import categorySlice from "../slice/category/categorySlice";
import post from "../slice/posts/postSlice";
import userReducer from "../slice/users/userSlices"

const store = configureStore({
    reducer:{
        Users: userReducer,
        category: categorySlice,
        post: post,
    }
});

export default store;