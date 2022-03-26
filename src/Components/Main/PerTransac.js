import React, { Component } from "react";
class PerTransac extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="per-transac">
          <div className="date-category">{this.props.date}</div>
          <div className="transac-history">
            <div className="transac-content">
            <img
              className="transac-img"
              src="/transactions.png"
              alt="no image found"
            ></img>
              <div className="transac-content-left">
                <div className="transac-title">{this.props.title}</div>
                <div className="transac-date">{this.props.transDate}</div>
              </div>
            </div>
            <div className="transac-category">
              <img src="/green_dot.png"></img>
              <div>{this.props.category}</div>
            </div>
            <div className="transac-amount">
              {this.props.type === "Debit" ? "- " : "+ "} INR{" "}
              {this.props.amount}
            </div>
            <div className="transac-balance">Balance: {this.props.balance}</div>
          </div>
        </div>
      </>
    );
  }
}

export default PerTransac;
