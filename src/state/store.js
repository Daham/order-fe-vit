import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import dashboard from './reducers/dashboard';
import customer from './reducers/customer';
import product from './reducers/product';
import user from './reducers/user';

const appReducers = {
    dashboard,
    customer,
    product,
    user
};

const rootReducer = combineReducers({...appReducers});

const store = configureStore({
    reducer: rootReducer,
});

export default store;