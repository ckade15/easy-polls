const { Socket } = require("socket.io");

const Poll = require("../models/Poll");

let users = []
let poll = undefined

const joinPoll = (id, pollId) =>{
    const user = {id, pollId};
    
    users.push(user);
    return user;
}

const closePoll = async (pollId) => {
    const poll = await Poll.findOne({_id: pollId});
    if (poll){
        poll.pollStatus = false;
        poll.save();
        return true;
    }else{
        return false;
    }
}

const createPoll = async (pollId) => {
    poll = getPoll(pollId)
    setTimeout(poll.pollLength, closePoll(pollId));
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


const getPoll = async (pollId) => {
    const p = await Poll.findById(pollId).then(pl => {
        poll = pl
    })
    return poll
}

const getPollUsers = (pollId) => {
    return users.filter(user => user.pollId === pollId)
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


