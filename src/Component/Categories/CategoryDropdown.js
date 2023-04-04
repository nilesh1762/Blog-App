import React from 'react'
import Select from 'react-select'
import { fetchCategoryAction } from '../../Redux/slice/category/categorySlice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

export default function CategoryDropdown(props) {

  const dispatch = useDispatch();
  const categoryData = useSelector(store => store?.category);
  const { appErr, serverErr,categoryList, loading  } = categoryData;
 
  const allCategory = categoryList?.map(category => {
    return {
      label: category.title,
      value: category._id
    }
  })
 

  useEffect(() => {
         
    dispatch(fetchCategoryAction(allCategory))
  }, [dispatch]);

  const handleChange = ( value ) => {
      props.onChange("category", value)
  }

  const handleBlur = ( value ) => {
    props.onBlur("category", true)
}


  return (
    <div style={{margin:"1rem 0"}}>

    {loading ? (
    <h3 className=' text-base text-green-500'>
       Product Category Is Loading Please Wait...
       </h3>
       ) : 
  
    (
    <Select
     onChange={handleChange}
     onBlur = {handleBlur}
     id = "category" 
     options={allCategory}
     value = {props?.value?.label}
     />
     ) }

          {props?.error && < div style={{color: "red", marginTop:".5rem"}}> {props?.error} </div>}
    </div>
  )
}
