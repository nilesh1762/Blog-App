import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { singlefetchCategoryAction, updateCategoryAction, deleteCategoryAction } from "../../Redux/slice/category/categorySlice";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),

 });

export default function UpdateCategory(props) {

  const searchid = useParams().id;
  const dispatch = useDispatch();
  const storeData = useSelector(store => store?.category);
  const category =  useSelector(store => store?.category?.singlecategory);
  const { appErr, serverErr,isEdited , isDeleted } = storeData;

  // console.log("store-data", storeData)

   useEffect(() => {

     dispatch(singlefetchCategoryAction(searchid))
   }, [])
 
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
          title: category?.title
        },
        onSubmit: values => {
          
            dispatch(updateCategoryAction({title: values.title, searchid}));
           
          },
          validationSchema: formSchema,
      });

       if(isEdited || isDeleted){
        return <Navigate  to = "/category-list" />
      }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BookOpenIcon className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Hey are sure you want to to update ...
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                These are the categories user will select when creating a post
              </p>
            </p>
          </div>

          {appErr || serverErr ? <div className='text-red-500'> {appErr} {serverErr} </div> : null}

          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                {/* title */}
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
                {/* Submit btn */}
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Update
                </button>

                <button
                  onClick={() => dispatch(deleteCategoryAction(searchid))}
                  type="submit"
                  className="group mt-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
