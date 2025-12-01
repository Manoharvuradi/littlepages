import React from 'react'
import styles from './landingpage.module.scss'

const LandingPage = () => {
  return (
    <div className={`${styles.hero} flex items-center text-white`}>
      <div className={`max-w-md px-3 text-left ml-24 ${styles.content}`} data-aos="fade-up">
        <h1 className="text-[2.5rem] font-bold leading-[1.4] font-montserrat">
          The #1 Solution For Preserving And Celebrating Kids' Art!
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Curated boxes delivered to your door. Experience the joy of surprise!
        </p>
        <button 
            className="bg-[#009FFF] hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl"
            onClick={() => console.log('Create Book clicked')}
        >
          Create Book
        </button>
      </div>
    </div>
  )
}

export default LandingPage