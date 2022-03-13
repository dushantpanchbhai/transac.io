import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "../../axios";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../../store/action.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      const id = userInfo._id;
      dispatch(login(userInfo));
      navigate(`/setUser/${id}`);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

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
          <form
            id="filling-form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Log In
            </button>
            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border" role="status"></div>
              </div>
            )}
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
