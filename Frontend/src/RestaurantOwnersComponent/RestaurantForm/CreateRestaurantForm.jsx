import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Button, CircularProgress, Grid2, IconButton, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { uploadImageToCloud } from '../Utils/UploadToCloud';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../component/State/Restaurant/Action';

const initialValues = {
  name: '',
  description: '',
  cuisineType: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  email: '',
  phone: '',
  twitterId: '',
  instagramId: '',
  facebookId: '',
  openingHours: 'Moon-Sun: 09:00 AM - 12:00 PM',
  images: []
};

export const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [uploadImage, setUploadImage] = useState(false);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country
        },
        contactInfo: {
          email: values.email,
          phone: values.phone,
          twitterId: values.twitterId,
          instagramId: values.instagramId,
          facebookId: values.facebookId,
        },
        openingHours: values.openingHours,
        images: values.images
      };
      dispatch(createRestaurant({data:data, token:token}));
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloud(file);
    formik.setFieldValue("images",[...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const UploadedImages = [...formik.values.images];
    UploadedImages.splice(index, 1);
    formik.setFieldValue("images", UploadedImages);
  };

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid2 container spacing={2}>
            {/* Image Upload Section */}
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

            {/* Restaurant Information Section */}
            <Grid2 size={{ xs: 12, lg: 8 }}>
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
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                required
                id='cuisineType'
                name='cuisineType'
                label='Cuisine Type'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
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
                rows={5}
                slotProps={{
                  input: {
                    maxLength: 500 // Set character limit
                  }
                }}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              <Typography variant="body2" color="textSecondary">
                {formik.values.description.length}/500 characters
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 5 }}>
              <TextField
                fullWidth
                required
                id='email'
                name='email'
                label='Email'
                type='email'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 3 }}>
              <TextField
                fullWidth
                required
                id='phone'
                name='phone'
                label='Mobile'
                type='number'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                required
                id='openingHours'
                name='openingHours'
                label='Opening Hours'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid2>
          </Grid2>

          {/* Address Section */}
          <div className='text-gray-400 text-xl py-2'>Address</div>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, lg: 8 }}>
              <TextField
                fullWidth
                required
                id='street'
                name='street'
                label='Street/ Road/ Locality'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.street}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                required
                id='city'
                name='city'
                label='City'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                required
                id='state'
                name='state'
                label='State'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.state}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                required
                id='zip'
                name='zip'
                label='Postal Code'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.zip}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                required
                id='country'
                name='country'
                label='Country'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid2>
          </Grid2>

          {/* Social Media Section */}
          <div className='text-gray-400 text-xl py-2'>Social Media</div>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id='instagramId'
                name='instagramId'
                label='InstagramId'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.instagramId}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id='twitterId'
                name='twitterId'
                label='TwitterId'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.twitterId}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <TextField
                fullWidth
                id='facebookId'
                name='facebookId'
                label='FacebookId'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.facebookId}
              />
            </Grid2>
          </Grid2>

          <div className='pt-2'>
            <Button variant='contained' color='primary' type='submit'>Create Restaurant</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
