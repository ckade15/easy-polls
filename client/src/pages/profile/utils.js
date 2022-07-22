import axios from "axios";
const ROUTE = 'http://localhost:5001/api/user/updateUser';
const confirm = async (id, name, value, token) => {

    const response = await axios.put(`${ROUTE}/${id}`, {
        sessionToken: token,
        [name]: value
    });

    return response;

}

const PASS_ROUTE = 'http://localhosthost:5001/api/user/updatePassword'
const updatePassword = async (id, value, token) => {

    const response = await axios.put(`${PASS_ROUTE}/${id}`, {
        sessionToken: token,
        password: value
    });
    return response;
}

const POLL_ROUTE = 'http://localhost:5001/api/poll/get'
const getUserPolls = async (userId) => {
    const response = await axios.get(`${POLL_ROUTE}/${userId}`).then(res => {
        return res
    });
    return response;
}

const DELETE_ROUTE = 'http://localhost:5001/api/poll/delete'
export const deletePoll = (pollId, sessionToken) => {
    const URL = DELETE_ROUTE + `/${pollId}`
    const request = axios.delete(URL, {data:{sessionToken: sessionToken}});
    return request;
}

const utils = {confirm, updatePassword, getUserPolls, deletePoll};

export default utils;