import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, FormGroup, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { AddItemCart } from './../State/Cart/Action';

const getUniqueCategories = (ingredients) => {
    return [...new Set(ingredients.map(ingredient => ingredient.category.name))];
};

const MenuCard = (items) => {
    const dispatch = useDispatch();
    const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const categories = getUniqueCategories(items.items?.ingredients);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const reqData = {
            token: localStorage.getItem("token"),
            cartItem: {
                foodId: items.items?.id,
                quantity: 1,
                ingredientIds: selectedIngredientIds
            }
        };

        try {
            await dispatch(AddItemCart(reqData));
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to add item to cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckBox = (itemId) => {
        setSelectedIngredientIds(prevIds =>
            prevIds.includes(itemId)
                ? prevIds.filter(id => id !== itemId)
                : [...prevIds, itemId]
        );
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className="lg:flex items-center justify-between">
                        <div className='lg:flex items-center lg:gap-5'>
                            <img className='w-[7rem] h-[7rem] object-cover' src={items.items?.images[0]} alt={items.items?.name} />
                            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                                <p className='font-semibold text-xl'>{items.items?.name}</p>
                                <p>{items.items?.price}</p>
                                <p className='text-gray-400'>{items.items?.description}</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleAddToCart}>
                        <div className='flex gap-5 flex-wrap'>
                            {categories.map(category => (
                                <div key={category}>
                                    <p>{category}</p>
                                    <FormGroup>
                                        {items.items?.ingredients.filter(ingredient => ingredient.category.name === category).map(item => (
                                            <FormControlLabel key={item.id} control={<Checkbox onChange={() => handleCheckBox(item.id)} />} label={item.name} />
                                        ))}
                                    </FormGroup>
                                </div>
                            ))}
                        </div>
                        <div className='pt-5'>
                            <Button variant='contained' type='submit' disabled={!items.items?.available || loading}>
                                {loading ? 'Adding...' : items.items?.available ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Item added to cart successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default MenuCard;