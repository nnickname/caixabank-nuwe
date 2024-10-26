import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Avatar, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { Link } from 'react-router-dom';
import LogoDarkCaixa from '../../../assets/caixabank-icon.png';
import LogoLightCaixa from '../../../assets/caixabank-icon-blue.png';

const Navbar = ({toggleTheme, isDarkMode, isAuthenticated, user }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar sx={{borderRadius:0}} position="static">
                <Toolbar>
                    {isMobile && (
                        <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Add CaixaBank logo */}
                    <Box sx={{ marginRight: 2 }}>
                        <img 
                            src={isDarkMode ? LogoLightCaixa : LogoDarkCaixa} 
                            alt="CaixaBank Logo" 
                            height="40" 
                        />
                    </Box>

                    {/* Navigation links */}
                    {!isMobile && ( 
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            {isAuthenticated ? (
                                <>
                                    <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                                    <Button color="inherit" component={Link} to="/settings">Settings</Button>
                                    <Button color="inherit" component={Link} to="/logout">Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/register">Register</Button>
                                </>
                            )}
                        </Box>
                    )}
                    
                    
                    <Box>
                        <IconButton onClick={toggleTheme} color="inherit">
                            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton>
                            <Badge color="error" variant="dot">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        {/* User avatar */}
                        {isAuthenticated && (
                            <Avatar 
                                alt={user.email} 
                                src={user.avatarUrl} 
                                sx={{ marginLeft: 2 }}
                            />
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250}} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    {/* Drawer navigation links */}
                    {isAuthenticated ? (
                        <>
                            <Button fullWidth component={Link} to="/dashboard">Dashboard</Button>
                            <Button fullWidth component={Link} to="/transactions">Transactions</Button>
                            <Button fullWidth component={Link} to="/settings">Settings</Button>
                        </>
                    ) : (
                        <>
                            <Button fullWidth component={Link} to="/login">Login</Button>
                            <Button fullWidth component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
