const express = require('express');
const router = express.Router();
const controller = require('../controllers/poll.controller.js');

router
    .route('/create')
    .get((req, res) => {
        res.send('Create Poll page');
    })
    .post(controller.createPoll);

router
    .route('/vote')
    .get((req, res) => {
        res.send('Vote page');
    })
    .post(controller.vote);
router
    .route('/pollId/:pollId')
    .get(controller.getPoll)

router
    .route('/delete/:pollId')
    .get((req, res) => {
        res.send('Delete Poll page');
    })
    .delete(controller.deletePoll);
router
    .route('/close/:pollId')
    .post(controller.closePoll)
router
    .route('/current')
    .get(controller.getCurrentPolls)
router
    .route('/get/:userId')
    .get(controller.getProfilePolls)

module.exports = router;