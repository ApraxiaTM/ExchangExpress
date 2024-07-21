import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import EmptyStateImage from '../../images/nouser.jpg';
import Profile from '../../images/profileIcon.png';
import "../../styles/receiver/Receivers.css";

const Receivers = () => {
    const [receivers, setReceivers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const username = useMemo(() => {
        return {
            username: localStorage.getItem('username')
        };
    }, []);

    useEffect(() => {
        const fetchReceivers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/bank_accounts/receivers", { params: username });
                setReceivers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchReceivers();
    }, [username]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/users_accounts/${id}`); //Golang
            await axios.delete(`http://localhost:3001/bank_accounts/${id}`); //Golang
            // await axios.delete("http://localhost:3001/users_accounts/" + id); //Nodejs
            // await axios.delete("http://localhost:3001/bank_accounts/" + id); //Nodejs
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    // const filteredReceivers = receivers.filter(receiver =>
    //     (receiver.bankname && receiver.bankname.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (receiver.currency && receiver.currency.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (receiver.holder && receiver.holder.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (receiver.country && receiver.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
    //     (receiver.transfer_code && receiver.transfer_code.toLowerCase().includes(searchQuery.toLowerCase()))
    // );

    const filteredReceivers = receivers ? receivers.filter(receiver =>
        (receiver.bankname && receiver.bankname.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (receiver.currency && receiver.currency.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (receiver.holder && receiver.holder.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (receiver.country && receiver.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (receiver.transfer_code && receiver.transfer_code.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : [];
    
    const sortedReceivers = React.useMemo(() => {
        let sortableReceivers = [...filteredReceivers];
        if (sortConfig.key) {
            sortableReceivers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableReceivers;
    }, [filteredReceivers, sortConfig]);

    const requestSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

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

            <main className="receivers-main">
                <input
                    type="text"
                    placeholder="Search receivers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
                {sortedReceivers.length === 0 ? (
                    <div className="empty-state">
                        <img src={EmptyStateImage} alt="Empty state" className="empty-state-image" />
                        <h2>IT'S QUIET IN HERE</h2>
                        <p>Start adding people so you're ready to send money.</p>
                    </div>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>
                                        Bank Name
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                Sort
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => requestSort('bankname', 'asc')}>Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => requestSort('bankname', 'desc')}>Descending</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </th>
                                    <th>
                                        Currency
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                Sort
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => requestSort('currency', 'asc')}>Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => requestSort('currency', 'desc')}>Descending</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </th>
                                    <th>
                                        Holder
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                Sort
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => requestSort('holder', 'asc')}>Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => requestSort('holder', 'desc')}>Descending</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </th>
                                    <th>
                                        Country
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                Sort
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => requestSort('country', 'asc')}>Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => requestSort('country', 'desc')}>Descending</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </th>
                                    <th>
                                        Transfer Code
                                        <Dropdown className="d-inline mx-2">
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                Sort
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => requestSort('transfer_code', 'asc')}>Ascending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => requestSort('transfer_code', 'desc')}>Descending</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedReceivers.map((receiver, index) => (
                                    <tr key={receiver.id}>
                                        <td>{index + 1}</td>
                                        <td>{receiver.bankname}</td>
                                        <td>{receiver.currency}</td>
                                        <td>{receiver.holder}</td>
                                        <td>{receiver.country}</td>
                                        <td>{receiver.transfer_code}</td>
                                        <td><button onClick={() => handleDelete(receiver.id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                <div className="button-container">
                    <Link to="/dashboard">
                        <button id="dashboard-button" className="green-button">Back to Dashboard</button>
                    </Link>
                    <Link to="/AddReceiver">
                        <button className="add-recipient-button">Add recipient</button>
                    </Link>
                </div>
            </main>
        </>
    );
}

export default Receivers;
