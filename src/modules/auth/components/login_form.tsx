import React, { useState, useEffect } from 'react';
import { authStore, login } from '../../../models/user/user.store';
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@nanostores/react';

function LoginPage() {
    const [error, setError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const auth = useStore(authStore);
    const defaultCredentials = {
        email: 'default@example.com',
        password: 'password123'
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = (data) => {
        const { email, password } = data;
        setError('');

        // Validate that fields are not empty
        if (!email || !password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Validate credentials
        if (email === defaultCredentials.email && password === defaultCredentials.password) {
            login({email, password});
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setError('Credenciales inválidas. Por favor, intente de nuevo.');
        }
    };

    

    const handleForgotPassword = () => {
        setShowCredentials(true);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit(handleLogin)}>
                <TextField
                    label="Email"
                    type="email"
                    {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    fullWidth
                    margin="normal"
                    id="email"
                    error={!!errors.email}
                    helperText={errors.email?.message?.toString()}
                />
                <TextField
                    label="Password"
                    type="password"
                    {...register('password', { required: true })}
                    fullWidth
                    margin="normal"
                    id="password"
                    error={!!errors.password}
                    helperText={errors.password?.message?.toString()}
                />
                <Button
                    id="login"
                    
                    name="login"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>

            {/* Show error message when applicable */}
            {/* - Use the Alert component to display the error message if one exists. */}
            {/* - Ensure that registration and forgot password options are displayed below the error message if present. */}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {showCredentials && (
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Credenciales por defecto:
                        </Typography>
                        <Typography><strong>Email:</strong> {defaultCredentials.email}</Typography>
                        <Typography><strong>Contraseña:</strong> {defaultCredentials.password}</Typography>
                    </CardContent>
                </Card>
            )}

            <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item>
                    <Button variant="text" color="primary" onClick={() => {/* Agregar navegación a la página de registro */}}>
                        Registrarse
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="text" color="primary" onClick={handleForgotPassword}>
                        ¿Olvidó su contraseña?
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LoginPage;
