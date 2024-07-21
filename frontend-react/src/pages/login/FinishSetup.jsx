import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Logo from '../../images/logo.png';
import "../../styles/login/FinishSetup.css";

const FinishSetup = () => {
    const [bank, setBank] = useState({
        bankname: "",
        currency: "",
        holder: "",
        country: "",
        transfer_code: ""
    });
    // const [wallet, setWallet] = useState({
    //     bankname: "wallet",
    //     currency: "IDR",
    //     holder: "Wallet",
    //     country: "Indonesia",
    //     transfer_code: ""
    // });
    const [userAccount, setUserAccount] = useState({
        user_id: parseInt(""),
        bank_id: parseInt(""),
        status: "sender"
    });
    // const [userAccountWallet, setWalletAccount] = useState({
    //     user_id: parseInt(""),
    //     bank_id: parseInt(""),
    //     status: "receiver"
    // });

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

    // const bankwallet = useMemo(() => {
    //     return {
    //         holder: wallet.holder
    //     };
    // }, [wallet.holder]);
    
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users', { params: user });
                console.log(response.data);
                // setUserAccount((prev) => ({ ...prev, user_id: response.data[0].id })); // Nodejs
                setUserAccount((prev) => ({ ...prev, user_id: response.data.id })); // Golang
                // setWalletAccount((prev) => ({ ...prev, user_id: response.data[0].id }));
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchUser();
    }, [user]);
    
    const handleChange = (e) => {
        setBank((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleCurrencyChange = (selectedOption) => {
        setBank((prev) => ({ ...prev, currency: selectedOption.value }));
    }

    const handleClick = async e => {
        e.preventDefault();
        try {
            // First, create the bank account
            await axios.post("http://localhost:3001/bank_accounts", bank)
            // await axios.post("http://localhost:3001/bank_accounts", wallet)

            const banking = await axios.get("http://localhost:3001/bank_accounts", { params: bankacc });
            // console.log(banking.data[0].id);
            // const updatedBank = {...userAccount, bank_id: banking.data[0].id}; // Nodejs
            const updatedBank = {...userAccount, bank_id: banking.data.id}; // Golang
            await setUserAccount((updatedBank));

            // const getwallet = await axios.get("http://localhost:3001/bank_accounts/wallet", { params: bankwallet });
            // console.log(getwallet.data[0].id);
            // const updatedWallet = {...userAccountWallet, bank_id: getwallet.data[0].id};
            // await setUserAccount((updatedWallet));
            
            await console.log('User account data before POST:', updatedBank);
            
            await axios.post("http://localhost:3001/users_accounts", updatedBank);
            // await axios.post("http://localhost:3001/users_accounts", updatedWallet);

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand" to={"/"}>
                    <img src={Logo} alt="Logo" height="50" width="75" />
                    ExchangExpress
                </Link>
            </nav>
            <main className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="bankname">Bank Name:</label>
                        <input type="text" className="form-control" id="bankname" name="bankname" onChange={handleChange} placeholder="Your Bank Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="holder">Card Holder:</label>
                        <input type="text" className="form-control" id="holder" name="holder" onChange={handleChange} placeholder="Your Name" />
                    </div>
                    <div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <input type="text" className="form-control" id="country" name="country" onChange={handleChange} placeholder="Your Country" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="transfer_code">Transfer Code:</label>
                        <input type="text" className="form-control" id="transfer_code" name="transfer_code" onChange={handleChange} placeholder="Your Transfer Code" />
                    </div>
                    <button type="button" className="btn btn-primary mt-3" id="submit-button" onClick={handleClick}>Submit</button>
                </form>
            </main>
        </>
    );
};

export default FinishSetup;
