const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller.js');
const testMail = require('../config/auth_email')

router
    .route('/register')
    .get((req, res) => {
        res.send('Register page');
    })
    .post(controller.register);

// Added to debug auth issues with gmail
router
    .route('/testMail')
    .get(testMail.testMail)

router
    .route('/signin')
    .get((req, res) => {
        res.send('Signin page');
    })
    .post(controller.signin);
router
    .route('/confirm/:confirmationCode')
    .get(controller.confirm);
router
    .route('/checkToken')
    .post(controller.checkToken);
router
    .route('/updateUser/:id')
    .put(controller.updateUser)
router
    .route('/updatePassword/:id')
    .put(controller.updatePassword)


module.exports = router;