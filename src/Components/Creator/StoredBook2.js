import React, { Component } from "react";
import axios from "../../axios";
import TableContent from "./TableContent";
import { connect } from "react-redux";


class StoredBook2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: this.props.accounts,
    };
  };

  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">BookName</th>
              <th scope="col">Balance</th>
              <th scope="col">Tag</th>
            </tr>
          </thead>
          <tbody>
            {this.props.accounts.map((items,index)=> {
              return(<TableContent key={items._id} userId={this.props.userId} id={items._id} row={index + 1} data={items}></TableContent>)
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state,ownProps) {
  const accounts = state.accounts;
  const isLogged = state.isLogged;
  const user = state.user;
  const userId = ownProps.userId;
  return {
    accounts,
    isLogged,
    user,
    userId,
  };
}
export default connect(mapStateToProps)(StoredBook2);
