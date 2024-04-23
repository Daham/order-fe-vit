// eslint-disable-next-line no-unused-vars
import React, {lazy, Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import {useAuthContext} from "@asgardeo/auth-react";
import Cookies from 'js-cookie';

import {theme} from "./theme/theme";

//MUI
import {CircularProgress, ThemeProvider} from "@mui/material";

import {logInUser, userSelectors} from "./state/reducers/user";


//Custom components (lazy loaded)
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Home'));


const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(userSelectors.isLoggedIn);

    console.log("+++++++++isLoggedIn++++++++start++++++")
    console.log(isLoggedIn)
    console.log("+++++++++isLoggedIn+++++end+++++++++")

    const authenticateUser = async () => {
        let isUserInfoSet = false;

        if (process.env.REACT_APP_ENV === 'development') {
            // Mock the authentication flow
            const mockUserInfo = {username: 'testUser', name: 'Test User'};
            localStorage.setItem('userDetails', JSON.stringify(mockUserInfo));
            isUserInfoSet = true;
        }

        const storedUserDetails = localStorage.getItem('userDetails');

        if (storedUserDetails) {
            const userInfo = JSON.parse(storedUserDetails);
            dispatch(logInUser(userInfo));
            isUserInfoSet = true;
        }

        if (!isUserInfoSet) {
            console.log("+++++++++encodedUserInfo++++++++start++++++")
            const encodedUserInfo = Cookies.get('userinfo');
            console.log("+++++++++encodedUserInfo++++++++end++++++")
            if (encodedUserInfo) {
                const userInfo = JSON.parse(atob(encodedUserInfo));
                dispatch(logInUser(userInfo));
                localStorage.setItem('userDetails', JSON.stringify(userInfo))
                navigate("/dashboard");
            } else {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        authenticateUser().then();
    }, []);


    return (<ThemeProvider theme={theme}>
            <Suspense>
                <Routes>
                    <Route
                        exact
                        path={'/login'}
                        element={isLoggedIn ? <Navigate to={'/dashboard'}/> : <Login/>}
                    />
                    <Route
                        exact
                        path={"/"}
                        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"}/>}
                    />
                    <Route
                        exact
                        path={"/authenticate"}
                        element={isLoggedIn ? <Navigate to={'/dashboard'}/> : <CircularProgress/>}
                    />
                    <Route
                        exact
                        path={'/dashboard'}
                        element={isLoggedIn ? <Dashboard/> : <Navigate to={'/login'}/>}
                    />
                </Routes>
            </Suspense>
        </ThemeProvider>);
};

export default App;