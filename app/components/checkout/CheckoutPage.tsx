'use client';
import React from 'react';
import { useCart } from '../../../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping Information */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <form>
            <div className="mb-2">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input type="text" id="name" className="w-full border rounded py-1 px-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="number" className="block font-medium">
                Phone Number
              </label>
              <input type="number" id="number" className="w-full border rounded py-1 px-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="Address" className="block font-medium">
                Address
              </label>
              <input type="text" id="address" className="w-full border rounded py-1 px-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="City" className="block font-medium">
                City
              </label>
              <input type="text" id="city" className="w-full border rounded py-1 px-2" />
            </div>
            <div className="mb-2">
              <label htmlFor="PIN" className="block font-medium">
                PIN Code
              </label>
              <input type="number" id="pin" className="w-full border rounded py-1 px-2" />
            </div>
            <button className="bg-blue-500 text-white py-1 px-4 rounded">Submit</button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 shadow-md">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="mb-2">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center mb-1">
                <p>
                  {item.product.title} ({item.quantity}x)
                </p>
                <p>${item.product.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p className="font-semibold">Total:</p>
            <p>${calculateTotal()}</p>
          </div>
          <button className="bg-blue-500 text-white py-1 px-4 rounded mt-16">Choose Payment options</button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
