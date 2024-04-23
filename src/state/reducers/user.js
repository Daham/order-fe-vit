import {createSlice} from '@reduxjs/toolkit';

const sliceId = 'user';

const userSlice = createSlice({
    name: sliceId,
    initialState: {
        userDetails: localStorage.getItem("userDetails"),
        isLoggedIn: false,
    },
    reducers: {
        logInUser: (state, {payload}) => {
            state.userDetails = payload;
            state.isLoggedIn = true;
        },
        logOutUser: (state) => {
            state.data = null;
            state.isLoggedIn = false;
        },
    },
});

export const {logInUser, logOutUser} = userSlice.actions;

export const userSelectors = {
    isLoggedIn: (state) => state.user.isLoggedIn,
};

export default userSlice.reducer;