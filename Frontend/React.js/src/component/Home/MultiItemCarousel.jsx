import React, { useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFoodItems } from '../State/Menu/Action';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const MultiItemCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { menuItems, loading } = useSelector(state => state.menu);
    const {user} = useSelector(state=>state.auth);

    useEffect(() => {
        dispatch(getAllFoodItems());
    }, [dispatch]);

    const handleItemClick = (restaurant) => {
        if (restaurant.active) {
            user
                ? navigate(`/restaurant/${restaurant?.address?.city}/${restaurant?.name}/${restaurant?.id}`)
                : navigate('/account/login');
        }
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

    return (
        <div>
            <Slider {...settings}>
                {!loading && menuItems.map((item) => (
                    <CarouselItem 
                        key={item.id} 
                        image={item?.images[0]} 
                        title={item?.name} 
                        onClick={() => handleItemClick(item?.restaurant)} // Pass the restaurantId
                    />
                ))}
            </Slider>
        </div>
    );
};
