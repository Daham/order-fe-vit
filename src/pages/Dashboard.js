import React, {useEffect, useState} from 'react';
import {styled} from '@mui/system';
import {
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {
    addItem,
    dashboardSelectors,
    fetchCustomers,
    fetchProducts, resetOrder,
    setCustomer
} from "../state/reducers/dashboard";

const Container = styled('div')({
    margin: 'auto',
    maxWidth: 800,
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

const Item = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f2f2f2',
    },
});

const Dashboard = () => {
    const dispatch = useDispatch();

    const products = useSelector(dashboardSelectors.products);
    const customers = useSelector(dashboardSelectors.customers);
    const order = useSelector(dashboardSelectors.order);

    useEffect(() => {
        dispatch(fetchCustomers({}));
        dispatch(fetchProducts({}));
    }, []);

    const [searchEmail, setSearchEmail] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity
    const addItemToOrder = () => {
        const product = products.find(item => item.name === selectedProduct);
        console.log(product)
        if (product) {
            const newItem = {...product, quantity: selectedQuantity};
            dispatch(addItem(newItem));
        }
    };

    const updateCustomerInfo = (info) => {

        dispatch(setCustomer(info));
    };

    const searchCustomerByEmail = () => {
        const filteredInfo = customers.filter(info => info.email === searchEmail);
        if (filteredInfo.length > 0) {
            dispatch(setCustomer(filteredInfo[0]));
        }
    };

    const placeOrder = () => {
        // Logic to place the order (e.g., send data to server)
        console.log('Placing order:', order);
        // Reset order state after placing the order
        dispatch(resetOrder());
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Section>
                <Typography variant="h5" gutterBottom>
                    Customer Information
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <InputField
                            label="Search by Email"
                            type="email"
                            size="small"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={searchCustomerByEmail}>Search</Button>
                    </Grid>
                </Grid>
                <InputField
                    label="Name"
                    size="small"
                    value={order.customerInfo ? `${order.customerInfo.firstName} ${order.customerInfo.lastName}` : ''}
                    onChange={(e) => updateCustomerInfo({name: e.target.value})}
                    fullWidth
                />
                <InputField
                    label="Email"
                    type="email"
                    size="small"
                    value={order.customerInfo ? order.customerInfo.email : ''}
                    onChange={(e) => updateCustomerInfo({email: e.target.value})}
                    fullWidth
                />
                <InputField
                    label="Address"
                    multiline
                    rows={3}
                    size="small"
                    value={order.customerInfo ? order.customerInfo.address : ''}
                    onChange={(e) => updateCustomerInfo({address: e.target.value})}
                    fullWidth
                />
            </Section>
            <Section>
                <Typography variant="h5" gutterBottom>
                    Product Selection
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Select
                            label="Product"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            fullWidth
                            size="small" // Uniform size with input field
                        >
                            {products.map(product => (
                                <MenuItem key={product.id} value={product.name}>
                                    {product.name} - ${product.price}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputField
                            label="Quantity"
                            type="number"
                            size="small"
                            value={selectedQuantity}
                            onChange={(e) => setSelectedQuantity(e.target.value)}
                            fullWidth
                            inputProps={{min: 1}} // Minimum quantity is 1
                        />
                    </Grid>
                </Grid>
                <Button variant="contained" onClick={addItemToOrder} style={{marginTop: '16px'}}>
                    Add to Cart
                </Button>
            </Section>
            <Section>
                <Typography variant="h5" gutterBottom>
                    Cart
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items.map((item, index) => (
                                <Item key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                </Item>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Section>
            <Section>
                <Typography variant="h6" gutterBottom>
                    Total Price: ${order.totalPrice}
                </Typography>
                <Button variant="contained" onClick={placeOrder}>
                    Place Order
                </Button>
            </Section>
        </Container>
    );
};

export default Dashboard;
