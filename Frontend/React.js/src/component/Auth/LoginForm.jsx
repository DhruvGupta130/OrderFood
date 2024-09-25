import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../State/Authentication/Action';

export const LoginForm = () => {
    const navigate = useNavigate();
    const initials = {
        username: "",
        password: ""
    };

    const dispatch = useDispatch();
    const { isLoading, error, success } = useSelector(state => state.auth);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }));
    };

    useEffect(() => {
        if (error) {
            setOpenSnackbar(true);
            const timer = setTimeout(() => {
                dispatch({ type: 'CLEAR_ERROR' });
                setOpenSnackbar(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <div>
            <Typography variant='h5' className='text-center' gutterBottom>
                Login
            </Typography>

            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity="error" 
                    sx={{ 
                        width: '100%', 
                        fontSize: '1rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        whiteSpace: 'nowrap' ,
                        color: '#fff'
                    }}
                >
                    {error?.message || error}
                </Alert>
            </Snackbar>

            <Formik initialValues={initials} onSubmit={handleSubmit}>
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field 
                            as={TextField}
                            type="email"
                            name="username"
                            label="Email"
                            fullWidth
                            variant="outlined" 
                            margin="normal"
                        />
                        <Field 
                            as={TextField}
                            type="password"
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined" 
                            margin="normal"
                        />
                        <Button 
                            sx={{ mt: 2, padding: "1rem" }} 
                            fullWidth 
                            type='submit' 
                            variant='contained'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                )}
            </Formik>

            {success && (
                <Typography color="primary" variant="body2" align="center">
                    {success}
                </Typography>
            )}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account? 
                <Button onClick={() => navigate('/account/register')} color="primary">Register</Button>
            </Typography>
        </div>
    );
};
