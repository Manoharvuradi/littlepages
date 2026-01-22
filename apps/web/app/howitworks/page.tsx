"use client";

import Image from "next/image";
import React from "react";
import FooterPage from "../../components/footer";

const steps = [
  {
    id: 1,
    title: "Our creative process begins",
    description:
      "Simply take photos of your child’s drawings and upload them to Little Pages. Whether it’s a school project, a quick doodle, or a colourful masterpiece, our platform helps you organise everything in one place with captions, names, dates, and ages so each memory stays meaningful.",
    image: "/images/how-it-works-1.png",
    reverse: false,
  },
  {
    id: 2,
    title: "It's time to collaborate",
    description:
      "Once the artwork is uploaded, our team turns the collection into a thoughtfully crafted book. Every page is arranged with clean layouts, gentle colours, and a design that highlights your child’s creativity. You’ll get a preview to make changes before the book goes to print, ensuring it looks exactly the way you imagined.",
    image: "/images/how-it-works-2.png",
    reverse: true,
  },
  {
    id: 3,
    title: "Your art is Artkived!",
    description:
      "After you approve the design, we print the book on high-quality paper meant to last for years. It is then shipped directly to your home — a beautiful keepsake your child can hold, revisit, and be proud of. What once filled drawers and shelves becomes a single timeless book your family will treasure.",
    image: "/images/how-it-works-3.png",
    reverse: false,
  },
];

function Step({ id, title, description, image, reverse }: any) {
  return (
    <div
      data-aos="fade-up"
      className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 py-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-sm md:max-w-md group">
          {/* Decorative gradient background */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
          
          <div className="relative">
            <Image
              src={image}
              alt={title}
              width={500}
              height={400}
              className="rounded-2xl shadow-2xl object-cover transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl"
            />
            
            {/* Step number badge */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">{id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 max-w-xl space-y-4">
        <div className="inline-block">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-sm font-bold uppercase tracking-wider">
            Step {id}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 text-transparent bg-clip-text">
          {title}
        </h3>

        <p className="text-gray-600 text-lg leading-relaxed">
          {description}
        </p>

        {/* Optional: Add a progress indicator */}
        <div className="pt-4">
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative z-30 bg-gradient-to-b from-gray-50 via-white to-gray-50 px-6 md:px-12 py-20 md:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Heading */}
        <div
          className="relative max-w-4xl mx-auto text-center mb-20"
          data-aos="fade-up"
        >
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full">
              Simple Process
            </span>
          </div>
          
          <h2 className="text-gray-900 text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            How It Works
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Discover the simple steps to preserve and celebrate your child's
            creativity. Our process makes it easy and fun to turn art into
            lasting memories!
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto space-y-8 relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 opacity-30 -translate-x-1/2"></div>
          
          {steps.map((step, index) => (
            <Step key={step.id} {...step} reverse={index % 2 !== 0} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-24" data-aos="fade-up">
          <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95">
            <span className="relative z-10">Create Your Book Now</span>
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            {/* Arrow icon */}
            <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>
      
      <FooterPage />
    </>
  );
}