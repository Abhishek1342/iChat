import axios from "axios";
import endpoint from "./EndPoints";
import token from "../helper/Token";

// login function
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/login
//NO AUTHENTICATION REQUIRED

export const loginAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.login, data);
        return res;
    } catch (error) {
        console.log("APIERROR : loginAPI", error);
    }
};

// FOR USER TO SIGNUP ACCOUNT
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/signup
// NO AUTHENTICATION REQUIRED

export const signupAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.signup, data);
        return res;
    } catch (error) {
        console.log("APIERROR : signupAPI", error);
    }
};

// FOR USER TO ENTER THERE PROFILE DETAILS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/setprofile
// AUTHENTICATION REQUIRED

export const setProfileAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.setProfile, data, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : setProfileAPI", error);
    }
};

//  TO GET CURRENT USER DETAILS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/currentuser
// AUTHENTICATION REQUIRED

export const currentUserAPI = async () => {
    try {
        const res = await axios.get(endpoint.currentUser, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : currentUserAPI", error);
    }
};

// ROUTE 4 : FOR USER TO SEARCH GLOBAL USER LIST
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/searchuser
// AUTHENTICATION REQUIRED

/* #################### v NOT IN USE CURRENTLY #######################
export const searchUserAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.searchUser, data, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : searchUserAPI", error);
    }
};
#################### ^ NOT IN USE CURRENTLY ####################### */
