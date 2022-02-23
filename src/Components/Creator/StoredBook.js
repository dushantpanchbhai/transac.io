import React, { useState, useEffect } from "react";
import TableContent from "./TableContent";
import "./StoredBook.css";
import axios from "../../axios";

function StoredBook(props) {
  const [book, setBook] = useState();

  useEffect(() => {
    async function fetchData() {
      await axios.get("/api/transacBook").then((res) => {
        console.log(res.data);
        const data = res.data;
        setBook(data);
        console.log(book);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">BookName</th>
            <th scope="col">Balance</th>
            <th scope="col">Tag</th>
          </tr>
        </thead>
        <tbody>
          {/* {book.map((items,index) => { */}
          {/* return(<TableContent row={index+1} BookName={items.bookName} Balance={items.balance} tag={items.tag}></TableContent>) */}
          {/* })} */}
        </tbody>
      </table>
    </div>
  );
}

export default StoredBook;
