import React, { Component } from "react";
import "./Home.css";
import { MdCreditCard } from "react-icons/md";
import { BiBookBookmark } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import PerTransac from "./PerTransac";
import axios from "../../axios";
import { connect } from "react-redux";
import { addBalance, addTransac, addBookData } from "../../store/action";
import { Navigate, Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      expense: 0,
      transactions: [],
      routeToAddBook: false,
      routeToAddTransaction: false,
      currentTab: "main",
      logout: false,
      tempBalance: 0,
    };
  }

  decreseCount = (amount) => {
    const newVal = this.state.tempBalance - amount;
    this.setState({ tempBalance: newVal });
    return this.state.tempBalance;
  };

  barButtonClick = (data) => {
    // console.log("bar button click");
    // console.log(data);
    this.setState({ currentTab: data });
  };

  calculateExpenses = (data) => {
    var exp = 0;
    data.map((items) => {
      var date1 = new Date(items.date);
      var date2 = new Date();
      if (date1.getMonth() > date2.getMonth() - 1) {
        exp += items.amount;
      }
    });

    this.setState({ expense: exp });
  };

  componentDidMount = async () => {
    //fetch user

    //fetching transactions
    const Id = window.location.pathname.split("/")[2];
    console.log("id is ", Id);
    this.setState({ id: Id });

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
        {/* add transaction route */}
        {this.state.routeToAddTransaction && (
          <Navigate to={`/addtransac/${this.state.id}`}></Navigate>
        )}
        {/* add book route */}
        {this.state.routeToAddBook && (
          <Navigate to={`/setUser/${this.state.id}`}></Navigate>
        )}
        {/* logout navigate */}
        {this.state.logout && <Navigate to={`/logout/${this.state.id}`} />}
        {/* page data */}
        <div className="home-main-box">
          <div className="home-left-bar">
            <div className="transac-logo">
              <Link to="/" className="link">
                Transac.io
              </Link>
            </div>

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
              {/* left pannel books section */}
              <div className="transac-books-list-cont">
                <ul className="transac-book-list">
                  {this.props.books.map((item) => (
                    <li
                      type="button"
                      onClick={(e) => {
                        this.setState({ currentTab: item.tag });
                      }}
                    >
                      {item.bookName}
                    </li>
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
                    onClick={() => {
                      this.setState({ routeToAddBook: true });
                    }}
                  >
                    Add Book +
                  </div>
                </div>
                <div className="add-button">
                  <div
                    className="add-button-inter"
                    onClick={() => {
                      this.setState({ routeToAddTransaction: true });
                    }}
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
                  <FiLogOut
                    className="user-logout"
                    type="button"
                    onClick={(e) => {
                      this.setState({ logout: true });
                    }}
                  />
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
                  <li
                    type="button"
                    className={
                      this.state.currentTab === "main"
                        ? "li_activated"
                        : "li_normal"
                    }
                    onClick={() => {
                      this.barButtonClick("main");
                    }}
                  >
                    main
                  </li>
                  {this.props.books.map((item) => (
                    <li
                      type="button"
                      className={
                        this.state.currentTab === item.tag
                          ? "li_activated"
                          : "li_normal"
                      }
                      onClick={() => {
                        this.barButtonClick(item.tag);
                      }}
                    >
                      {item.tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="line-bar">
                <hr></hr>
              </div>
            </div>

            {/* body3 main transaction history */}
            <div className="transaction-history-container">
              {/* category transactoions */}
              {this.props.transactions
                .filter((data) => {
                  if (this.state.currentTab === "main") {
                    return true;
                  }
                  return data.category === this.state.currentTab;
                })
                .reverse()
                .map((item) => (
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
                    balance={
                      this.state.currentTab === "main"
                        ? item.totalBalance
                        : item.balance
                    }
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
