export const currentUserAction = (payload) => {
    return {
        type: "CURRENT-USER",
        payload: payload,
    };
};

export const friendsAction = (payload) => {
    return {
        type: "SET-FRIENDS",
        payload: payload,
    };
};

export const filteredUserAction = (payload) => {
    return {
        type: "SET-FILTEREDUSER",
        payload: payload,
    };
};
