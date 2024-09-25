import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/Action';

export const CreateFoodCategoryForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ categoryName: "" });
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const data = {
            name: formData.categoryName,
            restaurantId: { id: 1 }
        };

        try {
            await dispatch(createCategoryAction({ reqData: data, token }));
            onSuccess(); // Call onSuccess callback to notify parent
        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <TextField 
                    fullWidth
                    id='categoryName'
                    name='categoryName'
                    label='Category Name'
                    variant='outlined'
                    onChange={handleInputChange}
                    value={formData.categoryName}
                />
                <div className='mt-4'>
                    <Button variant='contained' type='submit'>Create Category</Button>
                </div>
            </form>
        </div>
    );
};
