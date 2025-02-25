import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFoodItems } from '../State/Menu/Action';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from "@mui/material";

export const MultiItemCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { menuItems, loading, error } = useSelector(state => state.menu);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getAllFoodItems());
    }, [dispatch]);

    const handleItemClick = (restaurant) => {
        if (!restaurant?.active) return;
        navigate(user ? `/restaurant/${restaurant?.address?.city}/${restaurant?.name}/${restaurant?.id}` : '/account/login');
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
        ],
    };

    if (loading) return <div className='flex justify-center items-center w-full'><CircularProgress/></div>;
    if (error) return <div className='flex justify-center items-center w-full'><Alert severity="error" icon={false} sx={{fontSize: 'large'}}>Error loading food items!</Alert></div>;
    if (!menuItems?.length) return <p className='text-gray-400 text-xl w-full text-center'>No food items available</p>;

    return (
        <div>
            <Slider {...settings}>
                {menuItems.map((item) => (
                    <CarouselItem
                        key={item.id}
                        image={item?.images[0] || '/placeholder-image.jpg'}
                        title={item?.name || 'Unnamed Item'}
                        onClick={() => handleItemClick(item?.restaurant)}
                    />
                ))}
            </Slider>
        </div>
    );
};
