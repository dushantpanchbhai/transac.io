import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "../../axios.js";
import {AddUser,login} from "../../store/action.js";
import "./SignUp.css";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      const id = userInfo._id;
      dispatch(login(userInfo));
      navigate(`/setUser/${id}`);
    }
  },[navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);
      const { data } = await axios.post("/api/createUser", {
        username: username,
        email: email,
        password: password,
      },config);

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(AddUser(data));
      setLoading(false);
      navigate(`/setUser/${data._id}`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container" id="Login-page">
      <div className="mt-5" id="top_bar">
        <h1>Welcome to Transac.io</h1>
        <span id="short_title">Let's start by creating your account</span>
      </div>
      <div className="login-container">
        <div className="card" id="login-content">
          <div className="login-title">Sign up</div>
          <hr></hr>
          <form
            id="filling-form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
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
              Sign Up
            </button>
            {loading && (
              <div className="d-flex justify-content-center mt-3">
                <div className="spinner-border" role="status" />
              </div>
            )}
          </form>
          <hr></hr>
          <div className="login-bottom">
            <div className="no-account">
              Already Have Account? <Link to="/login">Log In...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
