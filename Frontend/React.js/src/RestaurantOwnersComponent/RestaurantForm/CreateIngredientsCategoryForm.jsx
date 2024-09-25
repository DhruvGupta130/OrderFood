import { Button, Grid2, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createIngredientCategory } from '../../component/State/Ingredients/Action';

export const CreateIngredientsCategoryForm = ({onSuccess}) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({name:""})
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await dispatch((createIngredientCategory({data: formData, token: token})));
            onSuccess();
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
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
            <form onSubmit={handleSubmit}>
                <Grid2 container spacing={2}>
                    <Grid2 size={{xs:12}}>
                        <TextField fullWidth
                        required
                        id='name'
                        name='name'
                        label='Ingredient Category'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                        />
                    </Grid2>
                </Grid2>
                <div className='mt-4'>
                <Button variant='contained' type='submit'>Create Category</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
