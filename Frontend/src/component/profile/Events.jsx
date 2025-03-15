import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './EventCard';
import { getAllEvents } from './../../component/State/Restaurant/Action';
import { CircularProgress, Typography, Box } from '@mui/material';

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector(store => store.restaurant); // Assuming you have an events state in your Redux store

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getAllEvents({ token }));
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    ); // Centered loading spinner
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error.message || 'Failed to load events. Please try again later.'}
      </Typography>
    ); // Error handling
  }

  return (
    <Box className="mt-5 px-5">
      <Typography variant="h4" align="center" gutterBottom>
        Upcoming Events
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {events && events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" align="center">
            No events found.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Events;
