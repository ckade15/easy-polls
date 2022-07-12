const mongoose = require('mongoose');

const Poll = new mongoose.model(
    "Poll",
    new mongoose.Schema({
        userId: {
            type: String,
            required: [true, 'userId is required']
        }, 
        title: {type: String},
        item: [{
            name: {type: String},
            votes: {type: Number}
        }],
        pollStatus: {type: Boolean},
        pollLength: {type: Number},
        createdBy: {type: String},
        totalVotes: {type: Number},
        hasVoted: [{
            required: false,
            userVoterId: {type: String, required: false}
        }],
    }, {timestamps: true})
);

module.exports = Poll;