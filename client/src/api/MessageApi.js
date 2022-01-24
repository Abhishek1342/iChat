import axios from "axios";
import endpoint from "./EndPoints";
import token from "../helper/Token";

export const newMessageAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.message, data, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : newMessageAPI", error);
    }
};

export const getMessageAPI = async (receiverId) => {
    try {
        const res = await axios.get(endpoint.message + `/${receiverId}`, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : getMessageAPI", error);
    }
};
