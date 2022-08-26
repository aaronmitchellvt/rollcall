import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Events from "./pages/Events";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import EventShow from "./components/EventShow";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
            <Routes>
              <Route exact path="/" element={<Events />} />
              <Route exact path="/events/:id" element={<EventShow />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
