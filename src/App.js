import React, { Component } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login.js";
import SetUser from "./Components/Creator/SetUser.js";
import Home from "./Components/Main/Home.js";
import SignUp from "./Components/Login/SignUp";
import Logout from "./Components/Login/Logout";
import StartPage from "./Components/Main/StartPage";
import AddTransac from "./Components/AddTransactions/AddTransac";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header/><StartPage/></>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/setUser/:id" element={<><Header/><SetUser/></>}/>
          <Route path="/home/:id" element={<Home/>}/>
          <Route path="/logout/:id" element={<Logout></Logout>}/>
          <Route path="/addtransac/:id" element={<AddTransac></AddTransac>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
