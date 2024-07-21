import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../images/logo.png";
import "../../styles/login/Register.css";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/users/register", user);
            // const userId = response.data.id; // Get the user_id from response
            localStorage.setItem('username', user.username); // Store the user_id in localStorage
            navigate("/finishsetup");
        } catch (err) {
            console.error(err); // Add error handling
        }
    }

    return (
        <>
            <Navbar bg="light" variant="light" className="logo-container">
                <Navbar.Brand href="/">
                    <img src={Logo} alt="Logo" height="50" width="75" className="logo" />
                    ExchangExpress
                </Navbar.Brand>
            </Navbar>
            <Container className="mt-5 register-container">
                <Form className="register-form">
                    <h1 className="register-title">Register</h1>
                    <Form.Group controlId="username" className="username-group">
                        <Form.Control type="text" placeholder="Username" onChange={handleChange} name="username" required className="username-input" />
                    </Form.Group>
                    <Form.Group controlId="email" className="email-group">
                        <Form.Control type="email" placeholder="Email" onChange={handleChange} name="email" required className="email-input" />
                    </Form.Group>
                    <Form.Group controlId="password" className="password-group">
                        <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password" required className="password-input" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleClick} className="register-button">Register</Button>
                    <div className="mt-3 login-link">
                        Already a member?
                        <Link to="/login">Login Here</Link>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default Register;
