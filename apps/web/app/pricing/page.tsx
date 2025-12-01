'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import FooterPage from '../../components/footer';

const PricingPage = () => {
  const [pieces, setPieces] = useState(20);
  const basePrice = 999;
  const extraPiecePrice = 49.99;
  const totalPrice = pieces <= 20 ? basePrice : basePrice + (pieces - 20) * extraPiecePrice;
     
  return (
    <div className='bg-gray-50 pt-26'>
        <h1 className='text-3xl font-bold text-center'> Pricing Page</h1>
        <section className="px-1 md:px-2 py-4 md:py-10 bg-gray-50 flex gap-10 items-stretch">
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
                </ul>
                <div className="mt-8 p-6 rounded-xl">
                    <div className="flex mb-6 mx-auto border border-gray-200 rounded-md p-6 justify-center items-center gap-3 text-center">
                        <p className="text-lg font-semibold text-gray-700">
                            <span className="text-gray-500">{pieces} Pieces</span>
                        </p>
                            <span className="text-gray-400">—</span>
                        <p className="text-xl font-bold text-[#009FFF]">
                            ₹ {totalPrice.toFixed(2)}
                        </p>
                    </div>
                    <input
                        type="range"
                        min={20}
                        max={350}
                        step={1}
                        value={pieces}
                        onChange={(e) => setPieces(Number(e.target.value))}
                        className="w-full accent-[#009FFF] bg-[#009FFF]/20"
                    />

                    <div className="flex justify-center mt-6">
                        <button className="bg-[#009FFF] hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-full text-lg transition shadow-md">
                            Create Book
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-[2] flex items-center justify-center">
                <div className="relative w-full h-[750px]">
                    <Image
                        src="/images/product.png"
                        alt="High quality printing"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
        <FooterPage />
    </div>
  )
}

export default PricingPage
