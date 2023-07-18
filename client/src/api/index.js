import axios from "axios";

const baseURL = "http://localhost:8000"


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


//calculate user DOB & Gender
export const convertNIC = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/nic/convertNic`, { ...data });
        return res.data;
    }
    catch (err) {
        return err;
    }
}