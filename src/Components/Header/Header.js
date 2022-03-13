import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  let isLogged = useSelector((state) => state.isLogged);
  let userInfo;
  if(isLogged)
  {
    userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        id="NavMain"
      >
        <div className="container" id="NavContainer">
          <Link className="navbar-brand" to="/">
            Transac.io
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={isLogged ? `/home/${userInfo._id}` : "/setUser"}
                >
                  Home
                </Link>
              </li>
              {isLogged ? (
                <>
                <li className="nav-item">
                    <Link className="nav-link" to={`/logout/${userInfo._id}`}>
                      Logout
                    </Link>
                </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      SignUp
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
