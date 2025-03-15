import { Box, CircularProgress, Modal, Typography, ListItemText, IconButton, Avatar, Card, CardContent, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CreateEventForm } from '../RestaurantForm/CreateEventForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByUserId, getRestaurantEvents, deleteEvents, getAllEvents } from './../../component/State/Restaurant/Action';
import { Add, Delete } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh', // Limits height to 80% of viewport height
  overflowY: 'auto', // Enables vertical scrolling when content overflows
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const Events = () => {
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector(store => store);
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(store => store.restaurant);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getRestaurantByUserId(token));
    dispatch(getRestaurantEvents({ restaurantId: restaurant?.usersRestaurant?.id, token }));
  }, [dispatch, token, restaurant?.usersRestaurant?.id]);

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvents({ eventId, token }))
        .then(() => {
          // Fetch updated events after deletion
          dispatch(getRestaurantEvents({ restaurantId: restaurant?.usersRestaurant?.id, token }));
          setSnackbarMessage('Event deleted successfully');
          setSnackbarOpen(true);
        })
        .catch(() => {
          setSnackbarMessage('Failed to delete event');
          setSnackbarOpen(true);
        });
    }
  };

  const handleFormSubmitSuccess = () => {
    handleClose(); // Close the modal on successful form submission
    dispatch(getAllEvents({token})); // Refresh the ingredients
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className='px-10 py-5'>
      <div className='flex justify-between items-center mb-4'>
        <Typography variant="h4">Created Events</Typography>
        <IconButton onClick={handleOpen} color="primary">
          <Add fontSize="large" />
        </IconButton>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateEventForm onSuccess={handleFormSubmitSuccess} />
        </Box>
      </Modal>

      {loading ? (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress />
          </div>
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {events && events.length > 0 ? (
            events.map(event => (
              <Card key={event.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 2, boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  {event.image_url && (
                    <Avatar src={event.image_url} alt={event.name} variant="rounded" sx={{ width: 60, height: 60, marginRight: 2 }} />
                  )}
                  <ListItemText
                    primary={event.name}
                    secondary={
                      <>
                        <Typography variant="body2">{`Location: ${event.eventLocation}`}</Typography>
                        <Typography variant="body2">{`Start: ${event.startDate}`}</Typography>
                        <Typography variant="body2">{`End: ${event.endDate}`}</Typography>
                      </>
                    }
                  />
                </CardContent>
                <IconButton onClick={() => handleDelete(event.id)} color="primary">
                  <Delete />
                </IconButton>
              </Card>
            ))
          ) : (
            <Typography className='text-gray-400'>No events created yet.</Typography>
          )}
        </div>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
