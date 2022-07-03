const Poll = require('../models/Poll');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @route Post api/poll/create
// @desc Create poll
// @params sessionToken, userId, item (title, votes), pollLength,createdBy
// @access Public
exports.createPoll = async (req, res, next) => {
    let errors = []
    const {sessionToken, userId, item, pollLength, createdBy} = req.body;
 
    try{
        if (sessionToken === undefined || sessionToken === null || sessionToken === ''){
            errors.push('Session token is required');
        }
        if (userId === undefined || userId === null || userId === ''){
            errors.push('User id is required');
        }
        if (item === undefined || item === null || item === ''){
            errors.push('List of items is required');
        }
        if (pollLength === undefined || pollLength === null || pollLength === ''){
            errors.push('Poll length is required');
        }
        if (createdBy === undefined || createdBy === null || createdBy === ''){
            errors.push('Poll creator is required');
        }

        if (errors){
            return res.status(200).json({
                success: false,
                error: errors
            });
        }

        const validUser = await User.findOne({_id: userId});
        if (validUser) {
            jwt.verify(sessionToken, validUser.sessionToken, (valid, err) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: 'Invalid session token'
                    });
                }
                if (valid){
                    const poll = new Poll({
                        userId: userId,
                        item: [{
                            title: item.title,
                            votes: 0
                        }],
                        pollLength: pollLength,
                        createdBy: createdBy
                    });
                    poll.save((err, poll) => {
                        if (err){
                            return res.status(200).json({
                                success: false,
                                error: err
                            });
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'Poll created successfully'
                        });
                    });
                }
            });
    
        }else{
            return res.status(200).json({
                success: false,
                message: 'Session token is invalid'
            });
        }
    }catch(err){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }
}


// @route Post api/poll/vote
// @desc Cast vote for a poll
// @params pollId, index, userId, ipAddress
// @access Public
exports.vote = async (req, res, next) => {
    let errors = []
    const {pollId, index, userId, ipAddress} = req.body;

    if (pollId === undefined || pollId === null || pollId === ''){
        errors.push('Poll id is required');
    }
    if (index === undefined || index === null || index === ''){
        errors.push('Index is required');
    }
    if ((userId === undefined || userId === null || userId === '') && (ipAddress === undefined || ipAddress === null || ipAddress === '')){
        errors.push('User id or ip address is required');
    }

    if (errors){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }else{
        const poll = await Poll.findOne({_id: pollId});
        if (poll){
            poll.items[index].votes++;
            poll.totalVotes++;
            await poll.save();
            return res.status(200).json({
                success: true,
                message: 'Vote casted successfully'
            });
            
        }else{
            return res.status(200).json({
                success: false,
                message: 'Poll not found'
            });
        }
    }

}

// @route Get api/poll/pollId/:pollId
// @desc Get poll by id
// @params pollId
// @access Public
exports.getPoll = async (req, res, next) => {
    let errors = []
    const {pollId} = req.params;
    const poll = await Poll.findOne({_id: pollId});
    if (poll){
        return res.status(200).json({
            success: true,
            poll: poll
        });
    }else{
        return res.status(200).json({
            success: false,
            message: 'Poll not found'
        });
    }
}

// @route Delete api/poll/delete/:pollId
// @desc Sign in user
// @params pollId, sessionToken
// @access Public
exports.deletePoll = async (req, res, next) => {
    let errors = []
    const {pollId, sessionToken} = req.params;

    if (pollId === undefined || pollId === null || pollId === ''){
        errors.push('Poll id is required');
    }
    if (sessionToken === undefined || sessionToken === null || sessionToken === ''){
        errors.push('Session token is required');
    }

    if (errors){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }else{
        const validToken = await User.findOne({sessionToken: sessionToken});
        if (validToken) {
            jwt.verify(sessionToken, validUser.sessionToken, (valid, err) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: 'Invalid session token'
                    });
                }
                if (valid){
                    const poll = Poll.findOne({_id: pollId});
                    if (poll){
                        poll.remove();
                        return res.status(200).json({
                            success: true,
                            message: 'Poll deleted successfully'});
                    }else{
                        return res.status(200).json({
                            success: false,
                            message: 'Poll not found'})
                    }
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Poll deleted successfully'
        });
    }

}