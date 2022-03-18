import React, { Component } from "react";
class PerTransac extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <>
        <div className="per-transac">
          <div className="date-category">{this.props.date}</div>
          <div className="transac-history">
            <img
              className="transac-img"
              src="/transactions.png"
              alt="no image found"
            ></img>
            <div className="transac-content">
              <div className="transac-title">{this.props.title}</div>
              <div className="transac-date">{this.props.transDate}</div>
            </div>
            <div className="transac-category">
              <img src="/green_dot.png"></img>
              <div>self</div>
            </div>
            <div className="transac-amount">-INR {this.props.amount}</div>
            <div className="transac-balance">Balance: {this.props.balance}</div>
          </div>
        </div>
      </>
    );
  }
}

export default PerTransac;
