import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo.png';
import EmptyStateImage from '../../images/money.png';
import ProfileIcon from '../../images/profileIcon.png';
import "../../styles/transaction/TransactionHistory.css";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const username = useMemo(() => {
        return {
            username: localStorage.getItem('username')
        };
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:3001/transactions", { params: username });
                const sortedTransactions = res.data.sort((a, b) => new Date(b.timestamps) - new Date(a.timestamps));
                setTransactions(sortedTransactions);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTransactions();
    }, [username]);

    const filteredTransactions = transactions.filter(transaction =>
        (transaction.sender && transaction.sender.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.receiver && transaction.receiver.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.transfer_code && transaction.transfer_code.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.amount && transaction.amount.toString().includes(searchQuery))
    );

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/dashboard">
                    <img src={Logo} alt="Logo" height="30" width="30" />
                    ExchangExpress
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title={<img src={ProfileIcon} alt="Profile" height="30" width="30" />} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/newsmember">News</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <section className="transaction-history">
                <h2>Transactions</h2>
                <input
                    type="text"
                    placeholder="Search transactions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
                {filteredTransactions.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Amount</th>
                                <th>Rate</th>
                                <th>Timestamp</th>
                                <th>Transfer Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction, index) => (
                                <tr key={transaction.id}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.sender}</td>
                                    <td>{transaction.receiver}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.rate_conversion}</td>
                                    <td>{new Date(transaction.timestamps).toLocaleString()}</td>
                                    <td>{transaction.admin_fee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="empty-state">
                        <img src={EmptyStateImage} alt="No Transactions" className="empty-state-image" />
                        <p>You don't have any transactions.</p>
                    </div>
                )}
            </section>

            <div className="button-container">
                <Link to="/dashboard">
                    <button id="back-button" className="green-button">Back to Dashboard</button>
                </Link>
            </div>
        </>
    );
}

export default TransactionHistory;
