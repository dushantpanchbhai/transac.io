import React, { Component } from "react";
import { AiFillDelete } from "react-icons/ai";
import { connect } from "react-redux";
import {DeleteBook} from "../../store/action.js";
import axios from "../../axios";

class TableContent extends Component {
  handleDelete() {
    console.log("handle delete called");
    let t;
    axios
    .delete(`/api/transac/delete/${this.props.userId}/${this.props.id}`)
    .then((res) => {
      console.log(res.data);
      t = res.data;
      this.props.deleteBook(t);
    })
    .catch((error) => {
      console.log(error);
    });
    
  }
  render() {
    return (
      <>
        <tr>
          <th scope="row">{this.props.row}</th>
          <td>{this.props.data.bookName}</td>
          <td>{this.props.data.balance}</td>
          <td>{this.props.data.tag}</td>
          <td type="button" onClick={(e) => this.handleDelete()}>
            <AiFillDelete />
          </td>
        </tr>
      </>
    );
  }
}

function mapStateToProps(states)
{
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    deleteBook : (id) => dispatch(DeleteBook(id)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TableContent);
