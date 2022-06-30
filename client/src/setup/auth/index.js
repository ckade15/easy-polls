import axios from 'axios';

export const signIn = async (email, password) => {
    console.log(email)
    const loginRoute = "http://localhost:5001/api/user/signin";
    const response = await axios.post(loginRoute, {
        email: email,
        password: password
    });
    return response;
}

export const checkToken = async (sessionToken) => {
    const checkRoute = "http://localhost:5001/api/user/checkToken";
    const response = await axios.post(checkRoute, {
        sessionToken: sessionToken
    });
    return response;
};

const auth = {signIn, checkToken};

export default auth;