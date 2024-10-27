import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, Box, Button, Badge, Avatar, useMediaQuery, useTheme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { Link } from 'react-router-dom';
import LogoDarkCaixa from '../../../assets/caixabank-icon.png';
import LogoLightCaixa from '../../../assets/caixabank-icon-blue.png';
// Importar el componente NotificationModal
import NotificationModal from './notification.modal';
import { Transaction } from '../../../models/transactions/transactions.model';

// Define interfaces for props and other types
interface NavLink {
  label: string;
  path: string;
}

interface User {
  email: string;
  avatarUrl?: string;
}


interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  isAuthenticated: boolean;
  user: User;
  transactions: Transaction[];
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode, isAuthenticated, user, transactions }) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    // Agregar estado para controlar la visibilidad del modal de notificaciones
    const [notificationModalOpen, setNotificationModalOpen] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navlinks: NavLink[] = [
        { label: 'Dashboard', path: '/' },
        { label: 'Transactions', path: '/transactions' },
        { label: 'Settings', path: '/setting' },
        { label: 'Logout', path: '/logout' }
    ];
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Función para abrir/cerrar el modal de notificaciones
    const toggleNotificationModal = () => {
        setNotificationModalOpen(!notificationModalOpen);
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
                    <Box sx={{display: 'flex', marginRight: 2 }}>
                        <img 
                            src={isDarkMode ? LogoLightCaixa : LogoDarkCaixa} 
                            alt="CaixaBank Logo" 
                            height="40" 
                        />
                        <Typography variant="h6" sx={{ marginLeft: 0.5, fontWeight: 'bold', fontStyle: 'italic'}}>Caixa Bank</Typography>
                    </Box>

                    {/* Navigation links */}
                    {!isMobile && ( 
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            {isAuthenticated ? (
                                <>
                                    {navlinks.map((item, index) => (
                                        <Button 
                                            key={index}
                                            color="inherit" 
                                            component={Link} 
                                            to={item.path}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/register">Register</Button>
                                </>
                            )}
                        </Box>
                    )}
                    
                    
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton onClick={toggleTheme} color="inherit">
                            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        {isAuthenticated && (
                            <IconButton onClick={toggleNotificationModal}>
                                <Badge color="error" variant="dot">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        )}

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
                            {navlinks.map((item, index) => (
                                <Button key={index} fullWidth component={Link} to={item.path}>
                                    {item.label}
                                </Button>
                            ))}
                        </>
                    ) : (
                        <>
                            <Button fullWidth component={Link} to="/login">Login</Button>
                            <Button fullWidth component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Box>
            </Drawer>

            {/* Add NotificationModal */}
            <NotificationModal
                open={notificationModalOpen}
                onClose={toggleNotificationModal} transactions={transactions}            />
        </>
    );
};

export default Navbar;
