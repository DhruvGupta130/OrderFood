import { Divider, FormControl, FormControlLabel, Grid2, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useParams } from 'react-router-dom';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
import { Email, Facebook, Instagram, Phone, Twitter } from '@mui/icons-material';

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian Only", value: "veg" },
  { label: "Non-Vegetarian Only", value: "non_veg" },
  { label: "Seasonal", value: "seasonal" }
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState('all');
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant, menu } = useSelector(store => store);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { id } = useParams();

  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(getRestaurantById({ token, id }));
    dispatch(getRestaurantsCategory({token, id}));
  }, [token, id, dispatch]);

  useEffect(()=>{
    dispatch(getMenuItemsByRestaurantId({
      "token":token, "id":id, "vegeterian":foodType==="veg", "nonVegeterian":foodType==="non_veg", "seasonal":foodType==="seasonal", "category":selectedCategory,
    }));
  }, [selectedCategory, foodType, dispatch, id, token]);

//   useEffect(()=>{
//     dispatch(getCart(token));
// }, [cart.cartItems]);


  return (
    <div className='px-5 lg:px-20'>
      <section>
        <h3 className='text-gray-500 py-2 mt-10'>Registered on : {restaurant.restaurant?.registrationDate}</h3>
        <Grid2 container spacing={2}>
          {restaurant.restaurant?.images.map((image, index) => (
            <Grid2 size={{xs:12, md:6, lg:4}} key={index}>
              <img className='w-full h-[40vh] object-cover' src={image} alt={restaurant.restaurant?.name} />
            </Grid2>
          ))}
        </Grid2>
        <div className="p-3 mt-5">
          <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
          <p className='text-gray-500 mt-2'>{restaurant.restaurant?.description}</p>
          <div className="space-y-3 mt-3">
            <p className='text-gray-500 flex items-center gap-3'>
              <LocationOnIcon />
              <span>{restaurant.restaurant?.address.street}, {restaurant.restaurant?.address.city}, {restaurant.restaurant?.address.state} - {restaurant.restaurant?.address.zip}, {restaurant.restaurant?.address.country}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <CalendarTodayIcon />
              <span>Mon-Sun 9:00 AM - 9:00 PM</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <Email/>
              <span>{restaurant.restaurant?.contactInfo.email}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
              <Phone/>
              <span>{restaurant.restaurant?.contactInfo.phone}</span>
            </p>
            <p className='text-gray-500 flex items-center gap-3'>
            <a href={restaurant.restaurant?.contactInfo.instagramId}><Instagram sx={{fontSize:"3rem"}}/></a>
            <a href={restaurant.restaurant?.contactInfo.twitterId}><Twitter sx={{fontSize:"3rem"}}/></a>
            <a href={restaurant.restaurant?.contactInfo.facebookId}><Facebook sx={{fontSize:"3rem"}}/></a>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className='pt-[2rem] lg:flex relative'>
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                Food Type
              </Typography>
              <FormControl className='py-10 space-y-5' component={'fieldset'}>
                <RadioGroup onChange={handleFilter} name='food_type' defaultValue="all">
                  {foodTypes.map((item)=>(
                    <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label}/>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider/>
            <div>
              <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                Food Category
              </Typography>
              <FormControl className='py-10 space-y-5' component={'fieldset'}>
                <RadioGroup onChange={handleFilterCategory} name='food_category' defaultValue="">
                  <FormControlLabel key="" value="" control={<Radio />} label="All"/>
                  {restaurant.categories.map((item)=>(
                    <FormControlLabel key={item.name} value={item.name} control={<Radio />} label={item.name}/>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems.map((items)=><MenuCard items={items} />)}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;