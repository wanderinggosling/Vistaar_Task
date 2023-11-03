const express = require('express')
const mongoose  =require('mongoose')
const cors =require('cors')

const Customer=require('./Model/Customer')
const Transaction= require('./Model/Transaction')
const Account = require('./Model/Account')


const app = express();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello");
})

//api for fetching customer details
app.get('/customers', async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //api for fetching transactions
  app.get('/transactions', async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //api for fetching transactions for the specified account id
  app.get('/transactions/:account_id', async (req, res) => {
    try {
      const account_id = req.params.account_id; // Get the account ID from the URL parameter
  
      // Fetch transactions for the specified account ID
      const transactions = await Transaction.find({ account_id: account_id });
  
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  //api for fetching accounts with transacation of less than Rs. 5000 
  app.get('/accounts-with-low-transactions', async (req, res) => {
    try {
      // Use the aggregate framework to unwind the transactions array, match transactions below 5000, and group by account_id
      const result = await Transaction.aggregate([
        {
          $unwind: "$transactions"
        },
        {
          $match: { "transactions.amount": { $lt: 5000 } }
        },
        {
          $group: {
            _id: "$account_id",
            transactionCount: { $sum: 1 }
          }
        },
        {
          $match: { transactionCount: { $gte: 1 } }
        },
        {
          $project: {
            _id: 1
          }
        }
      ]);
  
      // Extract the account IDs
      const accountIds = result.map((item) => item._id);
  
      res.json(accountIds);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //api to fetch distinct products
  app.get('/distinct-products', async (req, res) => {
    try {
      // Use Mongoose's distinct() method to find distinct product names
      const distinctProducts = await Account.distinct('products');
  
      res.json(distinctProducts);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


const PORT = process.env.PORT || 8000

const CONNECTION_URL = "mongodb://127.0.0.1:27017/Vistaar_Test"

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`server running on port ${PORT}`) }))
    .catch((err) => console.log(err.message));
