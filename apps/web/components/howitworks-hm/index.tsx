import Image from 'next/image';
import React from 'react';
import styles from './howitworks.module.scss';

const HowItWorksHomePage = () => {
  const products = [
    {
      id: 1,
      description:
        "Simply upload photos of your child’s art to Little Pages. Organize everything with captions and dates to keep every memory meaningful.",
      image: "/images/how-it-works-1.png",
    },
    {
      id: 2,
      description:
        "Our team turns your uploaded art into a beautifully crafted book with clean layouts that highlight creativity. You approve a preview before printing.",
      image: "/images/how-it-works-2.png",
    },
    {
      id: 3,
      description:
        "We print your approved book on high-quality, lasting paper. Shipped directly to your home — a treasured keepsake your child will love.",
      image: "/images/how-it-works-3.png",
    },
  ];

  return (
<div className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-32 overflow-hidden">
  {/* Decorative background elements */}
  <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
  <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

  <div className="relative container mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
      <div className="inline-block mb-4">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
          Simple Process
        </span>
      </div>
      <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text mb-6 tracking-tight">
        How It Works
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Turning your child's artwork into a timeless keepsake is easy and magical.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {products.map((product, index) => (
        <div
          key={product.id}
          data-aos="fade-up"
          data-aos-delay={index * 100}
          className="group relative"
        >
          {/* Card */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Gradient border glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
            
            <div className="relative bg-white rounded-2xl overflow-hidden">
              {/* Step Number Badge */}
              <div className="absolute top-4 left-4 z-10 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">{index + 1}</span>
              </div>

              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={product.image}
                  alt={product.description}
                  width={500}
                  height={400}
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${((index + 1) / products.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>

                {/* Optional: Add a "Learn More" link */}
                <div className="mt-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm">Learn More</span>
                  <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default HowItWorksHomePage;