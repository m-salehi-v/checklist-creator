import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

import './NavigationBar.css';
const NavigationBar = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
                    {!isAuthenticated && <LinkContainer to="/signin">
                        <Nav.Link >Sign In</Nav.Link>
                    </LinkContainer>}
                    {!isAuthenticated ?
                        <LinkContainer to="/signup">
                            <Nav.Link >Sign Up</Nav.Link>
                        </LinkContainer> :
                        <NavDropdown title="User" bg="dark" variant="dark" className="DropDown">
                            <LinkContainer to="/mychecklists"><NavDropdown.Item>My Checklists</NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >Log out</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;