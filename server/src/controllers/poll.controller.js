const Poll = require('../models/Poll');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @route Post api/poll/create
// @desc Create poll
// @params sessionToken, userId, item (title, votes), pollLength,createdBy
// @access Public
exports.createPoll = async (req, res, next) => {
    let errors = []
    let {sessionToken, title, userId, item, pollLength, createdBy} = req.body;
    // Convert poll length from hours to seconds
    pollLength = ( pollLength * 60 ) * 60

 
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
        if (title === undefined || title === null || title === ''){
            errors.push('Poll title is required');
        }

        if (errors.length > 0){
            return res.status(200).json({
                success: false,
                error: errors
            });
        }

        const validUser = await User.findOne({_id: userId, sessionToken: sessionToken});
        
        if (validUser) {

            try{
                const poll = await new Poll({
                    userId: userId,
                    title: title,
                    item: item,
                    pollLength: pollLength,
                    createdBy: createdBy,
                    pollStatus: true,
                    createdAt: new Date(),
                    totalVotes: 0,
                    expireAfterSeconds: pollLength
                });
                
                
                poll.save((err, poll) => {
                    if (err){
                        return res.status(200).json({
                            success: false,
                            error: err
                        });
                    }
                    if (poll){
                        return res.status(200).json({
                            success: true,
                            poll: poll,
                            message: 'Poll created successfully'
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Poll created successfully'
                    });
                });

            }catch(e){
                console.log('cant create poll');
                return res.status(200).json({
                    success: false,
                    err: e,
                    message: 'Error creating poll'
                });
            }
            
    
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
    const {pollId, index, userId} = req.body;

    if (pollId === undefined || pollId === null || pollId === ''){
        errors.push('Poll id is required');
    }
    if (index === undefined || index === null || index === ''){
        errors.push('Item id is required');
    }
    if ((userId === undefined || userId === null || userId === '') && (ipAddress === undefined || ipAddress === null || ipAddress === '')){
        errors.push('User id or ip address is required');
    }

    if (errors.length > 0){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }else{
        
        const poll = await Poll.findOne({_id: pollId});
        
        if (poll){
            if (!poll.pollStatus){
                return res.status(200).json({
                    success: false,
                    message: 'Poll has expired'
                }); 
            }
            
            poll.hasVoted.map((user)=>{
                if (user.userVoterId == userId){
                    
                    return res.status(200).json({
                        success: false,
                        message: "User has already voted"
                    })
                }
            });

            poll.totalVotes = poll.totalVotes+1;
            poll.item[index].votes++;
            poll.hasVoted.push({userVoterId: userId})
            poll.save();

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

// @route Get api/poll/current
// @desc Get current polls
// @params pollId
// @access Public
exports.getCurrentPolls = async (req, res, next) => {
    let errors = []
    const polls = await Poll.find({pollStatus: true});
    if (polls){
        return res.status(200).json({
            success: true,
            polls: polls
        });
    }else{
        return res.status(200).json({
            success: false,
            message: 'Poll not found'
        });
    }
}

// @route Get api/poll/get/:userId
// @desc Get all of a users polls
// @params pollId
// @access Public
exports.getProfilePolls = async (req, res, next) => {
    let errors = []
    const {userId} = req.params;
    const polls = await Poll.find({userId: userId});
    if (polls){
        return res.status(200).json({
            success: true,
            polls: polls
        });
    }else{
        return res.status(200).json({
            success: false,
            message: 'Poll not found'
        });
    }
}

// @route Post api/poll/close/:pollId
// @desc Close poll
// @params pollId
// @access Private
exports.closePoll = async (req, res, next) => {
    const {pollId} = req.params;
    const {sessionToken} = req.body;

    const valid = await User.findOne({sessionToken: sessionToken})
    const poll = await Poll.findOne({_id: pollId});
    if (poll && valid){
        poll.pollStatus = false;
        poll.save();
        return res.status(200).json({
            success: true,
            message: "Poll successfully closed"
        });
    }else{
        return res.status(200).json({
            success: false,
            message: 'Poll not found or invalid sessionToken'
        });
    }
}

// @route Delete api/poll/delete/:pollId
// @desc Delete poll
// @params pollId, sessionToken
// @access Private
exports.deletePoll = async (req, res, next) => {
    let errors = []
    const {pollId} = req.params;
    const {sessionToken} = req.body;

    if (pollId === undefined || pollId === null || pollId === ''){
        errors.push('Poll id is required');
    }
    if (sessionToken === undefined || sessionToken === null || sessionToken === ''){
        errors.push('Session token is required');
    }

    if (errors.length > 0){
        return res.status(200).json({
            success: false,
            error: errors
        });
    }else{
        const validToken = await User.findOne({sessionToken: sessionToken});
        if (validToken) {
            jwt.verify(sessionToken, validToken.sessionToken, (valid, err) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: 'Invalid session token'
                    });
                }

                if (valid){

                    /*
                    const dele = async (id) => {
                        const p = await Poll.findByIdAndDelete(id)
                        console.log(p)
                        p.save()
                        return p;
                    }

                    dele(pollId).then(poll => {
                        if (!poll){
                            return res.status(200).json({
                                success: false,
                                message: 'Poll not found'
                            })
                        }else{
                            return res.status(200).json({
                                success: true,
                                message: 'Poll deleted successfully'
                            })
                        }
                    }).catch(() => {
                        return res.status(200).json({
                            success: false,
                            message: 'Poll not deleted'
                        })
                    });*/
                    
                }
            });
            const poll = await Poll.findOne({id: pollId})
            
            await poll.remove();
            
            return res.status(200).json({
                success: true,
                message: 'Poll deleted successfully'
            });
            

            

        }

    }

}