import React, { useState, useEffect } from "react";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/action.js";

function Logout() {
  const [countDown, setCountDown] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  }, []);

  useEffect(() => {
    countDown > 0 && setTimeout(() => setCountDown(countDown - 1), 1000);
    countDown===0 && navigate('/');
  }, [countDown]);

  return (
    <div className="container mt-4" id="logout-main">
      <iframe
        src="https://giphy.com/embed/xT9IgG50Fb7Mi0prBC"
        width="480"
        height="240"
        frameBorder="0"
        class="giphy-embed"
        id="goodbye-gif"
      ></iframe>
      <h1>Logged out succesfully</h1>
      <h4>redirecting in {countDown}</h4>
    </div>
  );
}

export default Logout;
