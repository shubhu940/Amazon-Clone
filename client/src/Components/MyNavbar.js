import React from "react";
import {
  Container,
  Navbar,
  Nav,
  NavLink,
  NavbarToggle,
  NavbarCollapse,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { UseAuth } from "../store/auth";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";


const MyNavbar = ({ searchQuery, setSearchQuery }) => {
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
  const cartSize = cartItems.length; // Get the cart size

  const { isLoggedIn, LogoutUser, user } = UseAuth();

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="sm" className="justify-content-between">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src="loginimage.jpg"
            alt="Farmers Product"
            height="30"
            width="30"
            className="d-inline-block align-top"
          />
          &nbsp;Farmers Product
        </Navbar.Brand>
        <NavbarToggle aria-controls="navbar-nav" />
        <NavbarCollapse id="navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <NavLink as={Link} to="/home">
              Home
            </NavLink>
            <NavDropdown title="Services" id="nav-services">
              <NavDropdown.Item as={Link} to="/service1">Service 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/service2">Service 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Header>More Services</NavDropdown.Header>
              <NavDropdown.Item as={Link} to="/service3">Service 3</NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} to="/fruits">
              Fruits
            </NavLink>
            <NavLink as={Link} to="/youtube">
              YouTube
            </NavLink>
            <NavLink as={Link} to="/oils">
              Oil
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink as={Link} to="/logout" onClick={LogoutUser}>
                  Logout
                </NavLink>
                {user && user.isAdmin && (
                  <NavLink as={Link} to="/admin_login">Admin</NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink as={Link} to="/register">
                  Register
                </NavLink>
                <NavLink as={Link} to="/login">
                  Login
                </NavLink>
              </>
            )}
          </Nav>
          <div className="d-flex align-items-center">
            {isLoggedIn && user && (
              <h4 className="navbar-text text-white me-3">Welcome, {user.name}</h4>
            )}
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <NavLink as={Link} to="/cart" className="ms-3">
              <span className="cart-icon position-relative">
                <FontAwesomeIcon icon={faShoppingCart} />
                {cartSize > 0 && <sup className="badge bg-danger">{cartSize}</sup>}
              </span>
            </NavLink>
          </div>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
