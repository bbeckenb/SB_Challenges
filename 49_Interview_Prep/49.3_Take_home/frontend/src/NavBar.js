import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="/">Yodlr</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/admin">Admin Page</Nav.Link>
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavBar;