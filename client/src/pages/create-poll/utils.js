import axios from "axios";

const URL = 'http://localhost:5001/api/poll/create'

export const createPoll = (sessionToken, title, userId, pollLength, createdBy, items) => {
    const poll = axios.post(URL, {
        sessionToken: sessionToken,
        title: title, 
        userId: userId, 
        pollLength: pollLength, 
        createdBy: createdBy,
        item: items
    });
    return poll;
    
}

const utils = {createPoll}

export default utils;