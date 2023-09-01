// components/Cart.tsx
"use client";
import React from 'react';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

const Cart: React.FC = () => {
  const { cartItems, dispatch } = useCart();

  const handleRemoveFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  };

  const handleIncrementQuantity = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', productId });
  };

  const handleDecrementQuantity = (productId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', productId });
  };

  return (
    <div className="bg-gray-100 p-4  ">
      
      <div className='flex flex-row justify-center gap-8'>
        <div>
          <p className="text-lg text-center font-semibold mb-8">Shopping Cart </p>
        </div>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        </div>
      </div>
      
      {cartItems.map(item => (
        <div key={item.product.id} className="flex mb-2 gap-8 mt-3 border-2">
        <Image src={item.product.image} alt={item.product.title} className="w-30 h-36 object-cover mr-2" />
        <div className="">
          <p className='mt-4'>{item.product.title}</p>
          <p className="text-gray-600 mt-4">Price : ${item.product.price}</p>
          <p className='mt-4'>Quantity: {item.quantity}</p>

          <button className='hover:bg-[#f79393] rounded-lg border-2 mt-4' onClick={() => handleRemoveFromCart(item.product.id)}><span className='p-4'>Remove</span></button>
          <div className='flex flex-row gap-4 mt-4'>
          <button className='hover:bg-[#aafebc]  w-12 rounded-lg border-2' onClick={() => handleIncrementQuantity(item.product.id)}>+</button>
          <button className='hover:bg-[#f79393]  w-12 rounded-lg border-2 ' onClick={() => handleDecrementQuantity(item.product.id)}>-</button>
          </div>
        </div>
      </div>
      ))}
      <div className='flex items-center justify-center'>
      <Link href='/components/checkout'>
        <button className='hover:bg-[#aafebc] p-8 rounded-lg border-2 mt-4' onClick={() => {}}>Proceed to Checkout</button>
      </Link>
      </div>
      
    </div>
  );
};

export default Cart;
