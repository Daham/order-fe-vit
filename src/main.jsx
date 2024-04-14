import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './state/store';
import {AuthProvider} from "@asgardeo/auth-react";

const config = {
    signInRedirectURL: window.configs.auth.signInRedirectURL,
    signOutRedirectURL: window.configs.auth.signOutRedirectURL,
    clientID: window.configs.auth.clientID,
    baseUrl: window.configs.auth.baseUrl,
    scope: ["openid", "profile"]
};

console.log("==========INDEX========1========")
console.log(config)
console.log("==========INDEX========2========")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider config={config}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </AuthProvider>
    </React.StrictMode>
);
