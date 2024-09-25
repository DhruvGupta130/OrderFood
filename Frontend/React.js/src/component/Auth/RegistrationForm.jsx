import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const initials = {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    };

    const dispatch = useDispatch();
    const { error, success } = useSelector(state => state.auth);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (values) => {
        dispatch(registerUser({ userData: values, navigate }));
    };

    useEffect(() => {
        if (error) {
            setOpenSnackbar(true);
        }
    }, [error]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <div>
            <Typography variant='h5' className='text-center' gutterBottom>
                Register
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
                    sx={{ width: '100%', fontSize: '1rem', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
                >
                    {error?.message || error}
                </Alert>
            </Snackbar>

            <Formik initialValues={initials} onSubmit={handleSubmit}>
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field 
                            as={TextField}
                            name="fullName"
                            label="Name"
                            fullWidth
                            variant="outlined" 
                            margin="normal"
                        />
                        <Field 
                            as={TextField}
                            type="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined" 
                            margin="normal"
                        />
                        <Field 
                            as={TextField}
                            type="number"
                            name="phone"
                            label="Mobile"
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
                        <FormControl fullWidth margin='normal'>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Field
                                as={Select}
                                labelId="role-label"
                                id="role-select"
                                name="role"
                                label="Role"
                            >
                                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                            </Field>
                        </FormControl>
                        <Button 
                            sx={{ mt: 2, padding: "1rem" }} 
                            fullWidth 
                            type='submit' 
                            variant='contained'
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography>
                Already have an account?
                <Button onClick={() => navigate('/account/login')}>Login</Button>
            </Typography>
        </div>
    );
};
