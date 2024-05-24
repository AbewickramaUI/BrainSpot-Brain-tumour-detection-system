import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Formik, Form } from 'formik';
import userImage from "../Assests_user/user.png";
import TextFields from './UsertextFields';
import * as Yup from 'yup'; //to do the validations
import './add_user.css' //done
import { adduser } from './adduser.helper';
import { Link } from "react-router-dom";

export default function AddUser() { //validations 
  const validate = Yup.object({
    username: Yup.string().required('required'),
    email: Yup.string().required('email is required').email('Email is invalid'), //checked
    password: Yup.string().required('password is required').min(6,'Password must be at least 6 characters'),
    confirm_password: Yup.string().required('password is required').oneOf([Yup.ref('password'),null],'Password must match'),
    userlevel: Yup.number().positive('Invalid user level').required('required').typeError('Invalid Input Type')
  })
  return (// set margin (m) and screen size
    <> 
      <div className="container mt-3">  
        <div className="row">
          <div className="col md-5">
            <Formik // check function
              initialValues={{
                username:'', 
                email:'', 
                password:'',
                confirm_password:'',
                userlevel: '',
              }}
              validationSchema={validate}
            >
              {formik => (
                <div>
                  <h1 className="my-4 font-weight-bold-display-4">Add User</h1>
                  <Form>
                    <TextFields label="User Name" name="username" type="text" />
                    <TextFields label="Email" name="email" type="email" />
                    <TextFields label="Password" name="password" type="password" />
                    <TextFields label="Confirm Password " name="confirm_password" type="password" />
                    <TextFields label="User Level" name="userlevel" type="text" />
                    <button className="add" onClick={() => {
                        adduser(formik.values)
                          .then(() => {
                            formik.resetForm()
                            // setNotification('Success')
                            window.alert('User Added Sucessfully')
                          })
                          .catch((err) => {
                            // setNotification('Error')
                            window.alert('Error adding user')
                          })
                      }}>Add User</button>
                    <button className="reset" type='reset'>Reset</button>
                    <Link to={'/viewuser'}>
                      <button className="back">Back</button>
                    </Link>
                    {/* <div></div> */}
                  </Form>
                </div>
              )} 
            </Formik>
          </div> 
          <div className="col md-7 my-auto "> 
            { <img className="img-fluid w-100" src={userImage} alt='' /> }
          </div>
        </div>
      </div>
    </>
    // to get into desktop screen size
  )
}
