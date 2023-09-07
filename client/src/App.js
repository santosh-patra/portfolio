import React from 'react';
import "./index.css";
import Home from "./routes/Home"
import Project from "./routes/Project"
import About from "./routes/About"
import Contact from "./routes/Contact"
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Experience from './routes/Experience';
function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/experience' element={<Experience/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
    </>
  );
}

export default App;
