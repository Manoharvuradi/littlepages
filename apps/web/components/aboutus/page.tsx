import React from 'react'

const AboutUsPage = () => {
  return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center" data-aos="fade-up">
                    <div className="flex justify-center">
                        <img 
                            src="http://static.photos/people/640x360/15" 
                            alt="About Artkive" 
                            className="rounded-xl shadow-md w-full max-w-md"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            We Exist To Help Kids Thrive.
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Hey, we're Artkive! We believe in the power of creativity and making memories last. Our passion, dedication, and love of what we do is what makes us the industry leader in helping families like yours preserve kid's art.
                        </p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
                            About Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage
