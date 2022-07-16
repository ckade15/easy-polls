const { Socket } = require("socket.io");

const Poll = require("../models/Poll");

let users = []
let poll = undefined

const createPoll = async (pollId, sessionToken) => {
    poll = getPoll(pollId)
    setTimeout(poll.pollLength, closePoll(pollId));
}
const joinPoll = (id, pollId) =>{
    const user = {id, pollId};

    users.push(user);
    return user;
}

const vote = (pollId) => {
    poll = getPoll(pollId);
    return poll;
}

const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
}

const leavePoll = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getPoll = (pollId) => {
    const p = Poll.findOne({pollId: pollId})
    poll = p 
    return poll;
}

const getPollUsers = (pollId) => {
    return users.filter(user => user.pollId === pollId).lean().then(res => {
        return res.toJSON();
    })
}




module.exports = {
    joinPoll,
    createPoll,
    vote,
    getCurrentUser,
    leavePoll,
    getPollUsers,
    getPoll
}


