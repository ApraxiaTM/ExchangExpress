import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import '../styles/News.css'; // Import the CSS file

const News = () => {
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
            <header>
                <Link to={"/"}>
                    <div className="logo-container">
                        <img src={Logo} alt="Logo" height="50" width="50" />
                        <span>ExchangExpress</span>
                    </div>
                </Link>

                <div className="RNLButton">
                    <button className="Newsbutton"><Link to={"/News"}>News</Link></button>
                    <button className="Registerbutton"><Link to={"/register"}>Signup</Link></button>
                    <button className="Loginbutton"><Link to={"/login"}>Login</Link></button>
                </div>
            </header>
        </>
    );
};

export default News;
