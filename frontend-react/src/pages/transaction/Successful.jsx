import React, { useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.png';
import Profile from '../../images/profileIcon.png';
import '../../styles/transaction/Successful.css'; // Make sure to create this CSS file

const Successful = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/dashboard');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <Navbar className="justify-content-between" bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/dashboard" className="mx-auto d-flex justify-content-center align-items-center">
                    <img src={Logo} alt="Logo" height="30" width="30" />
                    ExchangExpress
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown className="nav-dropdown-right" title={<img src={Profile} alt="Profile" height="30" width="30" />} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/newsmember">News</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="success-message text-center mt-5">
                <h1>Transaction Successful</h1>
                <p>You will be redirected to the dashboard shortly.</p>
            </div>
        </>
    );
};

export default Successful;
