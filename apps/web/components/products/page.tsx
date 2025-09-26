import React from 'react'

const ProductsPage = () => {
    const ourProducts = [
        {
            id: 1,
            title: "Premium Artbooks",
            description: "Exclusive collection of high-quality artbooks",
            price: "$89.99",
            image: "http://static.photos/education/640x360/1",
            features: [
                "✓ 12\" x 9\" standard size",
                "✓ 120+ premium pages",
                "✓ High-quality glossy paper",
                "✓ Durable hardcover binding",
                "✓ Curated artwork collection"
            ]
        },
        {
            id: 2,
            title: "Framed Mosaics",
            description: "Beautiful custom photo mosaics in elegant frames",
            price: "$149.99",
            image: "http://static.photos/craft/640x360/2",
            features: [
                "✓ 24\" x 18\" framed size",
                "✓ 100+ individual images",
                "✓ Premium wooden frame",
                "✓ High-resolution printing",
                "✓ Protective glass cover"
            ]
        }
    ];
  return (
    <div className='py-20 bg-gray-50'>
        <div className="container mx-auto px-6">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Our Products
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover our premium collection of curated products
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {ourProducts.map((product) => (
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
                            <ul className="mb-4 space-y-1">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-600">{feature}</li>
                                ))}
                            </ul>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-indigo-600">{product.price}</span>
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Order Now
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

export default ProductsPage
