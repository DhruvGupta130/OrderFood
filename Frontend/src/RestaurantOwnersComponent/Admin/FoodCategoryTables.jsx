import { Create } from '@mui/icons-material';
import {
    Box,
    Card,
    CardHeader,
    CircularProgress,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CreateFoodCategoryForm } from '../RestaurantForm/CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const FoodCategoryTables = () => {
    const { restaurant } = useSelector(store => store);
    const { loading } = restaurant;
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmitSuccess = () => {
        handleClose(); // Close the modal on successful form submission
        dispatch(getRestaurantsCategory({ token, id: restaurant.usersRestaurant?.id })); // Refresh the categories
    };

    useEffect(() => {
        dispatch(getRestaurantsCategory({ token, id: restaurant.usersRestaurant?.id }));
    }, [dispatch, token, restaurant.usersRestaurant?.id]);

    if(loading)
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress/>
        </div>

    return (
        <Box>
            <Card elevation={3} sx={{ mt: 2, borderRadius: 2, padding: 2 }}>
                <CardHeader 
                    action={
                        <IconButton onClick={handleOpen} aria-label='add category'>
                            <Create />
                        </IconButton>
                    }
                    title={<Typography variant="h5" sx={{ fontWeight: 'bold', textAlign:"center" }}>Food Categories</Typography>}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="food category table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.categories?.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-food-category-modal-title"
                aria-describedby="create-food-category-modal-description"
            >
                <Box sx={modalStyle}>
                    <CreateFoodCategoryForm onSuccess={handleFormSubmitSuccess} />
                </Box>
            </Modal>
        </Box>
    );
};
