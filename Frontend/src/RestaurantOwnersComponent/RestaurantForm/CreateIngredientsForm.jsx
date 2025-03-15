import { Button, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from '../../component/State/Ingredients/Action';

export const CreateIngredientsForm = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const {ingredients} = useSelector(store=>store);
    const [formData, setFormData] = useState({name:"", categoryId:""})
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const data={
            name: formData.name,
            categoryId: formData.categoryId
        };
        try{
           await dispatch(createIngredient({data, token}));
            onSuccess(); // Call onSuccess callback to notify parent
        }catch (error) {
            console.error("Error creating category:", error);
        }
    }
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData, [name]: value
        })
    }
  return (
    <div>
        <div>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>
            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs:12}}>
                        <TextField fullWidth required
                        id='name'
                        name='name'
                        label='Ingredient'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                        />
                    </Grid2>
                    <Grid2 size={{xs:12}}>
                        <FormControl fullWidth required>
                            <InputLabel>Category</InputLabel>
                            <Select
                            name='categoryId'
                            value={formData.categoryId}
                            label="Category"
                            onChange={handleInputChange}
                            >
                            {ingredients.category.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
                            </Select>
                    </FormControl>
                    </Grid2>
                </Grid2>
                <div className='mt-4'>
                <Button variant='contained' type='submit'>Create Ingredient</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
