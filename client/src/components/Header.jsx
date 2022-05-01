import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Header = () => (
  <Navbar className="p-2" bg="primary" expand="lg" variant="dark">
    <Navbar.Brand href="#">IJALTI Peers</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Offers</Nav.Link>
        <Nav.Link href="/create">Create Offer</Nav.Link>
        <Nav.Link href="/companies/create">Create Company</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
