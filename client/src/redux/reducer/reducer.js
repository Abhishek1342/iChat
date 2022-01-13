const reducer = (state = 2, action) => {
    if (action.type === "HI") {
        return state + action.payload;
    }
};

export default reducer;
