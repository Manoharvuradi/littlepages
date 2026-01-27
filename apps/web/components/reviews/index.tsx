import React from 'react'

const ReviewsPage = () => {
        const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            comment: "The artbooks are absolutely stunning! The quality exceeded my expectations and the framed mosaic turned out to be the perfect centerpiece for our living room.",
            image: "http://static.photos/people/80x80/1"
        },
        {
            id: 2,
            name: "Michael Chen",
            rating: 5,
            comment: "The entire process was seamless. From ordering to receiving the final products, everything was professional and the results were breathtaking. Will definitely order again!",
            image: "http://static.photos/people/80x80/2"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            rating: 5,
            comment: "I was amazed by the attention to detail in both the artbooks. The packaging was secure and the products arrived in perfect condition. Highly recommend!",
            image: "http://static.photos/people/80x80/3"
        }
    ];

    const renderStars = (rating: any) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
            </span>
        ));
    };
    
  return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Customer Reviews
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        See what our customers are saying about their ArtBox experience
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow" data-aos="fade-up">
                            <div className="flex items-center mb-4">
                                <img 
                                    src={review.image} 
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <div className="flex">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-12" data-aos="fade-up">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl">
                    Get My Box
                </button>
            </div>
        </div>
  )
}

export default ReviewsPage
