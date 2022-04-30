import React, {useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './pages/userAuthentication/login';
import Register from './pages/userAuthentication/register';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Footer from './components/Footer';
import Home from './pages/Home'




export default function App() {

  const [user, setUser] = useState(null);
  const [isInitiated, setInitiated] = useState(false);

  useEffect( () => {
    initialize();
  }, []);

  const initialize = async (req,response) => {
    // const {user} = response.data;
    // setUser(user);
    setInitiated(true);
  };  

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("token", null)
  };

  return (

    <div>
          <Router>
            <NavBar />
            <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='authenticate/user_login' element={<Login/>}/>
            <Route exact path='authenticate/user_register' element={<Register/>}/>

            </Routes>
          </Router>

          <Footer />
    </div>
  );
}


