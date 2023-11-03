const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  products: {
    type: [String], // An array of strings for product names
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;