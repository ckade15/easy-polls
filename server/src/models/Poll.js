const mongoose = require('mongoose');

const Poll = new mongoose.model(
    "Poll",
    new mongoose.Schema({
        userId: Number,
        title: String,
        item: [{
            name: String,
            votes: Number
        }],
        pollStatus: Boolean,
        pollLength: Number,
        createdAt: Date,
        createdBy: String,
        totalVotes: Number,
        hasVoted: [{
            userId: Number,
            ipAddress: String
        }]
    })
);

module.exports = Poll;