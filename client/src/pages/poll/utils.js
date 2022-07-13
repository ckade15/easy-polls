import axios from "axios";

const URL = 'http://localhost:5001/api/poll/pollId'

export const getPoll = (pollId) => {
    const poll = axios.get(`${URL}/${pollId}`)
    return poll;
}

const VOTE_URL = 'http://localhost:5001/api/poll/vote'
export const vote = (pollId, index, userId) => {
    console.log(pollId, index, userId)
    const vote = axios.post(VOTE_URL, {
        pollId: pollId, 
        index: index, 
        userId: userId});
    return vote;
}

export const getIp = async () => {
    const res = await axios.get('https://api.ipify.org?format=json')

    console.log(res.data.IPv4)
    return res.data.ip;
}

export const checkVoted = () => {

}