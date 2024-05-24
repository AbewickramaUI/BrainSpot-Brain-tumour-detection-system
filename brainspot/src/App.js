import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Link, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './components/home';
import About from './components/about';
import Service from './components/service';
import Contact from './components/contact';
import Login from './components/login';
import Footer from './components/footer';
import Upload from './components/FileUploadForm';
import ViewUser from './admin/ViewUser/ViewUser';
import AddUser from './admin/AddUser/AddUser';
import UpdateUser from './admin/UpdateUser/UpdateUser';

function App() {

    const [userlevel, setUserLevel] = useState(0);

    useEffect(() => {
        setUserLevel(Number(localStorage.getItem("level")));
    }, [])

    if(!userlevel){
      return (
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      );
    }
    if( userlevel == 1 ){
      return (
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
    ``````````<Route path="/viewuser" element={<ViewUser />} />
              <Route path="/adduser" element={<AddUser />} /> 
              <Route path="/updateuser/:uid" element={<UpdateUser />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      );
    }
    if( userlevel == 2 ){
      return (
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      );
    }

  
}

export default App;


