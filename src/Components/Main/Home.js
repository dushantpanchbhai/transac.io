import React, { Component } from "react";
import "./Home.css";
import { MdCreditCard } from "react-icons/md";
import { BiBookBookmark } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import PerTransac from "./PerTransac";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgImg:
        "https://avatars.dicebear.com/api/adventurer/dushant%20panchbhai.svg",
    };
  }

  render() {
    return (
      <div className="home-main-box">
        <div className="home-left-bar">
          <div className="transac-logo">Transac.io</div>

          <div className="balance-section">
            <div className="balance-title">
              <MdCreditCard className="balance-icon" />
              <span>Balance</span>
            </div>
            <div className="balance-inr">RS 44000</div>
          </div>

          <hr className="balance-margin"></hr>

          <div className="transac-books">
            <div className="transac-book-title">
              <BiBookBookmark className="balance-icon" />
              <span>Transac Books</span>
            </div>
            <div className="transac-books-list-cont">
              <ul className="transac-book-list">
                <li>home transaction</li>
                <li>self transaction</li>
                <li>others transaction</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="home-right-bar">
          {/* navbar */}
          <div className="right-navbar">
            {/* search input */}
            <div className="search-input">
              <AiOutlineSearch className="search-icon" />
              <input placeholder="search"></input>
            </div>
            <div className="nav-left-side">
              {/* add book button */}
              <div className="add-button">
                <div className="add-button-inter">Add Book +</div>
              </div>
              {/* user info */}
              <div className="user-log">
                <FaUserAlt className="user-photo" />
                {/* <img src="https://icon-library.com/images/admin-user-icon/admin-user-icon-4.jpg" className="user-photo"></img> */}
                <div className="user-detail-log">
                  <div className="user-name">Dushant panchbhai</div>
                  <div className="user-id">UIDLKADF191090923</div>
                </div>
              </div>
            </div>
          </div>

          {/* body 1 start info */}
          <div className="hey-info">
            <div className="hey-line1">
              👋<span>Hey Anddy’s Makeover!</span>
            </div>
            <div className="hey-line2">
              Your this month expense is INR 8000.
            </div>
          </div>

          {/* body2 start bar */}
          <div className="body2-bar">
            <div className="books-bar">
              <ul className="books-bar-list">
                <li style={{ color: "#00ca81" }}>main</li>
                <li>self</li>
                <li>others</li>
              </ul>
            </div>
            <div className="line-bar">
              <hr></hr>
            </div>
          </div>

          {/* body3 main transaction history */}
          <div className="transaction-history-container">
            <PerTransac date={2000} title={"amazon payment"} transDate={"16 march 2021 @ 5:00pm"} amount={2000} balance={20000}></PerTransac>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
