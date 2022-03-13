import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className="home-main-box">
          <div className="home-left-bar">dushant</div>
          <div className="home-right-bar">panchbhai</div>
        </div>
    );
  }
}

export default Home;
