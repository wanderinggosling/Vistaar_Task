const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
  username: String,
  name: String,
  address: String,
  birthdate: Date,
  email: String,
  active: Boolean,
  accounts: [
     Number,
  ],
  tier_and_details: {
    tier: String,
    benefits: [String],
    active: Boolean,
    id: String,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
