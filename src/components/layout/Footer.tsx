
import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4 text-saree-700">Sivaprakasam Sarees</h3>
            <p className="text-gray-600 mb-4">
              Traditional saree shop in Erode, Tamil Nadu. Offering handcrafted, high-quality sarees for all occasions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-saree-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-saree-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-saree-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4 text-saree-700">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-saree-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Collection Categories */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4 text-saree-700">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/silk" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Silk Sarees
                </Link>
              </li>
              <li>
                <Link to="/collections/cotton" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Cotton Sarees
                </Link>
              </li>
              <li>
                <Link to="/collections/wedding" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Wedding Collection
                </Link>
              </li>
              <li>
                <Link to="/collections/casual" className="text-gray-600 hover:text-saree-500 transition-colors">
                  Casual Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-playfair font-semibold mb-4 text-saree-700">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-saree-500 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  Sivaprakasam Sarees, 123 Textile Market, Erode, Tamil Nadu - 638001
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-2 text-saree-500" />
                <div className="text-gray-600">
                  <p>V. Siddhanathan: 9003330044</p>
                  <p>V. Swaminathan: 9944424063</p>
                </div>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-saree-500" />
                <a href="mailto:sivaprakasamsarees@yahoo.com" className="text-gray-600 hover:text-saree-500 transition-colors">
                  sivaprakasamsarees@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sivaprakasam Sarees. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
