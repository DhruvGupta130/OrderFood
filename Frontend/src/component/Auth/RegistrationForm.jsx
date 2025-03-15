import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentication/Action';
import { useDispatch, useSelector } from 'react-redux';

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().required('Role is required')
});

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isLoading } = useSelector(state => state.auth);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = (values, { setSubmitting }) => {
        dispatch(registerUser({ userData: values, navigate }));
        setSubmitting(false);
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

    const initials = {
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: ""
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

            <Formik
                initialValues={initials}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            as={TextField}
                            name="fullName"
                            label="Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.fullName && !!errors.fullName}
                            helperText={touched.fullName && errors.fullName}
                        />
                        <Field
                            as={TextField}
                            type="email"
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            type="number"
                            name="phone"
                            label="Mobile"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.phone && !!errors.phone}
                            helperText={touched.phone && errors.phone}
                        />
                        <Field
                            as={TextField}
                            type="password"
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                        />
                        <FormControl fullWidth margin='normal' error={touched.role && !!errors.role}>
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
                            disabled={isSubmitting || isLoading}
                            startIcon={isLoading && <CircularProgress size={24} color="inherit" />}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
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