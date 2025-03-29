
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/products/ProductCard';
import { featuredProducts } from '@/data/products';

const Index = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-saree-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-saree-700 leading-tight mb-4">
                Traditional Elegance, <br />
                <span className="text-saree-500">Timeless Beauty</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Discover exquisite handcrafted sarees from Erode's premier saree destination, blending tradition with contemporary designs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-saree-500 hover:bg-saree-600 text-white">
                  Shop Collection
                </Button>
                <Button variant="outline" className="border-saree-500 text-saree-500 hover:bg-saree-50">
                  About Us
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 md:w-64 md:h-64 rounded-full bg-saree-100 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=987&auto=format&fit=crop" 
                  alt="Beautiful Silk Saree" 
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gold-100 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Our Collections</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Explore our diverse range of traditional and contemporary sarees crafted with intricate designs and premium fabrics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Card 1 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <img 
                src="https://images.unsplash.com/photo-1600693577296-3a208130ca76?q=80&w=987&auto=format&fit=crop" 
                alt="Silk Sarees" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-playfair font-semibold mb-2">Silk Sarees</h3>
                <Link 
                  to="/collections/silk" 
                  className="text-white font-medium flex items-center group-hover:text-saree-200"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Category Card 2 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <img 
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=987&auto=format&fit=crop" 
                alt="Cotton Sarees" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-playfair font-semibold mb-2">Cotton Sarees</h3>
                <Link 
                  to="/collections/cotton" 
                  className="text-white font-medium flex items-center group-hover:text-saree-200"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Category Card 3 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <img 
                src="https://images.unsplash.com/photo-1610416869940-ac77c33c1ab9?q=80&w=987&auto=format&fit=crop" 
                alt="Wedding Collection" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-playfair font-semibold mb-2">Wedding Collection</h3>
                <Link 
                  to="/collections/wedding" 
                  className="text-white font-medium flex items-center group-hover:text-saree-200"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            
            {/* Category Card 4 */}
            <div className="group relative overflow-hidden rounded-lg shadow-md h-80">
              <img 
                src="https://images.unsplash.com/photo-1595424064782-0ec891313525?q=80&w=987&auto=format&fit=crop" 
                alt="Casual Wear" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-playfair font-semibold mb-2">Casual Wear</h3>
                <Link 
                  to="/collections/casual" 
                  className="text-white font-medium flex items-center group-hover:text-saree-200"
                >
                  Explore Collection <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Featured Products</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Explore our curated selection of premium sarees, each piece a testament to the rich heritage of Indian craftsmanship.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/collections">
              <Button className="bg-saree-500 hover:bg-saree-600 text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Customer Love</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Hear what our customers have to say about their Sivaprakasam Sarees experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <div className="flex text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I ordered a Kanchipuram silk saree for my daughter's wedding. The quality and craftsmanship exceeded my expectations. The team was extremely helpful in helping me choose the perfect piece."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Lakshmi Venkat</h4>
                  <div className="flex text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been a loyal customer for years. Their collection of cotton sarees for everyday wear is unmatched. The comfort, durability, and designs keep me coming back for more."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Anjali Desai</h4>
                  <div className="flex text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The online shopping experience was seamless. My order arrived well-packaged and on time. The saree looked even more beautiful in person than in the photos. Will definitely shop again!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-16 bg-saree-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Visit Our Store</h2>
              <p className="text-gray-600 mb-6">
                Experience our exclusive collection in person at our store in Erode. Our knowledgeable staff will help you find the perfect saree for any occasion.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-gray-600">Sivaprakasam Sarees, 123 Textile Market, Erode, Tamil Nadu - 638001</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-600">sivaprakasamsarees@yahoo.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-gray-600">V. Siddhanathan: 9003330044</p>
                    <p className="text-gray-600">V. Swaminathan: 9944424063</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-full shadow-sm mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Store Hours</h4>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 11:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-saree-100 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1611861977595-97bece2d9a5a?q=80&w=3242&auto=format&fit=crop" 
                alt="Saree Store Interior" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gold-100 -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
