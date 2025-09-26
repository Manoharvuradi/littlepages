import React from 'react'

const LandingPage = () => {
  return (
    <div className={`min-h-screen bg-[url('/images/finalDesign.png')] bg-cover flex items-center text-white pt-16`}>
            <div className="max-w-md px-3 text-left ml-24" data-aos="fade-up">
            <h1 className="text-[2.5rem] font-bold leading-[1.4] font-montserrat">
                The #1 Solution For Preserving And Celebrating Kids' Art!
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
                Curated boxes delivered to your door. Experience the joy of surprise!
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl">
                Get a Box
            </button>
            </div>
      </div>
  )
}

export default LandingPage
