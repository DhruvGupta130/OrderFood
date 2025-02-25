import React, { useEffect } from 'react';
import "./Home.css";
import { MultiItemCarousel } from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../State/Restaurant/Action';
import { Alert, CircularProgress } from "@mui/material";

const Home = () => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector(store => store);
    const { loading, error, restaurants } = restaurant;

    useEffect(() => {
        dispatch(getAllRestaurants());
    }, [dispatch]);

    return (
        <div>
            <section className='banner z-50 relative flex flex-col justify-center items-center'>
                <div className="w-[50vw] z-10 text-center">
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>THE GUPTA'S</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Enjoy the Food at your Fingertips</p>
                </div>
                <div className="cover absolute top-0 left-0 right-0"></div>
                <div className="fadout"></div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MultiItemCarousel />
                <h1 className='text-2xl font-semibold text-gray-400 py-3'>Order From Our Handpicked Favorites</h1>
                <div>
                    {loading ? (
                        <div className='flex justify-center items-center w-full'><CircularProgress /></div>
                    ) : error ? (
                        <div className='flex justify-center items-center w-full'><Alert severity="error" icon={false} style={{ fontSize: 'large', marginBottom: 20 }}>Error loading restaurants!</Alert></div>
                    ) : restaurants?.length > 0 ? (
                        restaurants.map((item) => <RestaurantCard key={item.id} item={item} />)
                    ) : (
                        <p className='text-gray-400 text-xl w-full text-center'>No restaurants available</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;