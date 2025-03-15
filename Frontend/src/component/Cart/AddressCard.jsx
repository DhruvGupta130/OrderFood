import { Home, Work, Edit, OtherHouses } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import React from 'react';

const AddressCard = ({ item, showButton, handleSelectAddress, handleEditAddress }) => {
    return (
        <Card className='relative flex flex-col justify-between w-64 p-5'>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                    {item.type === "Home" ? <Home sx={{ fontSize: "2rem" }} /> : item.type==="Work" ? <Work sx={{ fontSize: "1.5rem" }} /> : <OtherHouses/>}
                    <h1 className='font-semibold text-2xl text-white'>{item.type}</h1>
                </div>
                <Button
                    onClick={() => handleEditAddress(item)}
                    sx={{ minWidth: "40px", position: 'absolute', top: '10px', right: '10px' }}
                >
                    <Edit sx={{ fontSize: "1.5rem" }} />
                </Button>
            </div>
            <div className="space-y-3 text-gray-500 mt-2">
                <p>
                    {item.street}, {item.city}, {item.state} - {item.zip}, {item.country}
                </p>
                {showButton && (
                    <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>
                        Select
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default AddressCard;
