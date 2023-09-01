
import ProductListing from '@/app/components/productListing'
import Image from 'next/image'
import { CartProvider } from '../context/CartContext';

export default function Home() {
  return (
    <CartProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
      <ProductListing/>
    </main>
    </CartProvider>
  )
}
