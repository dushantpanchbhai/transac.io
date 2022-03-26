//not included
import React, { useState } from "react";
import axios from "../../axios.js";

function InputBook() {
  const [bookName, setBookName] = useState("");
  const [balance, setBalance] = useState(0);
  const [tag, setTag] = useState("");
  const [havePrevious, setHavePrevious] = useState(false);
  const [file, setFile] = useState(null);

  async function postData(event) {
    event.preventDefault();
    axios
      .post("/api/create",{
        bookName : bookName,
        balance : balance,
        tag : tag,
        previous : havePrevious,
      })
      .then(() => {
        console.log("posted succesfully from react side");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="content-box">
      <div className="container mt-2 mb-3">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            BookName
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your Transaction book Name"
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <div className="form-group col mb-3">
            <label className="form-label">Current Balance</label>
            <div class="input-group">
              <span class="input-group-text">Rs</span>
              <span class="input-group-text">{balance}</span>
              <input
                type="text"
                class="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                value={balance}
                onChange={(e) => {
                  setBalance(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="form-group col mb-3">
            <label className="form-label">Tag Name</label>
            <div class="input-group">
              <span class="input-group-text">#</span>
              <input
                type="text"
                class="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div class="form-check mb-3">
          <label class="form-check-label" for="defaultCheck1">
            Have Previous Transactions?
          </label>
          <input
            class="form-check-input"
            type="checkbox"
            checked={havePrevious}
            id="defaultCheck1"
            onChange={(e) => {
              setHavePrevious(e.target.checked);
            }}
          />
        </div>
        {havePrevious === true && (
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control md-3"
              id="inputGroupFile01"
              value={file}
              onChange={(e) => {
                setFile(e.target.value);
              }}
            />
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary"
          id="add-button"
          onClick={postData}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default InputBook;
