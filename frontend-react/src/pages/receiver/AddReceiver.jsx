import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Logo from '../../images/logo.png';
import Profile from '../../images/profileIcon.png';
import "../../styles/receiver/AddReceiver.css";

const AddReceiver = () => {
    const [bank, setBank] = useState({
        bankname: "",
        currency: "",
        holder: "",
        country: "",
        transfer_code: ""
    });
    const [userAccount, setUserAccount] = useState({
        user_id: parseInt(""),
        bank_id: parseInt(""),
        status: "receiver"
    });

    const user = useMemo(() => {
        return {
            username: localStorage.getItem('username')
        };
    }, []);
    const bankacc = useMemo(() => {
        return {
            transfer_code: bank.transfer_code
        };
    }, [bank.transfer_code]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBank((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleCurrencyChange = (selectedOption) => {
        setBank((prev) => ({ ...prev, currency: selectedOption.value }));
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users', { params: user });
                console.log(response.data);
                // setUserAccount((prev) => ({ ...prev, user_id: response.data[0].id })); // Nodejs
                setUserAccount((prev) => ({ ...prev, user_id: response.data.id })); // Golang
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchUser();
    }, [user]);

    const currencyOptions = [
        { value: 'USD', label: 'USD - United States Dollar', flag: 'https://flagcdn.com/us.svg' },
        { value: 'EUR', label: 'EUR - Euro', flag: 'https://flagcdn.com/eu.svg' },
        { value: 'JPY', label: 'JPY - Japanese Yen', flag: 'https://flagcdn.com/jp.svg' },
        { value: 'GBP', label: 'GBP - Great Britain Pounds', flag: 'https://flagcdn.com/gb.svg' },
        { value: 'AUD', label: 'AUD - Australian Dollars', flag: 'https://flagcdn.com/au.svg' },
        { value: 'IDR', label: 'IDR - Indonesian Rupiah', flag: 'https://flagcdn.com/id.svg' },
        { value: 'SGD', label: 'SGD - Singapore Dollar', flag: 'https://flagcdn.com/sg.svg' },
        { value: 'KRW', label: 'KRW - South Korean Won', flag: 'https://flagcdn.com/kr.svg' },
        { value: 'MYR', label: 'MYR - Malaysian Ringgit', flag: 'https://flagcdn.com/my.svg' },
        { value: 'CNY', label: 'CNY - Chinese Yuan', flag: 'https://flagcdn.com/cn.svg' }
    ];

    const handleClick = async e => {
        e.preventDefault();
        try {
            // First, create the bank account
            await axios.post("http://localhost:3001/bank_accounts", bank)

            const banking = await axios.get("http://localhost:3001/bank_accounts", { params: bankacc });
            // console.log(banking.data[0].id); //Nodejs
            console.log(banking.data.id); //Golang
            // const updatedBank = {...userAccount, bank_id: banking.data[0].id}; //Nodejs
            const updatedBank = {...userAccount, bank_id: banking.data.id}; // Golang
            await setUserAccount((updatedBank));

            await console.log('User account data before POST:', updatedBank);
            
            await axios.post("http://localhost:3001/users_accounts", updatedBank);

            navigate("/receivers");
        } catch (err) {
            console.log(err);
        }
    }


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
            <main>
                <Container>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="bankname">Bank Name:</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" id="bankname" placeholder="The Bank Name" onChange={handleChange} name="bankname"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="country">Country:</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" id="country" placeholder="The Country" onChange={handleChange} name="country"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="currency">Currency:</Form.Label>
                            <Col sm="10">
                                <Select
                                    id="currency"
                                    name="currency"
                                    options={currencyOptions}
                                    formatOptionLabel={({ label, flag }) => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={flag} alt="" style={{ width: 20, marginRight: 10 }} />
                                            <span>{label}</span>
                                        </div>
                                    )}
                                    onChange={handleCurrencyChange}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="holder">Receiver Holder:</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" id="holder" placeholder="The Holder" onChange={handleChange} name="holder"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2" htmlFor="transfer_code">Transfer Code:</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" id="transfer_code" placeholder="The Transfer Code" onChange={handleChange} name="transfer_code"/>
                            </Col>
                        </Form.Group>

                        <Row>
                            <Col sm="12" className="text-center">
                                <Button variant="secondary" href="/Receivers" id="cancel-button">Cancel</Button>
                                <Button variant="primary" onClick={handleClick} id="submit-button">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </main>
        </>
    );
};

export default AddReceiver;