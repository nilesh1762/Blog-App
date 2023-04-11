import { configureStore  } from "@reduxjs/toolkit";
import categorySlice from "../slice/category/categorySlice";
import post from "../slice/posts/postSlice";
import userReducer from "../slice/users/userSlices"
import  comment  from "../slice/comments/commentSlice";
import sendMail from "../slice/email/emailSlices";
import  accountVericationSlices  from "../slice/accountVerification/accVerificationSlices";

const store = configureStore({
    reducer:{
        Users: userReducer,
        category: categorySlice,
        post: post,
        comment: comment,
        sendMail: sendMail,
        accountVericationSlices: accountVericationSlices
    }
});

export default store;