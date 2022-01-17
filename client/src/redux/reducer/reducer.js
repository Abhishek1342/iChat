let initailState = {
    currentUser: {},
    friend: [],
    filteredUser: [],
};
const reducer = (state = initailState, action) => {
    if (action.type === "CURRENT-USER") {
        return {
            ...state,
            currentUser: { ...state.currentUser, ...action.payload },
        };
    } else if (action.type === "SET-FRIENDS") {
        return {
            ...state,
            friend: action.payload,
        };
    } else if (action.type === "SET-FILTEREDUSER") {
        return {
            ...state,
            filteredUser: action.payload,
        };
    } else {
        return state;
    }
};

export default reducer;
