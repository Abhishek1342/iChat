const base = "http://localhost:5000";

const endpoint = {
    login: `${base}/api/login`,
    signup: `${base}/api/signup`,
    setProfile: `${base}/api/setprofile`,
    currentUser: `${base}/api/currentuser`,
    searchUser: `${base}/api/searchuser`,
    friendRequests: `${base}/api/friendrequest`,
    acceptRequest: `${base}/api/acceptrequest`,
    cancelRequest: `${base}/api/cancelrequest`,
    filterUser: `${base}/api/filtereduser`,
    friends: `${base}/api/friends`,
};

export default endpoint;
