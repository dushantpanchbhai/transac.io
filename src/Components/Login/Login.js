import React,{useState,useEffect} from "react";
import "./Login.css";
import {Link} from "react-router-dom";
import axios from "../../axios";

function Login() {
  const [data,setData] = useState([]);
  
  useEffect(()=> {
    async function fetchData() {
      const req = await axios.get('/');
      setData(req.data);
    }
    fetchData();
    console.log(data);
  },[])

  return (
    <div className="container" id="Login-page">
      <div className="mt-5" id="top_bar">
        <h1>Welcome to Transac.io</h1>
        <span id="short_title">Place where your Transaction got stored</span>
      </div>

      <div className="login-container">
        <div className="card" id="login-content">
          <div className="login-title">Log In</div>
          <hr></hr>
          <form id="filling-form">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Log In
            </button>
          </form>
          <hr></hr>
          <div className="login-bottom">
            <div className="forgot-password">
              <Link to="/forgot">Forgot Password?</Link>
            </div>
            <div className="no-account">
              Don't Have Account? <Link to="/signup">Sign Up...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
