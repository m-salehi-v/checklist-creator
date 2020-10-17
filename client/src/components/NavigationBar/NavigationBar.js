import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import './NavigationBar.css';
import * as actions from '../../store/actions'

const NavigationBar = props => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userName = useSelector(state => {
        console.log(state.auth)
        return state.auth.userName});
    const dispatch = useDispatch();
    const onLogout = () => dispatch(actions.logout());

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
                        <NavDropdown title={userName} bg="dark" variant="dark" className="DropDown">
                            <LinkContainer to="/mychecklists"><NavDropdown.Item>My Checklists</NavDropdown.Item></LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/" exact><NavDropdown.Item onClick={onLogout}>Log out</NavDropdown.Item></LinkContainer>
                        </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavigationBar;