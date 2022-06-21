const express = require('express');
const router = express.Router();
const controller = require('../controllers/poll.controller.js');

router
    .route('/create')
    .get((req, res) => {
        res.send('Create Poll page');
    })
    //.post(controller.register);

router
    .route('/vote')
    .get((req, res) => {
        res.send('Vote page');
    })
    //.post(controller.signin);
router
    .route('/pollId/:pollId')
    .get((req, res) => {
        res.send('Get Poll page');
    })
router
    .route('delete/:pollId')
    .get((req, res) => {
        res.send('Delete Poll page');
    })

module.exports = router;