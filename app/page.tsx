
import ProductListing from '@/app/components/productListing'
import Image from 'next/image'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ProductListing/>
    </main>
  )
}
