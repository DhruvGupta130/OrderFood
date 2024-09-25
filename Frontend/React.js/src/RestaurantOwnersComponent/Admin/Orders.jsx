import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import { OrderTables } from './OrderTables';

export const Orders = () => {
    const [filterValue, setFilterValue] = useState('ALL'); // Default to 'ALL'

    const handleFilter = (e) => {
        setFilterValue(e.target.value);
    };

    const orderStatus = [
        { label: "All", value: "ALL" },
        { label: "Pending", value: "PENDING" },
        { label: "Processing", value: "PROCESSING" },
        { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
        { label: "Delivered", value: "DELIVERED" },
        { label: "Cancelled", value: "CANCELLED" }
    ];

    return (
        <Box className='px-3 py-2'>
            <Card elevation={3} sx={{ mt:2, borderRadius: 2, padding: 2 }}>
                <Typography variant='h5' sx={{ padding: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Order Status
                </Typography>
                <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                    <RadioGroup 
                        onChange={handleFilter} 
                        name='order-status' 
                        value={filterValue} 
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                    >
                        {orderStatus.map((item) => (
                            <FormControlLabel 
                                key={item.value} 
                                value={item.value} 
                                control={<Radio />} 
                                label={item.label} 
                                sx={{ color: grey[700], fontWeight: '500', '&.Mui-checked': { color: grey[900] } }} 
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <OrderTables filterValue={filterValue} />
            </Card>
        </Box>
    );
};
