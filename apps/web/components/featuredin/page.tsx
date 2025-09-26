import React from 'react'

const FetaturedInPage = () => {
        const publications = [
        {
            id: 1,
            name: "Tech Magazine",
            className: "text-2xl font-bold text-gray-800"
        },
        {
            id: 2,
            name: "Design Weekly",
            className: "text-xl font-semibold text-blue-600"
        },
        {
            id: 3,
            name: "Art Review",
            className: "text-lg font-bold italic text-purple-600"
        },
        {
            id: 4,
            name: "Lifestyle Blog",
            className: "text-xl font-medium text-pink-600"
        }
    ];
  return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h3 className="text-2xl font-semibold text-gray-600 mb-8">
                        As Featured On
                    </h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-4xl mx-auto">
                        {publications.map((publication) => (
                            <div key={publication.id} className="flex items-center justify-center" data-aos="fade-up" data-aos-delay={publication.id * 100}>
                                <span className={publication.className}>
                                    {publication.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FetaturedInPage
