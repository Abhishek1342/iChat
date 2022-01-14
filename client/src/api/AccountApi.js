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

// ROUTE 6 : FOR USER TO SEND FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/friendrequest
// AUTHENTICATION REQUIRED

export const friendRequestAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.friendRequests, data, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : friendRequestAPI", error);
    }
};

// ROUTE 7 : FOR USER TO SEE ALL FRIEND REQUESTS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/friendrequest
// AUTHENTICATION REQUIRED

export const getFriendRequestAPI = async () => {
    try {
        const res = await axios.get(endpoint.friendRequests, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : getFriendRequestAPI", error);
    }
};

// ROUTE 8 : FOR USER TO ACCEPT FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/acceptrequest
// AUTHENTICATION REQUIRED

export const acceptFriendRequestAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.acceptRequest, data, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : acceptFriendRequestAPI", error);
    }
};

// ROUTE 9 : FOR USER TO CANCEL FRIEND REQUESTS
// METHOD : POST
// ENDPOINT : http://localhost:5000/api/cancelrequest
// AUTHENTICATION REQUIRED

export const cancelRequestAPI = async (data) => {
    try {
        const res = await axios.post(endpoint.cancelRequest, data, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : cancelRequestAPI", error);
    }
};

// ROUTE 10 : FOR USER TO SEE ALL GLOBAL NON FRIEND USER WHO HAS NOT EVEN RECIEVED OR SEND REQUESTS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/filtereduser
// AUTHENTICATION REQUIRED

export const getFilteredUserAPI = async () => {
    try {
        const res = await axios.get(endpoint.filterUser, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : filteredUserAPI", error);
    }
};

// ROUTE 11 : FOR USER TO SEE ALL FRIENDS
// METHOD : GET
// ENDPOINT : http://localhost:5000/api/friends
// AUTHENTICATION REQUIRED

export const getFriendsAPI = async () => {
    try {
        const res = await axios.get(endpoint.friends, {
            headers: {
                "auth-token": token,
            },
        });
        return res;
    } catch (error) {
        console.log("APIERROR : friendsAPI", error);
    }
};
