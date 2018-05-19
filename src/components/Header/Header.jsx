import propTypes from "prop-types";
import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  max-width: 100%;
  min-height: 50px;
  border-bottom: 1px solid darkgrey;
  .active {
    padding: 10px;
    color: white;
    background-color: black;
    text-decoration: none;
  }
`;

const Header = ({ isAuthenticated, onLogout }) => (
  <Wrapper>
    <NavLink exact to="/">
      News
    </NavLink>
    <NavLink exact to="/profile">
      Profile
    </NavLink>

    {isAuthenticated ? (
      <Link to="/" onClick={onLogout}>
        Logout
      </Link>
    ) : (
      <NavLink exact to="/login">
        Login
      </NavLink>
    )}
  </Wrapper>
);

Header.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  onLogout: propTypes.func.isRequired
};

export default Header;
