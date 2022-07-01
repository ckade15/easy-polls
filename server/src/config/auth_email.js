
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

dotenv.config({path: '../../.env'});


const user = process.env.EMAIL;
const pass = process.env.APP_PASS;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});



const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )
    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err){
                reject('Failed to create access token')
            }
            resolve(token);
        })
    })
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: "Gmail",
        auth: {
        type: 'OAuth2',
        user: user,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
        expires: 1484314697598
      },
    });
    return transporter;
}



module.exports.testMail = async (req, res) => {
    const sendEmail = async (emailOptions) => {
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    }
    try{
        send({
            from: process.env.EMAIL,
        to: 'kadewebsolutions.auth@gmail.com',
        subject: 'Please confirm your EasyPolls account.',
        html: `
            <div>
                <h1>Easy Polls Email Confirmation</h1>
                <h2>Hello</h2>
                <p>Thank you for creating an account with Easy Polls! Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:5001/api/confirm/> Click here</a>
            </div>
        `
        }).then(response => res.status(201).json({data: response})).catch(e=> res.status(201).json({er: e}))
    }catch(e){
        res.status(201).json({error: e});
    }
    sendEmail({
        from: process.env.EMAIL,
        to: 'kadewebsolutions.auth@gmail.com',
        subject: 'Please confirm your EasyPolls account.',
        html: `
            <div>
                <h1>Easy Polls Email Confirmation</h1>
                <h2>Hello</h2>
                <p>Thank you for creating an account with Easy Polls! Please confirm your email by clicking on the following link</p>
                <a href=http://localhost:5001/api/confirm/> Click here</a>
            </div>
        `
    }).then(res=> res.status(201).json({
        success: true
    })).catch(err => res.status(201).json({
        error: err
    }));
}

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