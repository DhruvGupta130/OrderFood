import { Cancel, CheckCircle, HourglassEmpty, LocalShipping } from '@mui/icons-material';
import { Card, Chip } from '@mui/material';
import React from 'react';

const OrderCard = (item) => {
  
  const getStatusProps = (status) => {
    switch (status) {
        case 'PENDING':
            return { color: 'warning', icon: <HourglassEmpty />, label: 'Pending' };
        case 'PROCESSING':
            return { color: 'info', icon: <LocalShipping />, label: 'Processing' };
        case 'OUT_FOR_DELIVERY':
            return { color: 'primary', icon: <LocalShipping />, label: 'Out for Delivery' };
        case 'DELIVERED':
            return { color: 'success', icon: <CheckCircle />, label: 'Delivered' };
        case 'CANCELLED':
            return { color: 'error', icon: <Cancel />, label: 'Cancelled' };
        default:
            return { color: 'default', label: status };
    }
};

  const { color, icon, label } = getStatusProps(item.orderItems?.orderStatus);
  
  return (
    <Card className='flex justify-between items-center p-5'>
      <div className='flex items-center space-x-5'>
        <img className='h-20 w-20' src={item.item?.food?.images[0]} alt={item.item?.food?.name} />
        <div>
          <p>{item.item?.food?.name}</p>
          <p>Quantity: {item.item?.quantity}</p>
          <p>Price: ₹{item.item?.price}</p>
          <div className="pt-2 flex flex-wrap">
          {item.item?.ingredients?.length > 0 ? (
              item.item.ingredients.map((ingredient) => (
                <Chip key={ingredient.id} label={ingredient.name} className='mt-1 mr-2' />
              ))
            ) : (
              <Chip label="No ingredients" className='mt-1' />
            )}
          </div>
        </div>
      </div>
      <div>
      <Chip
        label={label}
        color={color}
        icon={icon}
        sx={{ display: 'flex', alignItems: 'center' }}
      />
      </div>
    </Card>
  );
}

export default OrderCard;
