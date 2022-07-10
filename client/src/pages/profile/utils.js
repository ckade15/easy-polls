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
    const response = await axios.put(`${updatePassword}/${id}`, {
        sessionToken: token,
        password: value
    });
    return response;
}

const utils = {confirm, updatePassword};

export default utils;