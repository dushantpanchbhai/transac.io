import React, { Component } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login.js";
import SignUp2 from "./Components/Login/SignUp2";
import SetUser2 from "./Components/Creator/SetUser2.js";
import SetUser from "./Components/Creator/SetUser.js";

import SignUp from "./Components/Login/SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/setUser/:id" element={<SetUser/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
// import "./App.css";
// import {Routes, Route, BrowserRouter } from "react-router-dom";
// import Header from "./Components/Header/Header";
// import Login from "./Components/Login/Login.js";
// import SignUp2 from "./Components/Login/SignUp2";
// import SetUser2 from "./Components/Creator/SetUser2.js";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Header/>}/>
//         <Route path="/login" element={<Login></Login>}/>
//         <Route path="/signup" element={<SignUp2/>}/>
//         <Route path="/setUser" element={<SetUser2/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
