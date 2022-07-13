import axios from "axios";

const URL = 'http://localhost:5001/api/poll/current'

export const getActivePolls = () => {
    const request = axios.get(URL)
    return request;
}