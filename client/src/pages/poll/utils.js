import axios from "axios";

const URL = 'http://localhost:5001/api/poll/pollId'

export const getPoll = (pollId) => {
    const poll = axios.get(`${URL}/${pollId}`)
    return poll;
}