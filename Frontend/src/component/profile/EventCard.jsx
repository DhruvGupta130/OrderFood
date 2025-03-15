import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const EventCard = ({ event }) => {
  // Determine if the event date has passed
  const currentDate = new Date();
  const endDate = new Date(event.endDate);
  const isPastEvent = endDate < currentDate;

  return (
    <Card
      sx={{
        width: 300,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        transition: '0.3s',
        '&:hover': { boxShadow: isPastEvent ? 3 : 6 }, // Prevent hover effect if the event has passed
        display: 'flex',
        flexDirection: 'column',
        cursor: isPastEvent ? 'not-allowed' : 'pointer', // Change cursor based on event date
      }}
    >
      {event.image_url && (
        <Avatar
          src={event.image_url}
          alt={event.name}
          variant="rounded"
          sx={{
            width: '100%',
            height: 140,
            borderRadius: 0,
            objectFit: 'cover', // Ensures the image fits nicely
          }}
        />
      )}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>
            {event.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {event.restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {`Location: ${event.eventLocation}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {`Start: ${event.startDate}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`End: ${event.endDate}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
