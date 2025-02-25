import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;
    const orderData = location.state?.orderData;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!orderDetails || !orderData) {
            setError('Failed to load order details. Please try again.');
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [orderDetails, orderData]);

    if (loading) {
        return <Typography variant="h6" align="center" sx={{ mt: 8 }}>Loading order details...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" align="center" sx={{ mt: 8, color: 'red' }}>{error}</Typography>;
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
            <Typography variant="h4" component="h1" gutterBottom>
                Order Placed Successfully!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Thank you for your order! Your order has been successfully placed and is being processed.
            </Typography>
            {orderDetails && (
                <Box sx={{ mt: 4, textAlign: 'left' }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Order Details:
                    </Typography>
                    <Typography variant="body2">
                        <strong>Order ID: </strong> {orderDetails?.id}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Address: </strong>{orderDetails.customer.addresses.map((address) => address.id === orderData?.addressId ? `${address.street}, ${address.city}, ${address.state}-${address.zip}, ${address.country}` : "")}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Restaurant: </strong> {orderDetails?.items.map((item) => item.food.restaurant.id === orderData?.restaurantId ? item.food.restaurant.name : "")}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Total Amount: </strong> ₹{orderDetails?.totalPrice}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Current Order Status: </strong> {orderDetails?.orderStatus}
                    </Typography>
                </Box>
            )}
            <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => window.location.href = '/'}>
                Back to Home
            </Button>
        </Container>
    );
};

export default OrderSuccess;
