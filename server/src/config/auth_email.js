
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;


dotenv.config({path: '../../.env'});

// Email client info
const USER = process.env.EMAIL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = process.env.REDIRECT_URI;
const API = 'http://localhost:5001/api/user/confirm';

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        type: 'OAuth2',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
    }
});
 

module.exports.testMail = async (req, res) => {
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err){
                reject('Failed to create access token')
            }
            resolve(token);
        })
    });
    
    transporter.sendMail({ 
        from: USER,
        to: 'kadewebsolutions.auth@gmail.com',
        subject: 'Please confirm your EasyPolls account.',
        html: `
            <div>
                <h1>Easy Polls Email Confirmation</h1>
                <h2>Hello</h2>
                <p>Thank you for creating an account with Easy Polls! Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:5001/api/confirm/> Click here</a>
            </div>
        `,
        auth: {
            user: USER,
            accessToken
        }
    }).then(response => {
        return res.status(201).json({success: true, response: response});
    }).catch(e => {
        return res.status(201).json({success: false, error: e});
    })
    
    transporter.verify().then(response => console.log('Verified: ' + response)).catch(console.error());

}

module.exports.sendConfirmationEmail = async (name, email, confirmationCode) => {
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err){
                reject('Failed to create access token')
            }
            resolve(token);
        })
    });

    transporter.sendMail({
      from: USER,
      to: email,
      subject: "Please confirm your Easy Polls account",
      html: `
        <div style="background-color: red">
            <h1>Easy Polls Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for creating an account with Easy Polls! Please confirm your email by clicking on the following link</p>
            <a href=${API}/${confirmationCode}>Confirm Account</a>
        </div>`,
        auth: {
            user: USER,
            accessToken
        }
    }).then(response => {
        console.log(response);
        return response.status(201).json({success: true, response: response})
    }).catch(err => {
        console.log(err);
        return response.status(201).json({success: false, errors: err})
    });
  };