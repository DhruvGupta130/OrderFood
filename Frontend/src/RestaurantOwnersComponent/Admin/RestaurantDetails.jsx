import { ArrowDownwardRounded, ArrowUpwardRounded, Email, Facebook, Instagram, Phone, Twitter } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Collapse,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants, getRestaurantByUserId, updateRestaurantStatus } from '../../component/State/Restaurant/Action';

export const RestaurantDetails = () => {
  const { restaurant } = useSelector(store => store);
  const { loading } = restaurant;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const handleRestaurantStatus = async () => {
    setLoading(true);
    await dispatch(updateRestaurantStatus(token));
    await dispatch(getRestaurantByUserId(token));
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getRestaurantByUserId(token));
    dispatch(getAllRestaurants());
  }, [dispatch, token]);

  if(loading)
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress/>
    </div>

  return (
    <Box className='px-2 sm:px-3'>
      <Card elevation={3} sx={{ mt: 1, borderRadius: 2, padding: 2 }}>
        <CardHeader
          title={<Typography variant="h5" align="center" sx={{ fontWeight: 'bold' }}>{restaurant.usersRestaurant?.name}</Typography>}
          action={
            <Button
              color={restaurant.usersRestaurant?.active ? 'error' : 'success'}
              variant='contained'
              onClick={handleRestaurantStatus}
              size='large'
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : restaurant.usersRestaurant?.active ? 'Close' : 'Open'}
            </Button>
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={<span className='text-gray-300'>Restaurant Details</span>}
              />
              <CardContent>
                <div className='space-y-2 text-gray-200'>
                  {[
                    { label: 'Owner', value: restaurant.usersRestaurant?.owner.fullName },
                    { label: 'Cuisine Type', value: restaurant.usersRestaurant?.cuisineType },
                    { label: 'Opening Hours', value: restaurant.usersRestaurant?.openingHours },
                    { 
                      label: 'Status', 
                      value: restaurant.usersRestaurant?.active ? (
                        <span className='px-2 py-1 rounded-full bg-green-400 text-gray-950'>Opened</span>
                      ) : (
                        <span className='px-2 py-1 rounded-full bg-red-400 text-gray-50'>Closed</span>
                      )
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col sm:flex-row sm:items-center">
                      <p className='font-semibold sm:w-48'>{label}</p>
                      <p className='text-gray-400'>
                        <span className='pr-2'>-</span>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title={<span className='text-gray-300 text-lg'>Address</span>}
                action={
                  <IconButton onClick={() => setOpenAddress(prev => !prev)}>
                    {openAddress ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
                  </IconButton>
                }
              />
              <Collapse in={openAddress}>
                <CardContent>
                  <div className='space-y-2 text-gray-200'>
                    {[
                      { label: 'Street Address', value: restaurant.usersRestaurant?.address.street },
                      { label: 'City', value: restaurant.usersRestaurant?.address.city },
                      { label: 'State', value: restaurant.usersRestaurant?.address.state },
                      { label: 'Country', value: restaurant.usersRestaurant?.address.country },
                      { label: 'Postal Code', value: restaurant.usersRestaurant?.address.zip },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col sm:flex-row sm:items-center">
                        <p className='font-semibold sm:w-48'>{label}</p>
                        <p className='text-gray-400'>
                          <span className='pr-2'>-</span>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                title={<span className='text-gray-300 text-lg'>Contact</span>}
                action={
                  <IconButton onClick={() => setOpenContact(prev => !prev)}>
                    {openContact ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
                  </IconButton>
                }
              />
              <Collapse in={openContact}>
                <CardContent sx={{height:"12em"}}>
                  <div className='space-y-2 text-gray-200'>
                    {[
                      { label: <Email />, value: restaurant.usersRestaurant?.contactInfo.email },
                      { label: <Phone />, value: restaurant.usersRestaurant?.contactInfo.phone },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col sm:flex-row sm:items-center">
                        <p className='font-semibold sm:w-48'>{label}</p>
                        <p className='text-gray-400'>
                          <span className='pr-2'>-</span>
                          {value}
                        </p>
                      </div>
                    ))}
                    <div className="flex items-center">
                      {/* <span className='font-semibold'>Social Media</span> */}
                      <div className='flex text-gray-400 items-center p-1 gap-2'>
                        <a href={restaurant.usersRestaurant?.contactInfo.instagramId}><Instagram sx={{ fontSize: "3rem" }} /></a>
                        <a href={restaurant.usersRestaurant?.contactInfo.facebookId}><Facebook sx={{ fontSize: "3rem" }} /></a>
                        <a href={restaurant.usersRestaurant?.contactInfo.twitterId}><Twitter sx={{ fontSize: "3rem" }} /></a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
