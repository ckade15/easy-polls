
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({path: '../../.env'});


const user = process.env.EMAIL;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your Easy Polls account",
      html: `
        <div>
            <h1>Easy Polls Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for creating an account with Easy Polls! Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:5001/api/confirm/${confirmationCode}> Click here</a>
        </div>`,
    }).catch(err => console.log(err));
  };