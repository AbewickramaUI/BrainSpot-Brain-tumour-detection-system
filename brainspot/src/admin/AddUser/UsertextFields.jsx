import React from 'react'
import { ErrorMessage,useField } from 'formik'
import "bootstrap/dist/css/bootstrap.min.css"; //checked
import './add_user.css' //solved

export default function UsertextFields({label,...props}) { //to tranfer data within files
    const [field,meta]=useField(props);
  return ( // margin bottom
    <div className='mb-2'> 
        <label htmlFor={field.name}>{label}</label>
        <input  // blue hover effect when tap over an input field
            className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`} // to handle errors
            {...field} {...props}
            autoComplete="off"
        />
        <ErrorMessage component="div" name={field.name} className="error"/>
    </div>
  )
}
