import React from 'react'

const GetMyBoxHomePage = () => {
  return (
    <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
                <div className="flex justify-center">
                    <img 
                        src="http://static.photos/craft/640x360/12" 
                        alt="Artkive Box" 
                        className="rounded-xl shadow-md w-full max-w-md"
                    />
                </div>
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Get Started<br/>
                        With An Artkive Box
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        It includes everything you need to send in your artwork
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl">
                        Get My Box
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetMyBoxHomePage
