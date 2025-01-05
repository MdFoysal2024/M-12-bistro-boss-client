import React from 'react';

const MenuItem = ({item}) => {
    const {name, image, price, recipe, category} = item ||{};
    return (
        <div className='flex justify-between gap-10'>
           <img className='w-[120px] rounded-tr-full rounded-br-full  rounded-bl-full' src={image} alt="" />
           <div>
            <h3 className='uppercase text-xl font-semibold'>{name}--------------</h3>
            <p>{recipe}</p>
           </div>
           <p className='text-orange-500 font-bold'>${price}</p>
        </div>
    );
};

export default MenuItem;