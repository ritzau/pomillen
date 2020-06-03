import React from "react";

import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export function TopBar() {
  return (
    <Navbar bg={'light'}>
      <Container>
        <Navbar.Brand as={Link} to="/">Pomillen</Navbar.Brand>
        <Nav className={'ml-auto'}>
          <Nav.Link as={Link} className={'nav navbar-nav navbar-right'} to="/config">Settings</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
