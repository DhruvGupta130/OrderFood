import { TaskAlt } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleHomeNavigate = () => navigate('/');

    return (
        <div className='min-h-screen flex items-center justify-center px-5'>
            <Card className='w-full lg:w-1/4 flex flex-col items-center rounded-md p-5'>
                <TaskAlt sx={{ fontSize: '5rem', color: green[500] }} />
                <h1 className='py-5 text-2xl font-semibold'>Order Successful</h1>
                <p className='py-3 text-center text-gray-400'>Thank you for choosing us! We appreciate your order.</p>
                <p className='py-2 text-center text-gray-200 text-lg'>Have a great day!</p>
                <Button onClick={handleHomeNavigate} variant='contained' sx={{ margin: '1rem 0' }}>Home</Button>
            </Card>
        </div>
    );
};
