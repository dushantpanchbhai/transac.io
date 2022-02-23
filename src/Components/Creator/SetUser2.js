import React, { Component } from "react";
import "./SetUser.css";
import InputBook2 from "./InputBook2";
import StoredBook2 from "./StoredBook2";
import axios from "../../axios";
import { connect, createMatchSelector} from "react-redux";
import { UpdateBook } from "../../store/action.js";

class SetUser2 extends Component{
  state = {
    accounts: [],
      isEmpty: true,
  }

  componentDidMount() {
    console.log("in com did mount");
    console.log(this.props);
    axios
      .get(`/api/transacBook/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res);
        const accounts = res.data;
        this.props.UpdateBook(accounts);
        if (this.props.accounts.length !== 0) {
          this.updateEmpty(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.accounts !== this.props.accounts) {
      console.log("updating called");
      if (
        this.setState({
          isEmpty: this.props.accounts.length === 0 ? true : false,
        })
      );
    }
  };

  updateEmpty(value) {
    const isEmpty = value;
    this.setState({ isEmpty });
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="transac-head">
          <span>Let's Create your Transac Book</span>
        </div>
        <div className="transac-main">
          <h5>Add the categories of account and their current balance.</h5>
          <InputBook2 />
          <hr></hr>
          {this.state.isEmpty === false ? (
            <>
              <div className="no-book">Your Created Books</div>
              <StoredBook2 />
            </>
          ) : (
            <div className="no-book">No book created yet</div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const accounts = state.accounts;
  const isLogged = state.isLogged;
  const user = state.user;
  const id = ownProps;
  console.log(ownProps);
  return {
    accounts,
    isLogged,
    user,
    id,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateBook: (data) => dispatch(UpdateBook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetUser2);