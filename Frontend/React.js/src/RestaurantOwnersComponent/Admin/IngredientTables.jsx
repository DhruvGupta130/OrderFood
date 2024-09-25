import { Create } from '@mui/icons-material';
import { Box, Button, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { CreateIngredientsForm } from '../RestaurantForm/CreateIngredientsForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../component/State/Ingredients/Action';

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

export const IngredientTables = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const token = localStorage.getItem("token");
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const { ingredients } = useSelector(store => store);

    const handleFormSubmitSuccess = () => {
        handleClose(); // Close the modal on successful form submission
        dispatch(getIngredientsOfRestaurant(token)); // Refresh the ingredients
    };

    const handleIngredientsStock = (id) => {
        dispatch(updateStockOfIngredient({ id, token }));
    };

    useEffect(() => {
        dispatch(getIngredientsOfRestaurant(token));
    }, [dispatch, token]);

    return (
        <Box>
            <Card elevation={3} sx={{ mt: 2, borderRadius: 2, padding: 2 }}>
                <CardHeader
                    action={
                        <IconButton onClick={handleOpen} aria-label='add ingredient'>
                            <Create />
                        </IconButton>
                    }
                    title={<Typography variant="h5" sx={{ fontWeight: 'bold', textAlign:"center" }}>Ingredients</Typography>}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="ingredient table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Availability</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.ingredients?.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.category.name}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleIngredientsStock(item.id)} color={item.available ? "success" : "error"}>
                                            {item.available ? "In Stock" : "Out of Stock"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="create-ingredient-modal-title"
                aria-describedby="create-ingredient-modal-description"
            >
                <Box sx={modalStyle}>
                    <CreateIngredientsForm onSuccess={handleFormSubmitSuccess} />
                </Box>
            </Modal>
        </Box>
    );
};
