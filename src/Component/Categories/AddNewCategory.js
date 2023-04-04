import {  BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategoryAction } from "../../Redux/slice/category/categorySlice";
import { Navigate } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),

 });


const AddNewCategory = () => {

  const dispatch = useDispatch()
  const storeData = useSelector(store => store?.category);
  console.log("str", storeData)
  const { loading, appErr, serverErr, isCreated} = storeData;
 
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          title: ""
        
        },
        onSubmit: values => {
          dispatch(createCategoryAction(values));
           // console.log("value", values);
          },
          validationSchema: formSchema,
      });

      if(isCreated){
        return <Navigate  to = "/category-list" />
      }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
          </div>

          {appErr || serverErr ? <div className='text-red-500'> {appErr} {serverErr} </div> : null}
          
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
               onBlur={formik.handleBlur("title")}
               value={formik.values.title}
               onChange={formik.handleChange("title")}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title} 
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                  <button
                  disabled
                  className="py-4 w-full bg-gray-500  text-white font-bold rounded-full transition duration-200"
                >
                  Loading Plase Wait
                </button>
                )
                : 
                (<button
                  type="submit"
                  className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
                >
                 Add Category
                </button>
                 )
                 }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
