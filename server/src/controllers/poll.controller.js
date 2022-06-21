const Poll = require('../models/Poll');

// @route Post api/poll/create
// @desc Create poll
// @params sessionToken, userId, item (title, votes), pollLength,createdBy
// @access Public
exports.createPoll = async (req, res, next) => {
    const {sessionToken, userId, item, pollLength, createdBy} = req.body;
}


// @route Post api/poll/vote
// @desc Cast vote for a poll
// @params pollId, index, userId, ipAddress
// @access Public
exports.vote = async (req, res, next) => {
    const {pollId, index, userId, ipAddress} = req.body;
}

// @route Get api/poll/pollId/:pollId
// @desc Get poll by id
// @params pollId
// @access Public
exports.getPoll = async (req, res, next) => {
    const {pollId} = req.params;
}

// @route Delete api/poll/delete/:pollId
// @desc Sign in user
// @params pollId, userId, sessionToken
// @access Public
exports.deletePoll = async (req, res, next) => {
    const {pollId} = req.params;
}