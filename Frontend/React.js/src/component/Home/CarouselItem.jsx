import React from 'react';

const CarouselItem = ({ image, title, onClick }) => {
  return (
    <div 
      className='flex flex-col justify-center items-center cursor-pointer' 
      onClick={onClick} // Add onClick event here
    >
      <img 
        className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center' 
        src={image} 
        alt={title} 
      />
      <span className='py-5 font-semibold text-xl text-gray-400'>{title}</span>
    </div>
  );
}

export default CarouselItem;
