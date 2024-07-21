// app.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const usersRoutes = require('./routes/userRoutes');
const bankAccountRoutes = require('./routes/bankAccountRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const transactionsRoutes = require('./routes/transactionRoutes');
const usersAccountRoutes = require('./routes/userAccountRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use('/users', usersRoutes);
app.use('/bank_accounts', bankAccountRoutes);
app.use('/currency', currencyRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/users_accounts', usersAccountRoutes);

// http://localhost:3001/bank_accounts

// const API_KEY = '2e7842fee5c1d0cdd88b38f7';

// app.get('/api/exchange-rate/:currency', async (req, res) => {
//     const currency = req.params.currency;
//     try {
//         const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).send('Error fetching exchange rate');
//     }
// });

// app.get('/api/regions', (req, res) => {
//     const regions = {
//         Asia: ['Japan', 'China', 'India', 'Malaysia', 'Hong Kong', 'Singapore', 'South Korea', 'Thailand', 'Vietnam', 'Taiwan'],
//         Europe: ['Germany', 'France', 'United Kingdom', 'Sweden', 'Switzerland', 'Portugal', 'Poland', 'Monaco', 'Italy', 'Ireland'],
//         Africa: ['Nigeria', 'Egypt', 'Morocco', 'Sudan', 'Kenya', 'Ethiopia', 'Uganda'],
//         Oceania: ['Australia', 'New Zealand'],
//         America: ['United States', 'Canada', 'Brazil'],
//     };
//     res.json(regions);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
