import React, { Component } from "react";
import { connect } from "react-redux";
import { addBook } from "../../store/action.js";
  import axios from "../../axios";

//included
class InputBook2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      balance: null,
      tag: "",
    };
  }

  componentDidMount = () => {
    console.log(this.props.id);
  }

  handleChange = (e) => {
    let item = e.target.name;
    let val = e.target.value;
    this.setState({ [item]: val });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/create/${this.props.id}`, {
        bookName: this.state.bookName,
        balance: this.state.balance,
        tag: this.state.tag,
      })
      .then((res) => {
        this.props.addBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    this.setState({
      bookName: "",
      balance: null,
      tag: "",
    });
    console.log("account after update is ");
    console.log(this.props.accounts);
  };

  render() {
    return (
      <div className="content-box">
        <div className="container mt-2 mb-3">
          <div className="mb-3">
            <label className="form-label">BookName</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Transaction book Name"
              value={this.state.bookName}
              name="bookName"
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className="row">
            <div className="form-group col mb-3">
              <label className="form-label">Current Balance</label>
              <div className="input-group">
                <span className="input-group-text">Rs</span>
                <span className="input-group-text">{this.state.balance ? this.state.balance : "0"}</span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  value={this.state.balance}
                  placeholder="balance"
                  name="balance"
                  required="true"
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
            </div>
            <div className="form-group col mb-3">
              <label className="form-label">Tag Name</label>
              <div className="input-group">
                <span className="input-group-text">#</span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Dollar amount (with dot and two decimal places)"
                  value={this.state.tag}
                  name="tag"
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            id="add-button"
            onClick={(e) => this.handleSubmit(e)}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const accounts = state.accounts;
  const isLogged = state.isLogged;
  const user = state.user;
  const id = ownProps.id;
  return {
    accounts,
    isLogged,
    user,
    id,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    addBook: (data) => dispatch(addBook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputBook2);
