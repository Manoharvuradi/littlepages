import React from 'react'

const FooterPage = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Little Pages</h3>
                    <p className="text-gray-400 mb-4">
                        Preserving memories and creativity through premium art preservation services.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <i data-feather="facebook"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <i data-feather="twitter"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <i data-feather="instagram"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Products</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Art Books</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                        {/* <li><a href="#" className="hover:text-white transition-colors">Returns</a></li> */}
                    </ul>
                </div>
                {/* <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div> */}
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2026 Little Pages. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default FooterPage
