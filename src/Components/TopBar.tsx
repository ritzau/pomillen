import React from "react";

import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

export function TopBar() {
    return (
        <Navbar bg={'light'}>
            <Container fluid={'lg'}>
                <Navbar.Brand>Pomillen</Navbar.Brand>
                <Nav className={'ml-auto'}>
                    <Nav.Link as={Link} className={'nav navbar-nav navbar-right'} to="/config">
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export function BackBar() {
    return (
        <Navbar bg={'light'}>
            <Container fluid={'lg'}>
                <Nav.Link as={Link} className={'pl-0'} to="/"><FontAwesomeIcon icon={faChevronLeft} /> Tillbaka</Nav.Link>
            </Container>
        </Navbar>
    );
}
