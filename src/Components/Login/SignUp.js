import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../axios.js";
import { AddUser } from "../../store/action.js";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/createUser", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 400) {
          alert("Unable to create account");
        } else {
          alert("account create successfully");
          console.log(res.data);
          dispatch(AddUser(res.data));
          navigate(`/setUser/${res.data._id}`);
        }
      });
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
