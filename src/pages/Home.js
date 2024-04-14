// eslint-disable-next-line no-unused-vars
import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Dashboard from './Dashboard';
import CustomerRegistration from './CustomerRegistration';
import ProductCreation from './ProductCreation';

const views = [
    { name: 'Dashboard', icon: DashboardIcon, component: Dashboard },
    { name: 'Customer Registration', icon: PersonAddIcon, component: CustomerRegistration },
    { name: 'Product Creation', icon: AddBoxIcon, component: ProductCreation },
];

const Home = () => {
    return (
        <Sidebar views={views} />
    );
};

export default Home;
