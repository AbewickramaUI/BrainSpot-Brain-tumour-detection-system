import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field } from 'formik';
import TextFields from './TextFields';
import * as Yup from 'yup';
import './add.css' ;
import { updateUser } from './UpdateUser.helper';
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { serverUrl } from "../../Config" ;


export default function UpdateUser(props) {

  const [updateuser, setupdateuser] = useState([]);
  const {uid}=useParams();
  const navigate = useNavigate() 


  
  const fetch = () => {
    axios
      .get(`${serverUrl}/user`, {
        headers: {
          "authorization": localStorage.getItem("token")
        },
      })
      .then(res => {
        setupdateuser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  //---------------------------------------------------------------------------

  const [initialValues, setInitialValues] = useState({
    id: '',
    username: '',
    email: '',
    password : '',
    userlevel : '',
  })

  //-----------------------------------------------------------------------------------
 
  const fetchini = () => {
    setInitialValues({
      id:uid,
      username: '',
      email: '',
      password : '',
      userlevel : '',
    })
  }

  useEffect(() => {
    fetchini()
  }, [])


  const validate = Yup.object({
    id: Yup.string().required('required'),
    username: Yup.string().required('required'),
    email: Yup.string().required('email is required').email('Email is invalid'), //checked
    password: Yup.string().required('password is required').min(6,'Password must be at least 6 characters'),
    confirm_password: Yup.string().required('password is required').oneOf([Yup.ref('password'),null],'Password must match'),
    userlevel: Yup.number().positive('Invalid user level').required('required').typeError('Invalid Input Type'),
  })
  return (
    <>
      <div className="container mt-3" >
        <div className="row">
          <div className="col md-5" >
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={validate}
            >
              {formik => {
                console.log(formik);
                return (
                  <div>
                    <h1 className="my-4 font-weight-bold-display-4">Update User</h1>
                    <Form>
                      <TextFields label="User ID" name="id" type="text" readOnly={true} />
                      <TextFields label="Update User Name" name="username" type="text" />
                      <TextFields label="Update User Email" name="email" type="email" />
                      <TextFields label="Update User Password" name="password" type="password" />
                      <TextFields label="Confirm Password" name="confirm_password" type="password" />
                      <TextFields label="Update User Level" name="userlevel" type="text" />
                      <button className="add" onClick={() => {
                        updateUser(formik.values)
                          .then(() => {
                            formik.resetForm()
                            fetch()
                            window.alert('User Updated Sucessfully')
                            navigate('/viewuser')
                            
                          })
                          .catch((err) => {
                            // setNotification('Error')
                            window.alert('Unable to Update User')
                          })
                      }}>Update User</button>
                      <button className="reset" type='reset'>Reset</button>
                      <Link to={'/viewuser'}>
                        <button className="back">Back</button>
                      </Link>
                    </Form>
                  </div>
                )
              }}
            </Formik>
          </div>
          <div className="col md-7" style={{
            height: 300,
            overflowY: 'scroll',
            marginTop: 105
          }}>
            <table className="table table-striped table-dark">
              <thead className="thead-light">
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">User Level</th>
                </tr>
              </thead>
              <tbody>
                {
                  updateuser.map(getu => (
                    <tr key={getu.id}>
                      <td>{getu.id}</td>
                      <td>{getu.username}</td>
                      <td>{getu.email}</td>
                      <td>{getu.userlevel}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  );
};
