import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { default as React, useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import Profile from '../images/profileIcon.png';
import '../styles/NewsMember.css'; // Import the CSS file

const NewsMember = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything`, {
            params: {
                q: 'national currency',
                apiKey: '05ddaf856a654326ada62154793ea282',
                sortBy: 'publishedAt',
                language: 'en',
            },
            });
            setArticles(response.data.articles);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
        };

        fetchNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

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
            <div className="container mt-4">
                <h1 className="mb-4">News on Currency and Money</h1>
                <div className="row">
                {articles.map((article, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100">
                        {article.urlToImage && (
                        <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                        )}
                        <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Read more
                        </a>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
};

export default NewsMember;
