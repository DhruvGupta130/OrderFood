import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CreateIngredientsCategoryForm } from '../RestaurantForm/CreateIngredientsCategoryForm';
import { Create } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategory } from '../../component/State/Ingredients/Action';

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

export const IngredientCategoryTables = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const { ingredients } = useSelector(store => store);
    const token = localStorage.getItem("token");

    useEffect(() => {
        dispatch(getIngredientCategory(token));
    }, [dispatch, token]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFormSubmitSuccess = () => {
        handleClose(); // Close the modal on successful form submission
        dispatch(getIngredientCategory(token)); // Refresh the ingredient categories
    };

    return (
        <Box>
            <Card elevation={3} sx={{ mt: 2, borderRadius: 2, padding: 2 }}>
                <CardHeader 
                    action={
                        <IconButton onClick={handleOpen} aria-label='add category'>
                            <Create />
                        </IconButton>
                    }
                    title={<Typography variant="h5" sx={{ fontWeight: 'bold', textAlign:"center" }}>Ingredient Categories</Typography>}
                    sx={{ pt: 2, alignItems: "center" }}
                />
                <TableContainer component={Paper}>
                    <Table aria-label="ingredient category table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell align="left" sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.category.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
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
                aria-labelledby="create-category-modal-title"
                aria-describedby="create-category-modal-description"
            >
                <Box sx={modalStyle}>
                    <CreateIngredientsCategoryForm onSuccess={handleFormSubmitSuccess} />
                </Box>
            </Modal>
        </Box>
    );
};
