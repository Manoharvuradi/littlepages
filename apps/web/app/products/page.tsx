'use client';

import Image from 'next/image'
import React, { useState } from 'react'
import FooterPage from '../../components/footer';

const ProductsPage = () => {
    const [pieces, setPieces] = useState(20);
    const basePrice = 999;
    const extraPiecePrice = 49.99;
    const totalPrice = pieces <= 20 ? basePrice : basePrice + (pieces - 20) * extraPiecePrice;
         
  return (
    <div className='bg-gray-50 pt-9'>
        <section className="px-1 md:px-2 py-4 md:py-10 bg-gray-50 flex gap-6 items-center">
            <div className="flex-[2]">
                <div className="relative w-full h-[750px]">
                    <Image
                        src="/images/product.png"
                        alt="High quality printing"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="flex-[1] max-w-md space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Art Books
                </h2>
                <ul className="space-y-5">
                    <li className="flex items-start gap-3">
                        <span className="text-[#009FFF] text-2xl">✔</span>
                        <p className="text-gray-700 text-lg">
                            High-quality printing ensures every artwork looks as vibrant as the original.
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#009FFF] text-2xl">✔</span>
                        <p className="text-gray-700 text-lg">
                            Books range from 25–350 images and come in two sizes: 8”x8” or 11”x8.5”.
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#009FFF] text-2xl">✔</span>
                        <p className="text-gray-700 text-lg">
                            Book cost depends on the number of art pieces sent.
                        </p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#009FFF] text-2xl">✔</span>
                        <p className="text-gray-700 text-lg">
                            Premium matte printing and ability to add custom cover and captions
                        </p>
                    </li>
                </ul>
                <p className='text-gray-500 font-bold'>Starting at <span className='text-2xl font-bold text-[#009FFF]'>₹{basePrice.toFixed(2)}</span> for a 25-page Book</p>
                <div className="flex justify-center mt-6">
                        <button className="bg-[#009FFF] hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-full text-lg transition shadow-md">
                            Create Book
                        </button>
                    </div>
                
            </div>
        </section>
        <section className="px-4 md:px-12 py-14">
          <div className="max-w-3xl mx-auto text-center">

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Much Will My Book Cost?
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-md mb-3 mt-6">
              Depends on how many pieces of artwork you choose to include.
            </p>
            <p className="text-gray-600 text-md mt-6">
              For questions about pricing, feel free to <span className="text-[#009FFF] font-bold cursor-pointer hover:underline">Contact Us</span>.
            </p>

            {/* Pricing Card */}
            <div className="mt-8">
              
              {/* Price Display */}
              <div className="flex items-center justify-center gap-4 py-4 border border-gray-200 rounded-xl bg-white">
                <p className="text-lg font-medium text-gray-700 flex items-center gap-2">
                  <span className="text-gray-500">{pieces} Pieces</span> 
                </p>
                <span className="text-gray-400">—</span>
                <p className="text-2xl font-extrabold text-[#009FFF]">
                  ₹ {totalPrice.toFixed(2)}
                </p>
              </div>

              {/* Slider */}
              <div className="mt-8">
                <input
                  type="range"
                  min={20}
                  max={350}
                  step={1}
                  value={pieces}
                  onChange={(e) => setPieces(Number(e.target.value))}
                  className="
                    w-full accent-[#009FFF]
                    cursor-pointer
                    h-2 rounded-lg
                    bg-[#009FFF]/20
                  "
                />
              </div>

              {/* Button */}
              <div className="flex justify-center mt-8">
                <button className="bg-[#009FFF] hover:bg-[#007acc] transition-colors shadow-md text-white font-bold py-3 px-10 rounded-full text-lg">
                  Create Book
                </button>
              </div>

            </div>
          </div>
        </section>
        <FooterPage />
    </div>
  )
}

export default ProductsPage
