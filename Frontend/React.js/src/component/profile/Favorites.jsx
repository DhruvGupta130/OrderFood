import React from 'react';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';

const Favorites = () => {
  const { auth, loading, error } = useSelector(store => store);

  if (loading) {
    return (
        <div className='flex justify-center items-center min-h-screen'>
          <CircularProgress />
        </div>
    );
  }

  if (error) {
    return (
        <div className='flex justify-center items-center min-h-screen text-red-500'>
          <Typography variant='h6'>{error.message || 'Failed to load favorites. Please try again later.'}</Typography>
        </div>
    );
  }

  return (
      <div>
        {auth.favorites.length > 0 ? (
            <div>
              <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
              <div className='flex flex-wrap gap-3 justify-center'>
                {auth.favorites.map(item => (
                    <RestaurantCard key={item.id} item={item} />
                ))}
              </div>
            </div>
        ) : (
            <div className='flex flex-wrap gap-3 justify-center text-gray-400'>
              <Typography variant='h6'>My favorites is empty</Typography>
            </div>
        )}
      </div>
  );
};

export default Favorites;
