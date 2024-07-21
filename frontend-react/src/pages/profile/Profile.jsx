import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import ProfileIcon from '../../images/profileIcon.png';
import '../../styles/profile/Profile.css';

const Profile = () => {
    const [bank, setBank] = useState([])
    const [user, setUser] = useState([])

    const username = useMemo(() => {
        return {
            username: localStorage.getItem('username')
        };
    }, []);

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
                            <p>Username</p>
                            <p>{user.username}</p>
                        </div>
                        <div>
                            <p>Email</p>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <h2>Personal Bank</h2>
                    <div className="profile-section">
                        <div>
                            <p>Bank Name</p>
                            <p>{bank.bankname}</p>
                        </div>
                        <div>
                            <p>Card Holder</p>
                            <p>{bank.holder}</p>
                        </div>
                        <div>
                            <p>Currency</p>
                            <p>{bank.currency}</p>
                        </div>
                        <div>
                            <p>Country</p>
                            <p>{bank.country}</p>
                        </div>
                        <div>
                            <p>Transfer Code</p>
                            <p>{bank.transfer_code}</p>
                        </div>
                    </div>

                    <div className="edit-button-container">
                        <Link to="/dashboard">
                            <button>Back to Dashboard</button>
                        </Link>
                        <Link to="/ProfileEdit">
                            <button>Edit details</button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Profile;
