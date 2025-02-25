import { Card, Chip } from '@mui/material';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchResultCard = ({ item }) => {
    const navigate = useNavigate();
    const { auth } = useSelector(store => store);

    const handleNavigateToRestaurant = useCallback(() => {
        if (item.restaurant.active && item.available) {
            auth.user
                ? navigate(`/restaurant/${item.restaurant.address?.city}/${item.restaurant.name}/${item.restaurant.id}`)
                : navigate('/account/login');
        }
    }, [item.restaurant.name, auth.user, navigate, item.restaurant.address?.city, item.restaurant.active, item.available, item.restaurant.id]);

    const truncateDescription = (description, maxLength = 100) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <Card className="m-5 w-80 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div onClick={handleNavigateToRestaurant} className={`${item.active ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <p onClick={handleNavigateToRestaurant} className={`${item.available ? 'cursor-pointer' : 'cursor-not-allowed'} font-semibold text-lg`}>
                    <img className="w-full h-48 rounded-t-lg object-cover" src={item.image || item.images[0]} alt={item.name} />
                </p>
                <Chip size="small" className="absolute top-2 left-2" color={item.available ? "success" : "error"} label={item.available ? "Available" : "Out of Stock"} />
            </div>
            <div className="p-4 flex justify-between items-center">
                <div className="space-y-1">
                    <p onClick={handleNavigateToRestaurant} className={`${item.available ? 'cursor-pointer' : 'cursor-not-allowed'} font-semibold text-lg`}>{item.name}</p>
                    <p className="text-sm">{truncateDescription(item.description)}</p>
                </div>
            </div>
        </Card>
    );
};

export default SearchResultCard;
