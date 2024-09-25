import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders } from '../State/Order/Action';

const Orders = () => {
  const {auth, order} = useSelector(store=>store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsersOrders(token));
  },[auth.token, token, dispatch]);

  return (
    <div>
      {order.orders[0]?<div className='flex items-center flex-col'>
          <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
          <div className="space-y-5 w-full lg:w-1/2">
          {
              order.orders.map((orderItems)=>orderItems.items.map((item)=><OrderCard orderItems={orderItems} item={item}/>))
          }
          </div>
        </div>
        :<div className='flex flex-wrap gap-3 justify-center text-gray-400'>
          <p>My Orders is Empty</p>
        </div>
        }
    </div>
  )
}

export default Orders