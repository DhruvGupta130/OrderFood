import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

const Favorites = () => {
  const {auth} = useSelector(store=>store);

  return (
    <div>
        {auth.favorites[0]?<div>
          <h1 className='py-5 text-xl font-semibold text-center'>My Favorite</h1>
          <div className="flex flex-wrap gap-3 justify-center">
              {auth?.favorites.map((item)=><RestaurantCard key={item.id} item={item} />)}
          </div>
        </div>
        :<div className='flex flex-wrap gap-3 justify-center text-gray-400'>
          <p>My favorites is Empty</p>
        </div>
        }
    </div>
  )
}

export default Favorites