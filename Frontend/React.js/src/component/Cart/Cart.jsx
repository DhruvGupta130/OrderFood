import React, { useEffect, useState } from 'react';
import {Divider, Modal, Button, Card, Snackbar, Alert, LinearProgress} from '@mui/material';
import { AddLocationAlt } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';
import { clearCart, getCart } from '../State/Cart/Action';
import AddressCard from './AddressCard';
import CartItem from './CartItem';
import AddressForm from '../AddressForm/AddressForm';
import { useNavigate } from 'react-router-dom';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

export const Cart = () => {
    const [open, setOpen] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { cart, auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleClose = () => {
        setOpen(false);
        setCurrentAddress(null);
    };

    const handleOpenAddressModal = (address = null) => {
        setCurrentAddress(address);
        setOpen(true);
    };

    const handleSubmitOrder = async (selectedAddress) => {
        setLoading(true);
        setError(null);
        const orderData = {
            addressId: selectedAddress.id,
            restaurantId: cart.cart.items[0].food?.restaurant.id,
        };

        try {
            const response = await dispatch(createOrder({ token, reqData: orderData }));
            dispatch(clearCart());
            setSnackbar({ open: true, message: 'Order placed successfully!', severity: 'success' });
            navigate('/order-success', { state: { orderDetails: response.data, orderData: orderData }});
        } catch (error) {
            console.error("Error creating order:", error);
            setError("Failed to create order. Please try again.");
            setSnackbar({ open: true, message: 'Failed to create order. Please try again.', severity: 'error' });
        } finally {
            setLoading(false);
        }

        handleClose();
    };

    useEffect(() => {
        if (token) {
            dispatch(getCart(token));
        }
    }, [dispatch, token]);

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            {loading && <p className='text-center text-blue-500'><LinearProgress/>Processing your order...</p>}
            {error && <p className='text-center text-red-500'>{error}</p>}
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30%] space-y-6 lg:min-h-screen p-6'>
                    {cart.cart?.items.map(item => <CartItem key={item.id} item={item} />)}
                    <Divider />
                    {cart.cart?.total ? <div className='billdetails ps-5 text-sm'>
                            <p className='font-extralight py-5 text-center text-lg'>Bill Details</p>
                            <div className='space-y-3'>
                                <div className='flex justify-between text-gray-400'>
                                    <p>Item Total</p>
                                    <p>₹{cart.cart?.total}</p>
                                </div>
                                <div className='flex justify-between text-gray-400'>
                                    <p>Delivery Fee</p>
                                    <p>₹59</p>
                                </div>
                                <div className='flex justify-between text-gray-400'>
                                    <p>Platform Fee</p>
                                    <p>₹{(cart.cart?.total / 100).toFixed(2)}</p>
                                </div>
                                <Divider />
                                <div className='flex justify-between text-gray-400'>
                                    <p>Total Pay</p>
                                    <p>₹{(cart.cart?.total + 59 + (cart.cart?.total / 100)).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        : <div className='flex justify-center text-gray-400'>
                            <p>Cart is Empty</p>
                        </div>
                    }
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>
                            Choose Delivery Address
                        </h1>
                        <div className="flex gap-5 flex-wrap justify-center">
                            {auth.user?.addresses.map(item => (
                                <AddressCard
                                    key={item.id}
                                    handleSelectAddress={() => handleSubmitOrder(item)}
                                    item={item}
                                    showButton={true}
                                    handleEditAddress={() => handleOpenAddressModal(item)}
                                />
                            ))}
                            <Card className='flex gap-5 w-64 p-5'>
                                <AddLocationAlt />
                                <div className="space-y-3 text-gray-500">
                                    <h1 className='font-semibold text-lg text-white'>Add New Address</h1>
                                    <Button variant='outlined' fullWidth onClick={() => handleOpenAddressModal()}>
                                        Add
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddressForm currentAddress={currentAddress} handleClose={handleClose} />
            </Modal>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};