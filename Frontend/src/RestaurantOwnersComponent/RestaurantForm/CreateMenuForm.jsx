import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Button, Chip, CircularProgress, FormControl, Grid2, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { uploadImageToCloud } from '../Utils/UploadToCloud';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../component/State/Menu/Action';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  description: '',
  price: '',
  categoryId: "",
  vegetarian: "",
  seasonal: "",
  ingredientIds: [],
  images: []
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
};

export const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { restaurant, ingredients } = useSelector(store => store);
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      navigate("/admin/restaurant/menu");
      dispatch(createMenuItem({ menu: values, token: token }));
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloud(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const UploadedImages = [...formik.values.images];
    UploadedImages.splice(index, 1);
    formik.setFieldValue("images", UploadedImages);
  };

  useEffect(() => {
    dispatch(getIngredientsOfRestaurant(token));
  }, [dispatch, token]);

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Menu
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid2 container spacing={2}>
            <Grid2 className='flex flex-wrap gap-5' size={{ xs: 12 }}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleImageChange}
                type='file'
              />
              <label htmlFor="fileInput" className='relative'>
                <span className='w-36 h-32 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternate className='text-white' />
                </span>
                {uploadImage && (
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-36 h-32 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className='flex flex-wrap gap-2'>
                {formik.values.images.map((image, index) => (
                  <div key={index} className='relative'>
                    <img className='w-36 h-32 object-cover' src={image} alt="" />
                    <IconButton size='small' sx={{ position: 'absolute', top: 0, right: 0, outline: "none" }} onClick={() => handleRemoveImage(index)}>
                      <Close sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 7 }}>
              <TextField
                fullWidth
                required
                id='name'
                name='name'
                label='Name'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 2 }}>
              <TextField
                fullWidth
                required
                id='price'
                name='price'
                label='Price'
                type='number'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 3 }}>
              <FormControl fullWidth required>
                <InputLabel>Food Category</InputLabel>
                <Select
                  name='categoryId'
                  id="demo-simple-select"
                  value={formik.values.categoryId}
                  label="Food Category"
                  onChange={formik.handleChange}
                >
                  {restaurant.categories?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                id='description'
                name='description'
                label='Description'
                variant='outlined'
                multiline
                rows={3}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 7 }}>
              <FormControl fullWidth>
                <InputLabel>Ingredients</InputLabel>
                <Select
                  name='ingredientIds'
                  id="demo-multiple-chip"
                  multiple
                  value={formik.values.ingredientIds}
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                  renderValue={(selected) => (
                    <div className='flex flex-wrap gap-1'>
                      {selected.map((value) => {
                        const ingredient = ingredients.ingredients.find(item => item.id === value);
                        return ingredient ? (
                          <Chip key={value} label={ingredient.name} />
                        ) : null;
                      })}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {ingredients.ingredients?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 2.5 }}>
              <FormControl fullWidth required>
                <InputLabel>Is Vegetarian</InputLabel>
                <Select
                  name='vegetarian'
                  value={formik.values.vegetarian}
                  label="Is Vegetarian"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 2.5 }}>
              <FormControl fullWidth required>
                <InputLabel>Is Seasonal</InputLabel>
                <Select
                  name='seasonal'
                  value={formik.values.seasonal}
                  label="Is Seasonal"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="true">Yes</MenuItem>
                  <MenuItem value="false">No</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>

          <div className='pt-2'>
            <Button variant='contained' color='primary' type='submit'>Create Menu</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
