import React, { Component } from "react";
import "./Home.css";
import { MdCreditCard } from "react-icons/md";
import { BiBookBookmark } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import PerTransac from "./PerTransac";
import axios from "../../axios";
import { connect } from "react-redux";
import { addBalance, addTransac, addBookData } from "../../store/action";
import { Navigate } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: 0,
      transactions: [],
      routeToAddBook: false,
      routeToAddTransaction: false,
    };
  }

  calculateExpenses = (data) => {
    var exp = 0;
    data.map((items) => {
      var date1 = new Date(items.date);
      var date2 = new Date();
      if (date1.getMonth() > date2.getMonth() - 1) {
        exp += items.amount;
        // console.log("is big ",date1,date2);
      }
    });

    this.setState({ expense: exp });
  };

  componentDidMount = async () => {
    //fetch user

    //fetching transactions
    const Id = window.location.pathname.split("/")[2];
    console.log("id is ", Id);
    const fetch = await axios.get(`/api/fetchMain/${Id}`);
    this.props.addTransac(fetch.data);
    //for low updating time;
    this.setState({ transactions: fetch.data });

    //calculatting expenses
    this.calculateExpenses(fetch.data);

    //fetching books
    const booksFetch = await axios.get(`/api/fetchBook/${Id}`);
    this.props.addBookData(booksFetch.data);

    //fetching balance
    const balance = await axios.get(`/api/fetchBalance/${Id}`);
    this.props.addBalance(balance.data.totalBalance);
  };

  render() {
    return (
      <>
        {this.state.routeToAddTransaction && <Navigate to={`/addtransac/${window.location.pathname.split("/")[2]}`}></Navigate>}
        {this.state.routeToAddBook && <Navigate to={`/setUser/${window.location.pathname.split("/")[2]}`}></Navigate>}
        <div className="home-main-box">
          <div className="home-left-bar">
            <div className="transac-logo">Transac.io</div>

            <div className="balance-section">
              <div className="balance-title">
                <MdCreditCard className="balance-icon" />
                <span>Balance</span>
              </div>
              <div className="balance-inr">RS {this.props.balance}</div>
            </div>

            <hr className="balance-margin"></hr>

            <div className="transac-books">
              <div className="transac-book-title">
                <BiBookBookmark className="balance-icon" />
                <span>Transac Books</span>
              </div>
              <div className="transac-books-list-cont">
                <ul className="transac-book-list">
                  {this.props.books.map((item) => (
                    <li>{item.bookName}</li>
                  ))}
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
                  <div
                    className="add-button-inter"
                    onClick={() => {this.setState({routeToAddBook : true})}}
                  >
                    Add Book +
                  </div>
                </div>
                <div className="add-button">
                  <div
                    className="add-button-inter"
                    onClick={() => {this.setState({routeToAddTransaction : true})}}
                  >
                    Add Transac
                  </div>
                </div>
                {/* user info */}
                <div className="user-log">
                  <FaUserAlt className="user-photo" />
                  <div className="user-detail-log">
                    <div className="user-name">{this.props.user.username}</div>
                    <div className="user-id">{this.props.user._id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* body 1 start info */}
            <div className="hey-info">
              <div className="hey-line1">
                👋<span>Hey {this.props.user.username}!</span>
              </div>
              <div className="hey-line2">
                Your this month expense is {this.state.expense}.
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
              {this.props.transactions.map((item) => (
                <PerTransac
                  date={`${new Date(item.date).getDate()}-${
                    new Date(item.date).getMonth() + 1
                  }-${new Date(item.date).getFullYear()}`}
                  title={item.transacName}
                  transDate={`Date : ${item.date.substr(
                    0,
                    10
                  )} , Time : ${item.date.substr(11, 5)}`}
                  category={item.category}
                  amount={item.amount}
                  balance={item.balance}
                  type={item.transacType}
                ></PerTransac>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const transactions = state.transactions;
  const balance = state.balance;
  const books = state.books;
  const user = state.user;
  return {
    transactions,
    balance,
    books,
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTransac: (data) => dispatch(addTransac(data)),
    addBalance: (data) => dispatch(addBalance(data)),
    addBookData: (data) => dispatch(addBookData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
