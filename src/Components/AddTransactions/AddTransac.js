import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";

class AddTransac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      transacName: "",
      amount: 0,
      tag: [],
      category: "",
      type: "Debit",
      startDate: new Date(),
    };
  }

  componentDidMount = async () => {
    const path = window.location.pathname;
    const Id = path.split("/");
    this.setState({ id: Id[2] });
    let data;
    await axios
      .get(`/api/fetchtag/${Id[2]}`)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    const list = ["Choose.."];
    data.map((item) => list.push(item.tag));
    this.setState({ tag: list });
    console.log(list);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // const path = window.location.pathname;
    // const Id = path.split("/")[2];
    try {
      await axios
        .post(`/api/new/${this.state.id}`, {
          transacName: this.state.transacName,
          category: this.state.category,
          amount: this.state.amount,
          date: this.state.startDate,
          type: this.state.type,
        })
        .catch((err) => {
          alert(err);
        });
    } catch {
      alert("some error occured :(");
    }

    this.setState({
      amount: 0,
      transacName: "",
      category: "",
      type: "Debit",
      startDate: new Date(),
    });
    
    alert("Transaction added succesfully");
  };

  render() {
    return (
      <div className="container mt-5">
        <form>
          <br></br>
          {/* personal info */}
          <div className="card">
            <div className="card-header">ENTER NEW TRANSACTION</div>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Transaction Name</label>
                  <input
                    type="string"
                    className="form-control"
                    name="transacName"
                    value={this.state.transacName}
                    placeholder="Transac Name"
                    onChange={(e) => {
                      this.setState({ transacName: e.target.value });
                    }}
                  ></input>
                </div>
              </div>
              <div className="row mt-3">
                <div className="form-group col">
                  <label>Transaction amount</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount"
                    value={this.state.amount !== 0 ? this.state.amount : null}
                    onChange={(e) => {
                      this.setState({ amount: e.target.value });
                    }}
                  />
                </div>
                <div className="form-group col">
                  <label>Tag</label>
                  <select
                    className="form-control"
                    value={this.state.category}
                    onChange={(e) => {
                      this.setState({ category: e.target.value });
                    }}
                  >
                    {this.state.tag.map((items) => (
                      <option>{items}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="from-group col">
                  <label>Type</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.setState({ type: e.target.value });
                    }}
                  >
                    <option>Debit</option>
                    <option>Credit</option>
                  </select>
                </div>
                <div className="form-group col">
                  <label>Date</label>
                  <DatePicker
                    className="form-control"
                    selected={this.state.startDate}
                    onChange={(date) => {
                      this.setState({ startDate: date });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => this.handleSubmit(e)}
          >
            Submit
          </button>
        </form>
        <br></br>
      </div>
    );
  }
}

export default AddTransac;
