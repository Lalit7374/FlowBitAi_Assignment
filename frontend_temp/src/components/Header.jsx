import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">Flowbitai Assingnment</div>
        <nav>
          <Link to="/">Home</Link>
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
