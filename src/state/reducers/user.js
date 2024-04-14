import { createSlice } from '@reduxjs/toolkit';

const sliceId = 'user';

const userSlice = createSlice({
    name: sliceId,
    initialState: {
        data: null,
        isLoggedIn: false,//sessionStorage.getItem("logged-in"),
    },
    reducers: {
        logInUser: (state, { payload }) => {
            state.data = {
                userId: null,//JSON.parse(payload?.identities)?.[0]?.userId,
                email: payload?.email,
            };
            state.isLoggedIn = true;
        },
        logOutUser: (state) => {
            state.data = null;
            state.isLoggedIn = false;
        },
    },
});

export const { logInUser, logOutUser } = userSlice.actions;

export const userSelectors = {
    isLoggedIn: (state) => state.user.isLoggedIn,
};

export default userSlice.reducer;