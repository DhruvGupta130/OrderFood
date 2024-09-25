import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, IconButton, TextField, Grid2, Snackbar } from '@mui/material';
import { uploadImageToCloud } from './../Utils/UploadToCloud';
import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction, getRestaurantByUserId, getRestaurantEvents } from './../../component/State/Restaurant/Action';

export const CreateEventForm = ({onSuccess}) => {
  const [uploadImage, setUploadImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { restaurant } = useSelector(store => store);
  const [formData, setFormData] = useState({
    image_url: "",
    eventLocation: "",
    name: "",
    startDate: "",
    endDate: ""
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(true);
      try {
        const image = await uploadImageToCloud(file);
        setFormData(prevState => ({
          ...prevState,
          image_url: image
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploadImage(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData(prevState => ({
      ...prevState,
      image_url: ''
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      ...formData,
    };

    try {
      await dispatch(createEventAction({ data: eventData, restaurantId: restaurant?.usersRestaurant?.id, token }));
      setSuccessMessage('Event created successfully!');
      onSuccess();
    } catch (error) {
      setErrorMessage('Failed to create event. Please try again.');
    }
  };

  const handleDateChange = (date, dateType) => {
    if (date) {
      const formattedDate = dayjs(date).format('LLL');
      setFormData(prevState => ({
        ...prevState,
        [dateType]: formattedDate
      }));
    }
  };

  useEffect(() => {
    dispatch(getRestaurantByUserId(token));
    dispatch(getRestaurantEvents({ restaurantId: restaurant?.usersRestaurant?.id, token }));
  }, [dispatch, token, restaurant?.usersRestaurant?.id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={3}>
          <Grid2 item size={{ xs: 12 }} className='flex flex-wrap gap-5'>
            <input
              accept='image/*'
              id='fileInput'
              style={{ display: "none" }}
              onChange={handleImageChange}
              type='file'
            />
            {!formData.image_url && (
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
            )}
            {formData.image_url && (
              <div className='flex flex-wrap gap-2'>
                <div className='relative'>
                  <img className='w-full object-cover' src={formData.image_url} alt="Uploaded" />
                  <IconButton
                    size='small'
                    sx={{ position: 'absolute', top: 0, right: 0, outline: "none" }}
                    onClick={handleRemoveImage}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              </div>
            )}
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              name="name"
              label='Event Name'
              variant='outlined'
              value={formData.name}
              onChange={handleFormChange}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              name="eventLocation"
              label='Event Location'
              variant='outlined'
              value={formData.eventLocation}
              onChange={handleFormChange}
            />
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Start Date and Time"
                onChange={(newValue) => handleDateChange(newValue, "startDate")}
                className='w-full'
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="End Date and Time"
                onChange={(newValue) => handleDateChange(newValue, "endDate")}
                className='w-full'
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 item size={{ xs: 12 }}>
            <Button type='submit' variant='contained'>Create Event</Button>
          </Grid2>
        </Grid2>
      </form>

      <Snackbar
        open={!!successMessage}
        message={successMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessMessage('')}
      />
      <Snackbar
        open={!!errorMessage}
        message={errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
