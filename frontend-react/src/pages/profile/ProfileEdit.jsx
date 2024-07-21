import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Logo from '../../images/logo.png';
import ProfileIcon from '../../images/profileIcon.png';
import '../../styles/profile/Profile.css';

const Profile = () => {
    const userStorage = String(localStorage.getItem('username'));
    const [bank, setBank] = useState([])
    const [user, setUser] = useState([])
    
    const [querybank, setQueryBank] = useState({
        username: userStorage,
        bankname: "",
        currency: "",
        holder: "",
        country: "",
        transfer_code: ""
    });
    const [queryuser, setQueryUser] = useState({
        old_username: userStorage,
        username: "",
        email: "",
    });

    const username = useMemo(() => {
        return {
            username: localStorage.getItem('username')
        };
    }, []);

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchBank = async ()=>{
            try{
                const res = await axios.get("http://localhost:3001/users", { params: username })
                // console.log(res.data[0])
                // setUser(res.data[0]) // Nodejs
                setUser(res.data) // Golang
            } catch (err) {
                console.log(err)
            }
        }
        fetchBank()
    }, [username])

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const res = await axios.get("http://localhost:3001/bank_accounts/personal", { params: username })
                // console.log(res.data[0])
                setBank(res.data[0])
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [username])

    const handleChange = (e) => {
        setQueryBank((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleUserChange = (e) => {
        setQueryUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleCurrencyChange = (selectedOption) => {
        setQueryBank((prev) => ({ ...prev, currency: selectedOption.value }));
    }

    const currencyOptions = [
        // { value: 'USD', label: 'USD - United States Dollar', flag: 'https://flagcdn.com/us.svg' },
        // { value: 'EUR', label: 'EUR - Euro', flag: 'https://flagcdn.com/eu.svg' },
        // { value: 'JPY', label: 'JPY - Japanese Yen', flag: 'https://flagcdn.com/jp.svg' },
        // { value: 'GBP', label: 'GBP - Great Britain Pounds', flag: 'https://flagcdn.com/gb.svg' },
        // { value: 'AUD', label: 'AUD - Australian Dollars', flag: 'https://flagcdn.com/au.svg' },
        { value: 'IDR', label: 'IDR - Indonesian Rupiah', flag: 'https://flagcdn.com/id.svg' },
        // { value: 'SGD', label: 'SGD - Singapore Dollar', flag: 'https://flagcdn.com/sg.svg' },
        // { value: 'KRW', label: 'KRW - South Korean Won', flag: 'https://flagcdn.com/kr.svg' },
        // { value: 'MYR', label: 'MYR - Malaysian Ringgit', flag: 'https://flagcdn.com/my.svg' },
        // { value: 'CNY', label: 'CNY - Chinese Yuan', flag: 'https://flagcdn.com/cn.svg' }
    ];

    const handleClick = async e => {
        e.preventDefault();
        try {
            // First, create the bank account
            // setQueryBank((prev) => ({ ...prev, busername: userStorage }));
            // setQueryUser((prev) => ({ ...prev, old_username: userStorage }));
            console.log(querybank)
            console.log(queryuser)
            await axios.put("http://localhost:3001/bank_accounts", querybank)
            await axios.put("http://localhost:3001/users", queryuser)
            navigate("/profile");
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
                        <NavDropdown className="nav-dropdown-right" title={<img src={ProfileIcon} alt="Profile" height="30" width="30" />} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/newsmember">News</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <main>
                <div className="profile-container">
                    <h2>Personal information</h2>
                    <div className="profile-section">
                        <div>
                            {/* <input type="hidden" className="form-control" id="old_username" name="old_username" onChange={handleUserChange} value={userStorage} /> */}
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control" id="username" name="username" onChange={handleUserChange} placeholder={user.username} />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleUserChange} placeholder={user.email} />
                        </div>
                    </div>

                    <h2>Personal Bank</h2>
                    <div className="profile-section">
                        <div>
                            {/* <input type="hidden" className="form-control" id="busername" name="busername" onChange={handleChange} value={userStorage} /> */}
                            <label htmlFor="bankname">Bank Name:</label>
                            <input type="text" className="form-control" id="bankname" name="bankname" onChange={handleChange} placeholder={bank.bankname} />
                        </div>
                        <div>
                            <label htmlFor="holder">Card Holder:</label>
                            <input type="text" className="form-control" id="holder" name="holder" onChange={handleChange} placeholder={bank.holder} />
                        </div>
                        <div>
                            <label htmlFor="currency">Currency:</label>
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
                        </div>
                        <div>
                            <label htmlFor="country">Country:</label>
                            <input type="text" className="form-control" id="country" name="country" onChange={handleChange} placeholder={bank.country} />
                        </div>
                        <div>
                            <label htmlFor="transfer_code">Transfer Code:</label>
                            <input type="text" className="form-control" id="transfer_code" name="transfer_code" onChange={handleChange} placeholder={bank.transfer_code} />
                        </div>
                    </div>

                    <div className="edit-button-container">
                        <Link to="/profile">
                            <button>Cancel</button>
                        </Link>
                        <button onClick={handleClick}>Edit details</button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;
