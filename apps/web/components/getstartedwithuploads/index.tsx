import React from 'react'

const GetStartedWithUploads = () => {
  return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Getting Started with ArtBox
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Includes everything you need to send in your artwork
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
                    <div className="bg-gray-50 rounded-xl p-8 shadow-md">
                        <ul className="space-y-6 mb-8">
                            <li className="flex items-start">
                                <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                                <span className="text-gray-800">24”x18”x4” crush-proof Artkive Box (holds 300-400 pieces of art)</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                                <span className="text-gray-800">Re-sealable art protection bag</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                                <span className="text-gray-800">Order form to select your Art Books and/or Framed Mosaics, plus tips and tricks to organize your art</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-3 mt-1 flex-shrink-0">✓</span>
                                <span className="text-gray-800">Prepaid shipping label to send back your box from anywhere in the contiguous Hyderabad</span>
                            </li>
                        </ul>
                        <div className="text-center">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl">
                                Get My Box
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <img 
                            src="http://static.photos/craft/640x360/10" 
                            alt="ArtBox Kit" 
                            className="rounded-xl shadow-md w-full max-w-md"
                        />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default GetStartedWithUploads
