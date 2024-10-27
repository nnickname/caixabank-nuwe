import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { login } from '../../../models/user/user.store';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (data) => {
        const { email, password, confirmPassword } = data;

        // Check for blank values
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('All fields are required');
            return;
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check if the email is already registered in localStorage
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (existingUsers.some(user => user.email === email)) {
            setError('Email is already registered');
            return;
        }

        // Save the new user's data to localStorage
        existingUsers.push({ email, password, isAuthenticated: true });
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Automatically log the user in after successful registration
        login({ email, password });
        setSuccess(true);
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit(handleRegister)}>
                <TextField
                    {...register("email", {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message?.toString()}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: errors.email ? 'red' : undefined,
                            },
                        },
                    }}
                />

                <TextField
                    {...register("password", {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                        },
                    })}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message?.toString()}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: errors.password ? 'red' : undefined,
                            },
                        },
                    }}
                />

                <TextField
                    {...register("confirmPassword", {
                        required: 'Confirm Password is required',
                        validate: (value) => value === getValues('password') || 'Passwords do not match',
                    })}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message?.toString()}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: errors.confirmPassword ? 'red' : undefined,
                            },
                        },
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Account created successfully! Redirecting to login...
                </Alert>
            )}
        </Box>
    );
}

export default RegisterPage;
