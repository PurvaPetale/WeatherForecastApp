// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #6b78c4;
  padding: 10px 20px;
  z-index: 1;
`;

const NavbarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavbarListItem = styled.li`
  display: inline;
  margin-right: 20px;
`;

const NavbarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <NavbarList>
        <NavbarListItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarLink to="/city-table">City Table</NavbarLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarLink to="/weather">Weather</NavbarLink>
        </NavbarListItem>
      </NavbarList>
    </StyledNavbar>
  );
};

export default Navbar;
