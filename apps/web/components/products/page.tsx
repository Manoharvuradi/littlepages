import Image from 'next/image';
import styles from './products.module.scss';

const ProductsPage = () => {
  return (
    <>
      <div className="text-center my-12" data-aos="fade-up">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Our Products</h2>
      </div>

      <section className={`px-4 md:px-8 lg:px-16 py-8 md:py-12 bg-white flex gap-6 items-start ${styles.section}`}>
        {/* Left: image (takes more width) */}
        {/* In ProductsPage.js */}

<div className="flex-[2] flex justify-center w-full">
  {/* Remove the relative and fill logic. Just let the image exist. */}
  <div className={styles.imageWrapper}> 
    <Image
      src="/images/product.png"
      alt="High quality printing"
      // Give it the intrinsic dimensions of your original image
      // (Example: if your image is square, use 1000x1000)
      width={1000} 
      height={1000}
      className={styles.responsiveImage} // Use a new class for styling
      priority
    />
  </div>
</div>
        {/* Right: content */}
        <div className="flex-[1] max-w-md space-y-6">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${styles.title}`}>Art Books</h2>

          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <span className="text-[#009FFF] text-2xl">✔</span>
              <p className={`text-gray-700 text-lg ${styles.bulletText}`}>
                High-quality printing ensures every artwork looks as vibrant as the original.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#009FFF] text-2xl">✔</span>
              <p className={`text-gray-700 text-lg ${styles.bulletText}`}>
                Books range from 25–350 images and come in two sizes: 8”x8” or 11”x8.5”.
              </p>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#009FFF] text-2xl">✔</span>
              <p className={`text-gray-700 text-lg ${styles.bulletText}`}>
                Book cost depends on the number of art pieces sent.
              </p>
            </li>
          </ul>

          <p className={`text-gray-500 font-bold ${styles.price}`}>
            Starting at <span className="text-2xl font-bold text-[#009FFF]">₹999</span> for a 25-page Book
          </p>

          <div className="flex justify-center md:justify-start mt-6">
            <button className={`bg-[#009FFF] hover:bg-[#007acc] text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-md ${styles.button}`}>
              Create Book
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
