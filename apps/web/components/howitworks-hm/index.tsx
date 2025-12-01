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
    <div className={`${styles.howItWorksSection} bg-gray-100 py-10`}>
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className={`${styles.heading} text-center`}  data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turning your child’s artwork into a timeless keepsake is easy and magical.
          </p>
        </div>

        {/* Cards */}
        <div className={styles.cardGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              data-aos="fade-up"
              className={`${styles.card}`}
            >
              {/* Image */}
              <div className={`h-56 overflow-hidden ${styles.cardImage}`}>
                <Image
                  src={product.image}
                  alt={""}
                  width={500}
                  height={400}
                  className="object-cover w-full h-full transform transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className={`p-6 ${styles.cardBody}`}>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HowItWorksHomePage;