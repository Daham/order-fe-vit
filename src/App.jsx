// eslint-disable-next-line no-unused-vars
import React, {lazy, Suspense, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import {useAuthContext} from "@asgardeo/auth-react";

import {theme} from "./theme/theme";

//MUI
import {CircularProgress, ThemeProvider} from "@mui/material";


//Custom components (lazy loaded)
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Home'));


const App = () => {
    useNavigate();
    useDispatch();
    const {state, getAccessToken, getBasicUserInfo} = useAuthContext();

    const getData = async () => {
        try {
            if (state?.isAuthenticated) {
                const accessToken = await getAccessToken();
                const basicUserInfo = await getBasicUserInfo();

                const authState = {
                    accessToken: accessToken,
                    basicUserInfo: basicUserInfo
                };
                console.log(authState);

                sessionStorage.setItem("ACCESS_TOKEN",accessToken);
            } else {
                console.error("-----Not authenticated------");
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData().then();
    }, [state.isAuthenticated]);


    return (
        <ThemeProvider theme={theme}>
            <Suspense>
                <Routes>
                    <Route
                        exact
                        path={'/login'}
                        element={state.isAuthenticated ? <Navigate to={'/dashboard'}/> : <Login/>}
                    />
                    <Route
                        exact
                        path={"/"}
                        element={<Navigate to={state.isAuthenticated ? "/dashboard" : "/login"}/>}
                    />
                    <Route
                        exact
                        path={"/authenticate"}
                        element={state.isAuthenticated ? <Navigate to={'/dashboard'}/> : <CircularProgress/>}
                    />
                    <Route
                        exact
                        path={'/dashboard'}
                        element={state.isAuthenticated ? <Dashboard/> : <Navigate to={'/login'}/>}
                    />
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;