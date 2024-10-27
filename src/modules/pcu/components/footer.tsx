import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button, Container, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Search, Phone, Email, LocationOn } from '@mui/icons-material';
import BackgroundImage from '../../../assets/bgmaps.png';

const Footer = () => {
    return (
        <Box 
            component="footer" 
            sx={{
                marginTop: '3rem',
                position: 'relative',
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#000',
                py: 4,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ flex: '1 1 100%', maxWidth: '600px' }}>
                        {/* Search bar */}
                        <Paper component="form" sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
                            <IconButton aria-label="search">
                                <Search />
                            </IconButton>
                            <InputBase 
                                sx={{ ml: 1, flex: 1 }} 
                                placeholder="Find your branch..." 
                            />
                            <Button type="submit" sx={{ p: '10px' }}>Search</Button>
                        </Paper>
                    </Box>
                    <Box sx={{ flex: '1 1 300px' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>Contact Us</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Phone sx={{ mr: 1, color: '#000' }} />
                            <Link href="tel:+34900123456" sx={{ color: '#000' }}>900 123 456</Link>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Email sx={{ mr: 1, color: '#000' }} />
                            <Link href="mailto:info@caixabank.com" sx={{ color: '#000' }}>info@caixabank.com</Link>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ mr: 1, color: '#000' }} />
                            <Typography variant="body2" sx={{ color: '#000' }}>Calle Pintor Sorolla, 2-4, 46002 Valencia</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: '1 1 200px' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>Quick Links</Typography>
                        <Link href="#" sx={{ color: '#000' }} display="block" mb={1}>About Us</Link>
                        <Link href="#" sx={{ color: '#000' }} display="block" mb={1}>Services</Link>
                        <Link href="#" sx={{ color: '#000' }} display="block" mb={1}>FAQs</Link>
                        <Link href="#" sx={{ color: '#000' }} display="block">Privacy Policy</Link>
                    </Box>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    {/* Social media icons */}
                    <IconButton aria-label="Facebook" color="inherit" href="https://facebook.com">
                        <Facebook />
                    </IconButton>
                    <IconButton aria-label="Twitter" color="inherit" href="https://twitter.com">
                        <Twitter />
                    </IconButton>
                    <IconButton aria-label="Instagram" color="inherit" href="https://instagram.com">
                        <Instagram />
                    </IconButton>
                </Box>
                
                <Typography variant="body2" align="center" sx={{ mt: 2, color: '#000' }}>
                    © {new Date().getFullYear()} CaixaBank - Personal Finance Assistant
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
