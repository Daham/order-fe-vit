import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

const ORDER_API_URL = window.configs.orderApiUrl;

const sliceId = 'dashboard';

export const fetchProducts = createAsyncThunk(
    'dashboard/fetchProducts',
    // eslint-disable-next-line no-empty-pattern
    async ({}) => {

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

        const config = {
            method: 'get',
            url: `${ORDER_API_URL}/products`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {rowsPerPage: 10},
        };

        const response = await axios(config);
        return response.data
    }
)

export const fetchCustomers = createAsyncThunk(
    'dashboard/fetchCustomers',
    // eslint-disable-next-line no-empty-pattern
    async ({}) => {

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN");

        const config = {
            method: 'get',
            url: `${ORDER_API_URL}/customers`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {rowsPerPage: 10},
        };

        const response = await axios(config);
        return response.data
    }
)

const dashboardSlice = createSlice({
    name: sliceId,
    initialState: {
        customers: [],
        products: [],
        order: {
            items: [],
            totalPrice: 0,
            customerInfo: {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
            },
        },
    },
    reducers: {
        setOrder: {
            reducer: (state, {payload}) => {
                state.order = payload
            }
        },
        addItem: {
            reducer: (state, {payload}) => {
                state.order.items = [...state.order.items, payload];
                state.order.totalPrice = state.order.totalPrice + (payload.price * payload.quantity)
            }
        },
        setCustomer: (state, {payload}) => {
            state.order.customerInfo = payload
        },
        resetOrder: (state, {payload}) => {
            state.order = {
                items: [],
                totalPrice: 0,
                customerInfo: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    address: '',
                },
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {
            state.products = payload.items
        });

        builder.addCase(fetchCustomers.fulfilled, (state, {payload}) => {
            state.customers = payload.items
        });
    }

});

export const {
    setOrder,
    addItem,
    setCustomer,
    resetOrder
} = dashboardSlice.actions;

export const dashboardSelectors = {
    products: (state) => state.dashboard.products,
    customers: (state) => state.dashboard.customers,
    order: (state) => state.dashboard.order,
};

export default dashboardSlice.reducer;