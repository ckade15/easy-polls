import axios from "axios";
const ROUTE = 'http://localhost:5001/api/user/updateUser';
const confirm = async (id, name, value) => {

    const response = await axios.put(`${ROUTE}/${id}`, {
        [name]: value
    });

    return response;

}

const utils = {confirm};

export default utils;