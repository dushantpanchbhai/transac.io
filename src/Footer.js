import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div>© Transac.io {new Date().getFullYear()}</div>
    </footer>
  );
}

export default Footer;
