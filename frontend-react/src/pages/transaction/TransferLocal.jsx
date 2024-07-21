import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/logo.png';
import Profile from '../../images/profileIcon.png';
import "../../styles/transaction/TransferLocal.css";

const TransferLocal = () => {
    const userStorage = String(localStorage.getItem('username'));
    const [transactions, setTransactions] = useState({
        username: userStorage,
        receiver: "",
        currency: "",
        // amount: parseInt(""),
        amount: 0.0,
        admin_fee: 2500
    });
    const [receivers, setReceivers] = useState([]);
    const [currencyReceiver, setCurrencyReceiver] = useState({});
    const [selectedReceiver, setSelectedReceiver] = useState("");

    const username = useMemo(() => {
        return {
            username: localStorage.getItem('username')
        };
    }, []);

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchReceivers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/bank_accounts/receiverslocal", { params: username });
                setReceivers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchReceivers();
    }, [username]);

    // const handleChange = (event) => {
    //     setTransactions((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    // };
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'amount') {
            setTransactions((prev) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setTransactions((prev) => ({ ...prev, [name]: value }));
        }
    };
    

    const handleReceiverChange = (event) => {
        const selectedReceiverHolder = event.target.value;
        setSelectedReceiver(selectedReceiverHolder);

        const selectedReceiver = receivers.find(receiver => receiver.holder === selectedReceiverHolder);
        if (selectedReceiver) {
            setCurrencyReceiver(selectedReceiver.currency);
            setTransactions((prev) => ({ ...prev, currency: selectedReceiver.currency }));
        }
    };

    const handleReceiverSelect = (event) => {
        handleReceiverChange(event);
        handleChange(event);
    };

    const handleClick = async event => {
        event.preventDefault();
        try {
            const updatedTransactions = {...transactions};
            // await axios.put("http://localhost:3001/bank_accounts", querybank)
            console.log(updatedTransactions);
            await axios.post("http://localhost:3001/transactions", updatedTransactions)
            navigate("/successful");
        } catch (err) {
            console.log(err);
        }
    }

    // const currencyOptions = [
    //     { value: 'USD', label: 'USD - United States Dollar', flag: 'https://flagcdn.com/us.svg' },
    //     { value: 'EUR', label: 'EUR - Euro', flag: 'https://flagcdn.com/eu.svg' },
    //     { value: 'JPY', label: 'JPY - Japanese Yen', flag: 'https://flagcdn.com/jp.svg' },
    //     { value: 'GBP', label: 'GBP - Great Britain Pounds', flag: 'https://flagcdn.com/gb.svg' },
    //     { value: 'AUD', label: 'AUD - Australian Dollars', flag: 'https://flagcdn.com/au.svg' },
    //     { value: 'IDR', label: 'IDR - Indonesian Rupiah', flag: 'https://flagcdn.com/id.svg' },
    //     { value: 'SGD', label: 'SGD - Singapore Dollar', flag: 'https://flagcdn.com/sg.svg' },
    //     { value: 'KRW', label: 'KRW - South Korean Won', flag: 'https://flagcdn.com/kr.svg' },
    //     { value: 'MYR', label: 'MYR - Malaysian Ringgit', flag: 'https://flagcdn.com/my.svg' },
    //     { value: 'CNY', label: 'CNY - Chinese Yuan', flag: 'https://flagcdn.com/cn.svg' }
    // ];

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
                            <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Form>
            <h1 className="ml-auto">Transfer to Local Bank</h1>
            <Form.Group controlId="receiver">
                <Form.Label>Receiver:</Form.Label>
                <Form.Control as="select" name="receiver" onChange={handleReceiverSelect}>
                    <option>Place your Recipient</option>
                {receivers.map((receiver) => (
                    <option key={receiver.holder} value={receiver.holder}>{receiver.holder}</option>
                ))}
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="currency">
                <Form.Label>Currency:</Form.Label>
                <Form.Control name="currency" type="text" value={String(currencyReceiver)} placeholder='Currency Automatically Change Based on Receiver' readOnly />
            </Form.Group>

            <Form.Group controlId="amount">
                <Form.Label>Amount:</Form.Label>
                <Form.Control type="number" name="amount" onChange={handleChange} placeholder='Amount of Money' />
            </Form.Group>

            <Form.Group controlId="admin_fee">
                <Form.Label>Admin Fee:</Form.Label>
                <Form.Control type="text" name="admin_fee" defaultValue="Rp. 2500" readOnly onChange={handleChange} />
            </Form.Group>

            {/* <Form.Group controlId="total">
                <Form.Label>Total:</Form.Label>
                <Form.Control type="number" readOnly />
            </Form.Group> */}

            <Row>
                <Col>
                    <Link to="/dashboard"><Button variant="secondary" type="button">Cancel</Button></Link>
                </Col>
                <Col>
                    <Link to="/dashboard"><Button variant="primary" type="button" onClick={handleClick}>Pay</Button></Link>
                </Col>
            </Row>
        </Form>
        </>
        );
}
export default TransferLocal;
