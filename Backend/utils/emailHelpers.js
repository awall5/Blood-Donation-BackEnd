const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

(async () => {
    try {
        await transporter.verify();
        console.log("-------- ✅ MAIL Server is ready! -----------");
    } catch (err) {
        console.log("-------- ❌ MAIL Server Error! -----------");
        console.log(err.message);
    }
})();

const sendOtpMail = async (email, otp) => {
    console.log("--> inside sendOtpMail", email, otp);
    try {
        await transporter.sendMail({
            from: '"Blood Donation Team 🩸" <team@blooddonation.com>', // updated name
            to: email,
            subject: "Your OTP for Blood Donation Platform",
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                background: #f9f9f9;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 500px;
                                margin: 50px auto;
                                background: #fff;
                                border-radius: 10px;
                                padding: 30px;
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                                text-align: center;
                            }
                            .header {
                                font-size: 22px;
                                color: #e3342f;
                                margin-bottom: 20px;
                                font-weight: bold;
                            }
                            .otp-box {
                                display: inline-block;
                                padding: 10px 20px;
                                font-size: 24px;
                                font-weight: bold;
                                color: #fff;
                                background-color: #e3342f;
                                border-radius: 8px;
                                margin: 20px 0;
                            }
                            .footer {
                                font-size: 12px;
                                color: #999;
                                margin-top: 30px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">Your OTP for Blood Donation Platform</div>
                            <p>Please use the following OTP to verify your email:</p>
                            <div class="otp-box">${otp}</div>
                            <p>This OTP is valid for the next few minutes. Do not share it with anyone.</p>
                            <div class="footer">Thank you for supporting blood donation! ❤️</div>
                        </div>
                    </body>
                </html>
            `,
        });
        console.log("---> ✅ Email sent!");
    } catch (err) {
        console.log("------------ 🔴 Could not send email", err.message);
        throw "Error in sending Email!";
    }
};

module.exports = { sendOtpMail };
