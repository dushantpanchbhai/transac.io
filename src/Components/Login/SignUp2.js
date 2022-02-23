import React, { Component } from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from "../../axios.js";

class SignUp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      id: "",
      redirect: null,
    };
  }

  handleChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({ [field]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/createUser", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 400) {
          alert("Unable to create account");
        } else {
          alert("account create successfully");
          this.setState({ id: res.data });
          console.log(this.state.id);
        }
      });
    console.log("handlling submit event");
    // let navigate = useNavigate();
    // navigate(`/setUser`);
  }

  render() {
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
                this.handleSubmit(e);
              }}
            >
              <div class="mb-3">
                <label for="name" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={this.state.name}
                  name="username"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={this.state.email}
                  name="email"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
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
                  value={this.state.password}
                  name="password"
                  onChange={(e) => {
                    this.handleChange(e);
                  }}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => this.handleSubmit(e)}
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
}

export default SignUp2;
