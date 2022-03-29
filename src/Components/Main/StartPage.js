import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/action";
import "./startPage.css";
import Footer from "../../Footer";

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.props.loggingIn(userInfo);
    }
  }

  render() {
    return (
      <>
        {this.props.isLogged && (
          <Navigate to={`/home/${this.props.user._id}`} />
        )}
        <div className="first-page">
          <img
            className="right-design"
            src="./right_design.png"
            alt="unable to load"
          ></img>
          <img
            className="left-design"
            src="./left_design.png"
            alt="unable to load"
          ></img>
          <div className="intro_header">
            <div className="intro-line1">👋 Hii! I'm Transac.io</div>
            <div className="intro-line2">Your Transaction Manager 📙</div>
            <hr className="divider-line"></hr>
            <div className="intro-line3">
              A books based App to make you free from Transaction Management
            </div>
            <div className="start-button" type="button">
              <Link to="/login" className="link">
                <div className="start-text">GET STARTED</div>
              </Link>
            </div>
            <ul className="function-list">
              <li>
                <img src="./tick.png" alt=""></img>
                <span>Keeps All Transactions</span>
              </li>
              <li>
                <img src="./tick.png" alt=""></img>
                <span>Categorizes them in tags</span>
              </li>
              <li>
                <img src="./tick.png" alt=""></img>
                <span>Makes life simple</span>
              </li>
            </ul>
          </div>
          <img
            className="right-vector"
            src="./right_vector2.png"
            alt="unable to load"
          ></img>
          <div className="scrool-down"></div>
        </div>
        <div className="second-page">
          <div className="steps-heading">
            <div className="how-works">How it works?</div>
            <div className="easy-steps">Just 3 easy steps.</div>
            <hr></hr>
          </div>
          <img
            className="steps-images"
            src="./process.png"
            alt="unable to load"
          ></img>
          <img
            className="second-left-design"
            src="./left_design.png"
            alt="unable to load"
          ></img>

          <div className="start-button" type="button">
            <Link to="/login" className="link">
              <div className="start-text">Create Your Account</div>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  const isLogged = state.isLogged;
  const user = state.user;
  return { isLogged, user };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loggingIn: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
