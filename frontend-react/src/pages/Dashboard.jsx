import axios from 'axios';
// import 'flag-icon-css/sass/flag-icon.scss';
import { default as React, useEffect, useState } from 'react';
import { Carousel, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import Profile from '../images/profileIcon.png';
import "../styles/Dashboard.css";
import "../styles/MapComponent.css";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [exchangeRates, setExchangeRates] = useState([]);
    const [dates, setDates] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const currencies = ['IDR', 'CNY', 'USD', 'AUD', 'SGD', 'GBP', 'EUR', 'JPY'];
    const flags = {
        'IDR': 'id',
        'CNY': 'cn',
        'USD': 'us',
        'AUD': 'au',
        'SGD': 'sg',
        'GBP': 'gb',
        'EUR': 'eu',
        'JPY': 'jp'
    };

    const apiKey = 'cur_live_6lznZM2Q6Rs8tM2mm3kELv55SScXbudsiJ3jL9yc';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`https://api.currencyapi.com/v3/latest`, {
                params: {
                    apikey: apiKey,
                    currencies: currencies.join(',')
                }
            });

            const rates = currencies.map(currency => res.data.data[currency].value);
            const date = new Date().toISOString().split('T')[0];

            setExchangeRates(rates);
            setDates([date]); // Only one date since we're fetching latest rates
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const data = {
        labels: currencies,
        datasets: [
            {
                label: `Exchange Rates to IDR on ${dates[0]}`,
                data: exchangeRates,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            }
        ]
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % currencies.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currencies.length]);

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

            <Container className="container">
                <h1>Send money to 30+ countries with ExchangExpress</h1>
                <div>
                    <Bar data={data} />
                </div>
                <Carousel activeIndex={activeIndex} controls={false} indicators={false} className="mt-3">
                    {currencies.map((currency, index) => (
                        <Carousel.Item key={index}>
                            <div className="d-flex justify-content-center align-items-center">
                                <span className={`flag-icon flag-icon-${flags[currency.toLowerCase()]}`} style={{ fontSize: '2rem', marginRight: '10px' }}></span>
                                <h5>{currency}: {exchangeRates[index]} IDR</h5>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <h1 className="wanna-transfer text-center">
                    Wanna Transfer?
                </h1>

                <Row className="grid-container">
                    <Col as={Link} to="/receivers" className="grid-item">Receiver List</Col>
                    {/* <Col as={Link} to="/topUpWallet" className="grid-item">Top Up Wallet</Col> */}
                    <Col as={Link} to="/transactionHistory" className="grid-item">Transaction History</Col>
                </Row>
                <Row className="grid-container">
                    <Col as={Link} to="/transferLocal" className="grid-item">Transfer to Local Bank (Admin Fee +2.500)</Col>
                    <Col as={Link} to="/transferForeign" className="grid-item">Transfer to Foreign Bank (Admin Fee +10.000)</Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
