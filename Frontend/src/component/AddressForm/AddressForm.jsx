import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { createAddress, updateAddress, deleteAddress, getUser } from '../State/Authentication/Action';

export const initialValues = {
    type: 'Home',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
};

const AddressForm = ({ currentAddress, handleClose }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const handleSubmit = (values) => {
        const action = currentAddress
            ? updateAddress({ id: currentAddress.id, address: values, token })
            : createAddress({ address: values, token });

        dispatch(action).then(() => {
            dispatch(getUser(token)).then(() => {
                handleClose();
            });
        });
    };

    const handleDelete = () => {
        if (currentAddress) {
            dispatch(deleteAddress({ id: currentAddress.id, token })).then(() => {
                dispatch(getUser(token)).then(() => {
                    handleClose();
                });
            });
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
            }}
        >
            <Formik
                initialValues={currentAddress || initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        name="type"
                                        value={values.type}
                                        onChange={handleChange}
                                        label="Type"
                                    >
                                        <MenuItem value="Home">Home</MenuItem>
                                        <MenuItem value="Work">Work</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    as={TextField}
                                    name='street'
                                    label='Street Address'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    as={TextField}
                                    name='city'
                                    label='City'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    as={TextField}
                                    name='state'
                                    label='State'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    as={TextField}
                                    name='zip'
                                    label='ZIP'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    as={TextField}
                                    name='country'
                                    label='Country'
                                    fullWidth
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant='contained' type='submit' color='primary'>
                                    {currentAddress ? 'Update Address' : 'Add Address'}
                                </Button>
                            </Grid>
                            {currentAddress && (
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='secondary'
                                        onClick={handleDelete}
                                    >
                                        Delete Address
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddressForm;
