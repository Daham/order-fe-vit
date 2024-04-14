import React, {useState} from 'react';
import {styled} from '@mui/system';
import {TextField, Button, Typography, CircularProgress, Snackbar} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {createProduct, productSelectors, setOpenSnackBar} from "../state/reducers/product";

const Container = styled('div')({
    margin: 'auto',
    maxWidth: 400,
    padding: '16px',
    background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)', // Elegant background gradient
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
    position: 'relative', // Ensure relative positioning for absolute centering
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

const LoadingOverlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: '8px',
});

const ProductCreation = () => {
    const dispatch = useDispatch();

    const loading = useSelector(productSelectors.loading);
    const openSnackBar = useSelector(productSelectors.openSnackBar);
    const error = useSelector(productSelectors.error);

    const [productInfo, setProductInfo] = useState({
        upc: '',
        name: '',
        price: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProductInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Submitting product creation:', productInfo);

        dispatch(createProduct({
            name: productInfo.name,
            description: productInfo.description,
            price: productInfo.price,
        }))
    };

    const handleCloseSnackbar = () => {
        console.log("++++++Closing Snackbar++++++++++")
        setOpenSnackBar(false);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Product Creation
            </Typography>
            <form onSubmit={handleSubmit}>
                <Section>
                    <InputField
                        name="upc"
                        label="UPC (Universal Product Code)"
                        value={productInfo.upc}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="name"
                        label="Name"
                        value={productInfo.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="price"
                        label="Price"
                        type="number"
                        value={productInfo.price}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Section>
                    <InputField
                        name="description"
                        label="Description"
                        multiline
                        rows={3}
                        value={productInfo.description}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Section>
                <Button type="submit" variant="contained">
                    Create Product
                </Button>
                {loading && (
                    <LoadingOverlay>
                        <CircularProgress/>
                    </LoadingOverlay>
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

export default ProductCreation;
