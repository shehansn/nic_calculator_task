import axios from "axios";

const baseURL = "http://localhost:8000"

export const validateUserJWTToken = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
            headers: { Authorization: "Bearer " + token },
        });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}
//register user
export const registerUser = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/users/register`, { ...data });
        return res.data;
    }
    catch (err) {
        return err;
    }
}
//login user
export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/users/login`, { ...data });
        return res.data;
    }
    catch (err) {
        return err;
    }
}

//get all users
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/users`);

        return res.data;
    }
    catch (err) {
        return err;
    }
}

//calculate user DOB & Gender
export const convertNIC = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/users/convert`, { ...data });
        return res.data;
    }
    catch (err) {
        return err;
    }
}