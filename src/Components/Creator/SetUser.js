import React, { useState, useEffect } from "react";
import "./SetUser.css";
import InputBook2 from "./InputBook2";
import StoredBook2 from "./StoredBook2";
import { useParams,Link} from "react-router-dom";
import axios from "../../axios.js";
import { useDispatch, useSelector } from "react-redux";
import { UpdateBook } from "../../store/action";

function SetUser() {
  const accounts = useSelector((state) => state.accounts);
  const dispatch = useDispatch();
  const params = useParams();
  const [isEmpty, setIsEmpty] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/transacBook/${params.id}`)
      .then((res) => {
        console.log(res);
        const books = res.data;
        dispatch(UpdateBook(books));
        if (accounts.length !== 0) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.error);
        setError(true);
      });
  }, []);

  useEffect(() => {
    console.log("updating div called");
    console.log(accounts);
    accounts.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
  }, [accounts]);
  if (error) {
    return(
      <div className="container mt-5">
      <h1 >:( SOMETHING WENT WRONG !!</h1>
      <p>Please <Link to="/">Reload</Link></p>
      </div>
    );
  } else {
    return (
      <div className="container mt-4">
        <div className="transac-head">
          <span>Let's Create your Transac Book</span>
        </div>
        <div className="transac-main">
          <h5>Add the categories of account and their current balance.</h5>
          <InputBook2 id={params.id} />
          <hr></hr>
          {isEmpty === false ? (
            <>
              <div className="no-book">Your Created Books</div>
              <StoredBook2 userId={params.id} />
            </>
          ) : (
            <div className="no-book">No book created yet</div>
          )}
        </div>
      </div>
    );
  }
}

export default SetUser;
