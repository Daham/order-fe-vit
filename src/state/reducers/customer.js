import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

const ORDER_API_URL = window.configs.orderApiUrl;

const sliceId = 'customer';

export const createCustomer = createAsyncThunk(
    'customer/createCustomer',
    // eslint-disable-next-line no-empty-pattern
    async ({email, address, firstName, lastName, phone}) => {

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

        const config = {
            method: 'post',
            url: `${ORDER_API_URL}/customers`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                "email": email,
                "address": address,
                "first_name": firstName,
                "last_name": lastName,
                "phone_number": phone
            }
        };

        const response = await axios(config);
        return response.data
    }
)

const customerSlice = createSlice({
    name: sliceId,
    initialState: {
        loading: false,
        error: null,
        openSnackBar: false
    },
    reducers: {
        setOpenSnackBar: (state, {payload}) => {
            state.openSnackBar = payload
        },
    },
    extraReducers: builder => {
        builder.addCase(createCustomer.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(createCustomer.fulfilled, (state, {payload}) => {
            state.loading = false
            state.openSnackBar = true
        });

        builder.addCase(createCustomer.rejected, (state, {error}) => {
            state.loading = false
            state.openSnackBar = true
            state.error = error.message;
        });
    }
});

export const {
    setOpenSnackBar
} = customerSlice.actions;

export const customerSelectors = {
    loading: (state) => state.customer.loading,
    error: (state) => state.customer.error,
    openSnackBar: (state) => state.customer.openSnackBar,
};

export default customerSlice.reducer;