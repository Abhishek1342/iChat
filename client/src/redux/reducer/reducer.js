let initailState = {
    currentUser: {},
};
const reducer = (state = initailState, action) => {
    if (action.type === "CURRENT-USER") {
        return {
            ...state,
            currentUser: { ...state.currentUser, ...action.payload },
        };
    }
};

export default reducer;
