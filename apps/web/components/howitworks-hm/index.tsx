import React from 'react'

const HowItWorksHomePage = () => {
    const products = [
        {
            id: 1,
            title: "Beauty Box",
            description: "Premium skincare and makeup products from top brands",
            price: "$49.99/month",
            image: "http://static.photos/cosmetic/640x360/1"
        },
        {
            id: 2,
            title: "Tech Box",
            description: "Latest gadgets and tech accessories for enthusiasts",
            price: "$79.99/month",
            image: "http://static.photos/technology/640x360/2"
        },
        {
            id: 3,
            title: "Foodie Box",
            description: "Gourmet snacks and ingredients from around the world",
            price: "$39.99/month",
            image: "http://static.photos/food/640x360/3"
        },
        {
            id: 4,
            title: "Wellness Box",
            description: "Self-care products for mind and body wellness",
            price: "$59.99/month",
            image: "http://static.photos/wellness/640x360/4"
        }
    ];
  return (
    <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    How It Works
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Choose from our carefully curated subscription boxes
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow" data-aos="fade-up">
                        <div className="h-48 overflow-hidden">
                            <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-indigo-600">{product.price}</span>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HowItWorksHomePage
