import axios from "axios";
import { Navigate } from "react-router-dom";

const URL = 'http://localhost:5001/api/poll/create'

export const createPoll = (sessionToken, title, userId, pollLength, createdBy, items) => {
    const itms = items.map(item=> {
        return {
            name: item,
            votes: 0
        }
    })
    const poll = axios.post(URL, {
        sessionToken: sessionToken,
        title: title, 
        userId: userId, 
        pollLength: pollLength, 
        createdBy: createdBy,
        item: itms
    });
    return poll;
    
}

export const redirectToPoll = pollId => {
    return <Navigate to={`/poll/${pollId}`} />
}

const utils = {createPoll}

export default utils;