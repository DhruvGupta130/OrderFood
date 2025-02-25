import React, { useState } from 'react';
import {Chip, IconButton, LinearProgress} from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../State/Cart/Action';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdateCartItem = async (change) => {
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) {
            await handleRemoveCartItem();
        } else {
            const data = { itemId: item.id, quantity: newQuantity };
            const reqData = { data, token };
            setLoading(true);
            setError(null);
            try {
                await dispatch(updateCartItem(reqData));
            } catch (err) {
                console.error("Failed to update cart item", err);
                setError("Failed to update item quantity. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveCartItem = async () => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(removeCartItem({ cartItemId: item.id, token }));
        } catch (err) {
            console.error("Failed to remove cart item", err);
            setError("Failed to remove item from cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='px-5'>
            {loading && <p className='text-blue-500 text-center mb-2'><LinearProgress/></p>}
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src={item.food?.images[0]} alt={item.food?.name} />
                </div>
                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>{item.food?.name}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-1">
                                <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={loading}>
                                    <RemoveCircleOutline />
                                </IconButton>
                                <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)} disabled={loading}>
                                    <AddCircleOutline />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>₹{item.totalPrice}</p>
                </div>
            </div>
            <div className="pt-3">
                {item.ingredients.map((ingredient) => (
                    <Chip key={ingredient.id} label={ingredient.name} className='mt-3 mr-2' />
                ))}
            </div>
        </div>
    );
};

export default CartItem;
