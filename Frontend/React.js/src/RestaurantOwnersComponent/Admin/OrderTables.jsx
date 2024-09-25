// OrderTables.js
import {
    Avatar,
    AvatarGroup,
    Box,
    Card,
    CardHeader,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantOrders, updateOrderStatus } from '../../component/State/RestaurantOrder/Action';
import { CheckCircle, HourglassEmpty, LocalShipping, Cancel } from '@mui/icons-material';

const orderStatusOrder = ['PENDING', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];

const getStatusProps = (status) => {
    switch (status) {
        case 'PENDING':
            return { color: 'warning', icon: <HourglassEmpty />, label: 'Pending' };
        case 'PROCESSING':
            return { color: 'info', icon: <LocalShipping />, label: 'Processing' };
        case 'OUT_FOR_DELIVERY':
            return { color: 'primary', icon: <LocalShipping />, label: 'Out For Del.' }; 
        case 'DELIVERED':
            return { color: 'success', icon: <CheckCircle />, label: 'Delivered' };
        case 'CANCELLED':
            return { color: 'error', icon: <Cancel />, label: 'Cancelled' };
        default:
            return { color: 'default', label: status };
    }
};

export const OrderTables = ({ filterValue }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { orders } = useSelector(state => state.restaurantOrder);
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        dispatch(getRestaurantOrders(token, ""));
    }, [dispatch, token]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        setLoading(true);
        try {
            await dispatch(updateOrderStatus({ orderId, orderStatus: newStatus, token }));
            setSnackbarMessage('Order status updated successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Error updating order status.');
            setSnackbarSeverity('error');
        } finally {
            setLoading(false);
            setOpenSnackbar(true);
        }
    };

    // Filter orders based on selected status
    const filteredOrders = filterValue === 'ALL' || !filterValue
        ? orders
        : orders.filter(order => order.orderStatus === filterValue);

    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader 
                    title={"All Orders"}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Images</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Ingredients</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders?.length > 0 ? (
                                filteredOrders.map((item) => {
                                    const allIngredients = item.items.flatMap(orderItem => orderItem.ingredients);
                                    const hasIngredients = allIngredients.length > 0;
                                    const orderItemNames = item.items.map(orderItem => orderItem.food?.name).join(', ');
                                    const { color, icon, label } = getStatusProps(item.orderStatus);

                                    // Determine if status update is allowed
                                    const isStatusUpdatable = !['CANCELLED', 'DELIVERED'].includes(item.orderStatus);

                                    return (
                                        <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{item.id}</TableCell>
                                            <TableCell align="right">
                                                <AvatarGroup>
                                                    {item.items?.map(orderItem => (
                                                        <Avatar key={orderItem.id} src={orderItem.food?.images[0]} />
                                                    ))}
                                                </AvatarGroup>
                                            </TableCell>
                                            <TableCell align="right">{item.customer?.fullName}</TableCell>
                                            <TableCell align="right">{item.totalPrice}</TableCell>
                                            <TableCell align="right">{orderItemNames}</TableCell>
                                            <TableCell align="right">
                                                {hasIngredients ? (
                                                    allIngredients.map(ingredient => (
                                                        <Chip sx={{ margin: "0.15em" }} key={ingredient.id} label={ingredient.name} />
                                                    ))
                                                ) : (
                                                    <Chip label="No ingredients" color="default" />
                                                )}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={label}
                                                    color={color}
                                                    icon={icon}
                                                    sx={{ display: 'flex', alignItems: 'center' }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormControl variant="outlined" size="small" fullWidth>
                                                    <InputLabel id={`status-label-${item.id}`}>Update Status</InputLabel>
                                                    <Select
                                                        labelId={`status-label-${item.id}`}
                                                        label="Update Status"
                                                        value={item.orderStatus} // Display the current status
                                                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                                                        disabled={!isStatusUpdatable || loading}
                                                    >
                                                        {isStatusUpdatable && orderStatusOrder.slice(orderStatusOrder.indexOf(item.orderStatus) + 1).map((status) => {
                                                            const shortStatus = status === 'OUT_FOR_DELIVERY' ? 'OUT FOR DEL.' : status; // Capitalized abbreviation
                                                            return (
                                                                <MenuItem key={status} value={status}>
                                                                    {shortStatus}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                        <MenuItem value={item.orderStatus} disabled>
                                                            {item.orderStatus === 'OUT_FOR_DELIVERY' ? 'OUT FOR DEL.' : item.orderStatus}
                                                        </MenuItem>
                                                    </Select>
                                                    {loading && <CircularProgress size={24} sx={{ position: 'absolute', right: 16, top: 16 }} />}
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">No orders available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};
