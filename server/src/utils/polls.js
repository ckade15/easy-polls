const { getPoll } = require("../controllers/poll.controller");

const users = []
const poll = undefined

const createPoll = (pollId) => {
    poll = getPoll(pollId)
    setTimeout(poll.pollLength, )
}
const joinPoll = (id, pollId) =>{
    const user = {id, pollId};
    users.push(user);
    return user;
}

const vote = (id, pollId, itemId) => {

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

const getPollUsers = (pollId) => {
    return users.filter(user => user.pollId === pollId)
}





