const mongoose = require('mongoose');

const Poll = new mongoose.model(
    "Poll",
    new mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        userId: Number,
        item: [{
            title: String,
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