import React, {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {TextField, Button, Typography, CircularProgress, Snackbar} from '@mui/material';

import {useDispatch, useSelector} from "react-redux";
import {
    createCustomer, customerSelectors, setOpenSnackBar
} from "../state/reducers/customer";

const Container = styled('div')({
    position: 'relative',
    margin: 'auto',
    maxWidth: 400,
    padding: '16px',
    background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)', // Elegant background gradient
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
});

const Section = styled('div')({
    marginBottom: '24px',
});

const InputField = styled(TextField)({
    marginBottom: '12px',
    '& .MuiInputBase-root': {
        borderRadius: '4px',
        backgroundColor: '#fff', // White background
    },
});

const LoaderWrapper = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
});

const CustomerRegistration = () => {
    const dispatch = useDispatch();

    const loading = useSelector(customerSelectors.loading);
    const openSnackBar = useSelector(customerSelectors.openSnackBar);
    const error = useSelector(customerSelectors.error);

    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCustomerInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to submit customer registration data (e.g., send to server)
        console.log('Submitting customer registration:', customerInfo);
        // Clear form after submission
        dispatch(createCustomer({
            email: customerInfo.email,
            address: customerInfo.address,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            phone: customerInfo.phone
        }))
    };

    useEffect(() => {
        if (loading === false) {
            setCustomerInfo({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                phone: ''
            })
        }
    }, [loading]);

    const handleCloseSnackbar = () => {
        console.log("++++++Closing Snackbar++++++++++")
        setOpenSnackBar(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Customer Registration
            </Typography>
            <form onSubmit={handleSubmit}>
                <Section>
                    <InputField
                        name="firstName"
                        label="First Name"
                        value={customerInfo.firstName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="lastName"
                        label="Last Name"
                        value={customerInfo.lastName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="email"
                        label="Email"
                        type="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="address"
                        label="Address"
                        multiline
                        rows={3}
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="phone"
                        label="Phone Number"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Button type="submit" variant="contained">
                    Register
                </Button>
                {loading && ( // Display loader if isLoading is true
                    <LoaderWrapper>
                        <CircularProgress/>
                    </LoaderWrapper>
                )}
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000} // Snackbar auto hide duration
                    onClose={handleCloseSnackbar}
                    message={error ? "Customer registration failed" : "Customer registration saved successfully!"} // Snackbar message
                />
            </form>
        </Container>
    );
};

export default CustomerRegistration;