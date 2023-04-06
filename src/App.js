
import './App.css';
import { BrowserRouter , Routes ,Route } from "react-router-dom";
import HomePage from './Component/HomePage/HomePage';
import Register from './Component/User/Register';
import Login from './Component/User/Login';
import Navbar from './Navbar/Navbar';
import AddNewCategory from './Component/Categories/AddNewCategory';
import CategoryList from './Component/Categories/CategoryList';
import UpdateCategory from './Component/Categories/UpdateCategory';
import PrivateProtectRoute from './Navbar/ProtectedRoutes/PrivateProtectRoute';
import AdminRoute from './Navbar/ProtectedRoutes/AdminRoute';
import CreatePost from './Component/Posts/Forms/CreatePost';
import PostsList from './Component/Posts/PostsList';
import PostDetails from './Component/Posts/PostDetails'
import UpdatePost from './Component/Posts/UpdatePost';
import UpdateComment from './Component/Comment/UpdateComment';
import Profile from './Component/User/Profile/Profile';
import UploadProfilePhoto from './Component/User/Profile/UploadProfilePhoto';


function App() {
  return (
    
      <BrowserRouter>
       <Navbar />
     <Routes>
      <Route exact path='/posts'   element={<PostsList/>} />
      <Route exact path='/posts/:id'   element={<PostDetails/>} />
      <Route element={<AdminRoute />}>
      <Route exact  path='/category-list'    element={ <CategoryList/>} />
      <Route exact path='/update-category/:id'   element={ <UpdateCategory/> } />
      <Route exact path='/add-category'   element={<AddNewCategory/>} />
      

      </Route>
    
      <Route element={<PrivateProtectRoute />}>
      <Route exact path='/create-post'   element={<CreatePost/>} />
      <Route exact path='/update-post/:id'   element={<UpdatePost/>} />
      <Route exact path='/update-comment/:id'   element={<UpdateComment />} />
      <Route exact path='/profile/:id'   element={<Profile />} />
      <Route exact path='/upload-photo/:id'   element={<UploadProfilePhoto />} />
      </Route>
     
     
      <Route path='/' element={<HomePage/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
