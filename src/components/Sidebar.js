import React,{useState} from 'react';
import {Button, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {styled} from '@mui/system';
import {useAuthContext} from "@asgardeo/auth-react";
import {useNavigate} from "react-router";

const Main = styled('main')({
    flexGrow: 1,
    padding: '20px',
});

const Container = styled('div')({
    display: 'flex',
});

// eslint-disable-next-line react/prop-types
const Sidebar = ({views}) => {
    // eslint-disable-next-line react/prop-types
    const [currentPage, setCurrentPage] = useState(views[0].name);

    const {signOut} = useAuthContext();

    const navigate = useNavigate();

    const handlePageChange = () => {
        signOut().then(() => {
            navigate("/login")
        });

    };

    const handleSignOut = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        backgroundColor: '#253053', // Sidebar background color
                        color: '#fff', // Text color
                    },
                }}
            >
                <List>
                    {views.map(view => (
                        <ListItem
                            button
                            key={view.name}
                            onClick={() => handlePageChange()}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#31476B', // Hover background color
                                },
                                ...(currentPage === view.name && {
                                    backgroundColor: '#3f51b5', // Selected background color
                                    '& .MuiListItemIcon-root, & .MuiTypography-root': {
                                        color: '#fff', // Selected text/icon color
                                    },
                                }),
                            }}
                        >
                            <ListItemIcon>
                                <view.icon/>
                            </ListItemIcon>
                            <ListItemText primary={view.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main>
                {/* eslint-disable-next-line react/prop-types */}
                {views.map(view => (
                    currentPage === view.name && <view.component key={view.name}/>
                ))}
            </Main>
            <Button onClick={handleSignOut}>Sign Out</Button> {/* Add signout button */}
        </Container>
    );
};

export default Sidebar;
