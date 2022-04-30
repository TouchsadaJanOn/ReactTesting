import React from 'react';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './pages/userAuthentication/login';
import Register from './pages/userAuthentication/register';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from './components/Footer';
import Home from './pages/Home'
import ViewQuestions from './pages/QuestionPage/ViewQuestions';
import CreateQuestions from './pages/QuestionPage/CreateQuestions';




export default function App() {
  return (
    <div>
          <Router>
            <NavBar />
            <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='authenticate/user_login' element={<Login/>}/>
            <Route exact path='authenticate/user_register' element={<Register/>}/>
            <Route exact path='users/view_question' element={<ViewQuestions />}/>
            <Route exact path='users/ask_question' element={<CreateQuestions />}/>
            </Routes>
          </Router>
          
          <Footer />
    </div>
  );
}


