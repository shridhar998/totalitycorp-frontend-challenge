// pages/ProductListing.js
'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Toast from './toast';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFliter';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}


const ProductListing = () => {
  // You can fetch your product data from an API or a data source
  const [products,setProducts] = useState<Product[]>([])
  const [categories,setCategories] = useState<string[]>([])
  const [toastShow,setToastShow]= useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const filteredProducts = products
  .filter((product) => {
    // Apply category filter
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    // Apply price range filter
    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }
    return true;
  })
  .map((product) => (
    <div key={product.id} className="bg-white p-4 shadow-md">
      <Image src={product.image} alt={product.title} className="w-32 h-48 object-cover" />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  ));
  useEffect(()=>{
    
    const getProducts  = async ()=>{
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data)
   }
   getProducts();
  },[])
   // Your product data
  const { dispatch } = useCart();

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
    setToastShow(true);
    setTimeout(()=>setToastShow(false),1000)
  }
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const handlePriceRangeChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };
  
  return (
    <div className="container mx-16 py-8">
      <h1 className="text-lg text-center font-semibold mb-8">Shridhar's E-commerce Store</h1>
      <div className='flex justify-end'>
        <Link href="/components/cart" >
          <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() =>{}}
              >
              Proceed To Cart
          </button>
        </Link>
      </div>
      
        <div className='flex items-center justify-center fixed right-8 '>
          {
            toastShow && <Toast/>
          }
        </div>
        
      
        <div className="">
          {/* Filter components */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChangeCategory={handleCategoryChange}
          />
          <PriceRangeFilter minPrice={0} maxPrice={1000} onChangePriceRange={handlePriceRangeChange} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts}
        </div>
      </div>
    
  );
};

export default ProductListing;
