import React from 'react';
import { Link } from 'react-router-dom';
import Cashbag from '../images/cashbag.png';
import Logo from '../images/logo.png';
import '../styles/Home.css';

const Home = () => {
    return (
        <div>
            <div className="scrollable-content">
                <div className="text-container">
                    <h1>Welcome to ExchangExpress</h1>
                    <h2>The fastest place to exchange currencies</h2>
                </div>
                <img src={Cashbag} alt="Moneybag" />
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
        </div>
    );
}

export default Home;
