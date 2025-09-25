// ---------------- Create otp ---------
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ---------------- create otp expair function ---------
const getExpiryTime = () => new Date(Date.now() + 3 * 60 * 1000);

module.exports= {generateOTP , getExpiryTime}