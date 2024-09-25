import React, { useEffect } from 'react';
import "./Home.css";
import { MultiItemCarousel } from './MultiItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from './../State/Restaurant/Action';

const Home = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { restaurant } = useSelector(store => store);

    useEffect(() => {
        dispatch(getAllRestaurants());
    }, [dispatch, token]);

    return (
        <div>
            <section className='banner z-50 relative flex flex-col justify-center items-center'>
                <div className="w-[50vw] z-10 text-center">
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>THE GUPTA'S</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>Enjoy the Food at your Fingertips</p>
                </div>
                <div className="cover absolute top-0 left-0 right-0">

                </div>
                <div className="fadout">

                </div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MultiItemCarousel />
                <h1 className='text-2xl font-semibold text-gray-400 py-3'>Order From Our Handpicked Favorites</h1>
                <div className='flex flex-wrap justify-normal items-center'>
                    {
                        restaurant?.restaurants?.map((item) => <RestaurantCard key={item.id} item={item} />)
                    }
                </div>
            </section>
        </div>
    );
}

export default Home;
