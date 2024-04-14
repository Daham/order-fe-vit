import React from 'react';
import {styled} from '@mui/system';
import {Button} from '@mui/material';
import {useAuthContext} from "@asgardeo/auth-react";

const Container = styled('div')({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Gradient background
});

const LoginButton = styled(Button)({
    padding: '12px 24px',
    fontSize: '1.2rem',
    borderRadius: '999px', // Circular button
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow
    '&:hover': {
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)', // Slightly larger shadow on hover
    },
});

const LoginPage = () => {

    const {signIn} = useAuthContext();

    return (
        <Container>
            <LoginButton variant="contained" onClick={() => signIn()}>
                Login
            </LoginButton>
        </Container>
    );
};

export default LoginPage;
