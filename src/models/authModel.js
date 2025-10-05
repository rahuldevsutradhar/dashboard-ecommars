const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avater: {
    type: String,
    default: null
  },
  otp: {
    type: Number,
    default: null
  },
  otpExpaireTime: {
    type: Date,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    enum: ['user', 'admin', 'staff'],
    default: 'user' // ← এখানে 'required' না, 'default' হবে
  }
});

module.exports = mongoose.models.auth || mongoose.model('auth', authSchema);
