import axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Form, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../images/logo.png";
import "../../styles/login/Login.css";

const Login = () => {
    // const [showPassword, setShowPassword] = useState(false);

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleClick = async e => {
        e.preventDefault()
        try {
            // await axios.post("http://localhost:3001/users/login", user);
            await axios.post("http://localhost:3001/users/login", user);
            localStorage.setItem('username', user.username);
            navigate("/dashboard");
        } catch (err) {
            console.log(err)
        }
    }

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    console.log(user)
    return (
        <>
            <Navbar bg="light" variant="light" className="logo-container">
                <Navbar.Brand href="/">
                    <img src={Logo} alt="Logo" className="logo" />
                    ExchangExpress
                </Navbar.Brand>
            </Navbar>
            <Container className="mt-5 login-container">
                <Form className="login-form">
                    <h1 className="login-title">Login</h1>
                    <Form.Group controlId="username" className="username-group">
                        <Form.Control type="text" placeholder="Username" onChange={handleChange} name="username" required className="username-input" />
                    </Form.Group>
                    <Form.Group controlId="password" className="password-group">
                        <Form.Control type="password" placeholder="Password" onChange={handleChange} name="password" required className="password-input" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleClick} className="login-button">Login</Button>
                    <div className="mt-3 register-link">
                        Not a member?
                        <Link to={"/register"}>Register Here</Link>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default Login;