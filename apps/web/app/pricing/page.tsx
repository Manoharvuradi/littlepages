'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import FooterPage from '../../components/footer';
import styles from "./index.module.scss";

const PricingPage = () => {
  const [pieces, setPieces] = useState(20);
  const basePrice = 999;
  const extraPiecePrice = 49.99;
  const totalPrice = pieces <= 20 ? basePrice : basePrice + (pieces - 20) * extraPiecePrice;
     
  return (
<div className='relative bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-32 overflow-hidden'>
  {/* Decorative background elements */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

  {/* Heading */}
  <div className="max-w-7xl mx-auto px-6 mb-16" data-aos="fade-up">
    <div className="text-center">
      <div className="inline-block mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
          Simple & Transparent
        </span>
      </div>
      <h1 className='text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text mb-4'>
        Pricing Plans
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
        Choose the perfect plan for preserving your child's precious artwork
      </p>
    </div>
  </div>

  <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 flex flex-col xl:flex-row gap-12 items-stretch">
    {/* Image - Top on mobile/tablet, Right on xl */}
    <div className="flex-1 flex items-center justify-center order-1 xl:order-2" data-aos="fade-left">
      <div className="relative w-full max-w-md xl:max-w-none aspect-[3/4] group">
        {/* Decorative gradient background */}
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-2xl transition-opacity duration-500"></div>
        
        <div className="relative h-full rounded-2xl overflow-hidden">
          <Image
            src="/images/product.png"
            alt="High quality printing"
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </div>

    {/* Content - Bottom on mobile/tablet, Left on xl */}
    <div className="flex-1 space-y-8 order-2 xl:order-1" data-aos="fade-right">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-6">
          Art Books
        </h2>
        <p className="text-gray-600 text-lg">
          Transform your child's artwork into beautiful keepsakes
        </p>
      </div>

      {/* Features */}
      <ul className="space-y-6">
        <li className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed pt-1">
            High-quality printing ensures every artwork looks as vibrant as the original.
          </p>
        </li>
        <li className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed pt-1">
            Books range from 25–350 images and come in two sizes: 8"×8" or 11"×8.5".
          </p>
        </li>
        <li className="flex items-start gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed pt-1">
            Book cost depends on the number of art pieces sent.
          </p>
        </li>
      </ul>

      {/* Pricing Calculator Card */}
      <div className="mt-12 relative" data-aos="fade-up">
        {/* Gradient background glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl"></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
          {/* Price Display */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Number of Pieces</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  {pieces}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 font-medium mb-1">Total Price</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>20 pieces</span>
              <span>350 pieces</span>
            </div>
            <input
              type="range"
              min={20}
              max={350}
              step={1}
              value={pieces}
              onChange={(e) => setPieces(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb"
              style={{
                background: `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(147, 51, 234) ${((pieces - 20) / (350 - 20)) * 100}%, rgb(229, 231, 235) ${((pieces - 20) / (350 - 20)) * 100}%, rgb(229, 231, 235) 100%)`
              }}
            />
          </div>

          {/* CTA Button */}
          <button className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-95 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Create Your Book
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  </section>

  <FooterPage />
</div>
  )
}

export default PricingPage
