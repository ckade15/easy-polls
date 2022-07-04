const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemail = require('../config/auth_email');

// @route Post api/user/register
// @desc Register user
// @params email, firstName, lastName, email, password
// @access Private
exports.register = async (req, res, next) => {
    const errors = [];
    
    try{
        const token = jwt.sign({email: req.body.email}, process.env.SECRET);
        
        const {firstName, lastName, email } = req.body;
        const fullName = `${firstName} ${lastName}`;
        const password = bcrypt.hashSync(req.body.password, 10, function(err, hash){
            return hash;
        });

        const valid = () => {
            try {
                if (firstName.length === 0 || firstName === undefined || firstName === null){
                    errors.push('First name is required');
                }
            }catch{
                errors.push('First name is required');
            }
            try {
                if (lastName.length === 0 || lastName === undefined || lastName === null){
                    errors.push('Last name is required');
                }
                
            }catch{
                errors.push('Last name is required');
            }
            try {
                if (email.length === 0 || email === undefined || email === null){
                    errors.push('Email is required');
                }
            }catch{
                errors.push('Email is required');
            }
            try {
                if (req.body.password.length === 0 || req.body.password === undefined || req.body.password === null){
                    errors.push('Password is required');
                }
            }catch{
                errors.push('Password is required');
            }
            if (errors.length > 0) {
                return false;
            }
            return true;
        };
        

        if (User.countDocuments() === 0) {
            if (valid() === true) {

                const newUser = User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    confirmationCode: token
                });
                nodemail.sendConfirmationEmail(fullName, email, token);
                return res.status(201).json({
                    success: true,
                    data: "User created successfully, check your email for confirmation code" + newUser

                });
            }
        }else {
            if (valid() === true) {
                User.findOne({email: email}, (err, user) => {
                    if (err){
                        console.log(err.red);
                        return res.status(200).json({
                            success: false,
                            error: err
                        });
                    }
                    if (user) {
                        return res.status(200).json({
                            success: false,
                            error: ['Email already exists']
                        });
                    }else {
                        const newUser = User.create({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: password,
                            confirmationCode: token
                        });
                        const mail = nodemail.sendConfirmationEmail(fullName, email, token);
                        console.log(mail)
                        
                        return res.status(201).json({
                            success: true,
                            data: "User created successfully, check your email for confirmation code"
                        });
                    }
                });
            }else {
                return res.status(200).json({
                    success: false,
                    error: errors
                });
            }
        }

    }catch(err){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }
};


// @route Post api/user/signin
// @desc Sign in user
// @params email, password
// @access Public
exports.signin = async (req, res, next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const sessionToken = jwt.sign({email: email}, process.env.SECRET, {expiresIn: '24h'});
        const valid = () => {
            errors = [];
            try {
                if (email.length === 0 || email === undefined || email === null){
                    errors.push('Email is required');
                }
            }catch{
                errors.push('Email is required');
            }
            try {
                if (req.body.password.length === 0 || req.body.password === undefined || req.body.password === null){
                    errors.push('Password is required');
                }
            }catch{
                errors.push('Password is required');
            }
            if (errors.length > 0) {
                return false;
            }
            return true;
        };
        if (valid()) {
            
            User.findOne({email: email}, (err, user) => {
                if (err){
                    console.log(err.red);
                    return res.status(200).json({
                        success: false,
                        error: err
                    });
                }
                if (user) {
                    const matches = bcrypt.compareSync(password, user.password);
                    if (matches && !user.isConfirmed) {
                        return res.status(200).json({
                            success: false,
                            error: 'Please confirm your account through your email'
                        });
                    }
                    if (matches) {
                        user.sessionToken = sessionToken;
                        user.save();
                        return res.status(200).json({
                            success: true,
                            message: 'Signin successful',
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            sessionToken: sessionToken
                        });
                    }else{
                        return res.status(200).json({
                            success: false,
                            error: 'Invalid email or password'
                        });
                    }
                }
                if (!user){
                    return res.status(200).json({
                        success: false,
                        error: 'Invalid email or password'
                    });
                }
            });
        }
    }catch(err){
        console.log(err).red;
        return res.status(200).json({
            success: false,
            error: err
        });
    }
}


// @route Get api/user/confirm/:confirmationCode
// @desc Confirm user account
// @params confirmationCode
// @access Private
exports.confirm = async (req, res, next) => {
    const {confirmationCode} = req.params;
    const user = await User.findOne({confirmationCode: confirmationCode});
    if (user) {
        user.isConfirmed = true;
        await user.save();
        return res.status(200).send("<h1>Welcome, " + user.firstName+' '+user.lastName+' , your account has been confirmed<h1><a href="http://localhost:3000/login">Sign in</a>');
    }else{
        return res.status(200).json({
            success: false,
            message: 'No user found'
        });
    }
};


// @route Post api/user/checkToken
// @desc Checks if the session token is valid
// @params sessionToken
// @access Private
exports.checkToken = async (req, res, next) => {
    const sessionToken = req.body.sessionToken;
    const user = await User.findOne({sessionToken: sessionToken});
    if (user) {
        jwt.verify(sessionToken, user.sessionToken, (valid, err) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: 'Invalid session token'
                });
            }
            if (valid){
                return res.status(200).json({
                    success: true,
                    message: 'Valid session token',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    sessionToken: user.sessionToken,
                });
            }
        });

    }else{
        return res.status(200).json({
            success: false,
            message: 'Session token is invalid'
        });
    }
}

// @route Post api/user/update
// @desc Update user
// @params id,sessionToken, email, firstName, lastName, email, password 
// @access Private
exports.updateUser = async (req, res, next) => {
    let errors = [];
    try{
        const {id,firstName, lastName, email, password, sessionToken} = await req.body;
        console.log(firstName, lastName, email, password, sessionToken)
        const user = User.findOne({sessionToken: sessionToken});
        const result = User.findByIdAndUpdate(id, {
            
        })
        if (user){
            if (firstName != undefined){
                User.findByIdAndUpdate(id, {
                    firstName: firstName
                });
                User.save();
            }
            if (lastName != undefined){
                User.findByIdAndUpdate(id, {
                    lastName: lastName
                });
                User.save();
            }
            if (email != undefined){
                User.findByIdAndUpdate(id, {
                    email: email
                });
                User.save();
            }
            if (password != undefined){
                User.findByIdAndUpdate(id, {
                    password: password
                });
                
            }
        }else{
            return res.status.json({error: "User not found"});
        }
        return res.status(201).json({success: true})
    }catch(e){
        return res.status(201).json({success: false, error: "Invalid session token"});
    }
}