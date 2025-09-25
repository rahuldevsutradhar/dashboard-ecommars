const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "rahuldevsutradhar7@gmail.com",
        pass: "cqhd vuea uoju dlyg",
    },
});

// ---------------- gmail genarator -----------------


const otpGenarator = async (email , templat) => {
                const info = await transporter.sendMail({
                    from: "Chithi",
                    to: email,
                    subject: "Registration verification",
                    text: "Hello world?", // plain‑text body
                    html: templat
                            
                })

                console.log("Message sent:", info.messageId);
            }


module.exports = otpGenarator