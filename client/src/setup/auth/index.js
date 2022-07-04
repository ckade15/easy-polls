import axios from 'axios';

// Routes
const loginRoute = "http://localhost:5001/api/user/signin";
const registerRoute = "http://localhost:5001/api/user/register";
const checkRoute = "http://localhost:5001/api/user/checkToken"

export const signIn = async (email, password) => {
    console.log(email)
    const response = await axios.post(loginRoute, {
        email: email,
        password: password
    });
    return response;
}


export const register = async (firstName, lastName, email, password) => {
    const response = await axios.post(registerRoute, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });
    return response;
}

export const checkToken = async (sessionToken) => {
    const response = await axios.post(checkRoute, {
        sessionToken: sessionToken
    });
    return response;
};

const auth = {signIn, checkToken, register};

export default auth;