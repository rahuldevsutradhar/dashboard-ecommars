
const mongoose = require('mongoose');

const dbconnection = () => {
    mongoose.connect(
        process.env.dbLink
    )
    .then(() => {
        console.log('✅ DB connected');
       
        
    })
    .catch((err) => {
        console.error('❌ DB connection error:', err);
    });
};

module.exports = dbconnection;
