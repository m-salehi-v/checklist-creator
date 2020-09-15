import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

const navigationBar = props => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <LinkContainer to="/" exact><Navbar.Brand>Checklist Creator</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <LinkContainer to="/" exact>
                        <Nav.Link >Home</Nav.Link>
                    </LinkContainer >
                    <LinkContainer to="/create">
                        <Nav.Link >Create</Nav.Link>
                    </LinkContainer >
                    <LinkContainer to="/signin">
                        <Nav.Link >Sign In</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Nav.Link >Sign Up</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default navigationBar;