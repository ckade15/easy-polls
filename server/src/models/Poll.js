const mongoose = require('mongoose');

const Poll = new mongoose.model(
    "Poll",
    new mongoose.Schema({
        _id: Number,
        userId: Number,
        item: [{
            id: Number,
            title: String,
            votes: Number
        }],
        pollStatus: Boolean,
        pollEnd: Date,
        createdAt: Date,
        createdBy: String,
        totalVotes: Number,
        hasVoted: [{
            userId: Number,
            ipAddress: String
        }]
    })
);