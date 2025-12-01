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
      className={`flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mt-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-sm md:max-w-md">
          <Image
            src={image}
            alt={title}
            width={500}
            height={400}
            className="rounded-xl shadow-xl object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 max-w-xl">
        <span className="text-indigo-600 text-xl font-semibold">
          Step {id}
        </span>

        <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-snug text-gray-900">
          {title}
        </h3>

        <p className="text-gray-700 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative z-30 bg-gray-50 px-6 md:px-12 py-16 md:py-24">
        {/* Heading */}
        <div
          className="max-w-3xl mx-auto text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold mb-4">
            How It Works
          </h2>
          <p className="text-gray-700 text-lg md:text-2xl leading-relaxed">
            Discover the simple steps to preserve and celebrate your child’s
            creativity. Our process makes it easy and fun to turn art into
            lasting memories!
          </p>
        </div>

        {/* Steps */}
        {steps.map((step) => (
          <Step key={step.id} {...step} />
        ))}

        {/* Button */}
        <div className="flex justify-center mt-20">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-3 px-10 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl">
            Create Book
          </button>
        </div>
      </section>
      <FooterPage />
    </>
  );
}