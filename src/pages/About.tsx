
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

const About = () => {
  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-saree-50 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-saree-700">
            About Sivaprakasam Sarees
          </h1>
          <p className="text-gray-600 mt-2">
            Celebrating the art of traditional saree craftsmanship
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1611861977595-97bece2d9a5a?q=80&w=3242&auto=format&fit=crop" 
                alt="Saree Store Interior" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-saree-700 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 1985 by V. Sivaprakasam, our store began as a small family business with 
                  a passion for preserving the rich textile heritage of Tamil Nadu. Located in the heart 
                  of Erode, a city renowned for its textile industry, we have grown to become one of the 
                  most trusted names in traditional sarees.
                </p>
                <p>
                  For over three decades, we have maintained our commitment to quality craftsmanship, 
                  authentic designs, and customer satisfaction. What started as a modest shop has now 
                  evolved into a premier destination for saree enthusiasts seeking both traditional and 
                  contemporary designs.
                </p>
                <p>
                  Today, the legacy continues under the guidance of V. Siddhanathan and V. Swaminathan, 
                  who bring a perfect blend of traditional values and modern vision to our business. 
                  Our collection has expanded to include a wide range of sarees, each telling its own 
                  unique story of artistry and cultural heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-saree-700 mb-6 text-center">
            Our Values
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            At Sivaprakasam Sarees, our business is built on strong principles that guide everything we do. 
            These core values have helped us build lasting relationships with our customers and artisans.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-saree-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-4 text-center">Quality</h3>
              <p className="text-gray-600 text-center">
                We never compromise on the quality of our products. Each saree undergoes rigorous quality checks 
                to ensure it meets our high standards before reaching our customers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-saree-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-4 text-center">Craftsmanship</h3>
              <p className="text-gray-600 text-center">
                We celebrate the art of traditional handloom weaving and support skilled artisans who pour their 
                heart and soul into creating each masterpiece.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-saree-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-saree-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-4 text-center">Customer Satisfaction</h3>
              <p className="text-gray-600 text-center">
                Our customers are at the heart of everything we do. We strive to provide an exceptional shopping 
                experience both in-store and online.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-saree-700 mb-6 text-center">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our dedicated team brings years of experience and passion for traditional textiles, 
            ensuring you receive the best products and service.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="V. Siddhanathan" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-1">V. Siddhanathan</h3>
                <p className="text-saree-600 mb-4">Managing Director</p>
                <p className="text-gray-600 mb-4">
                  With over 25 years of experience in the textile industry, Siddhanathan leads our business 
                  operations with expertise and vision.
                </p>
                <p className="text-gray-700 font-medium">
                  Contact: 9003330044
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://randomuser.me/api/portraits/men/41.jpg" 
                alt="V. Swaminathan" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-1">V. Swaminathan</h3>
                <p className="text-saree-600 mb-4">Sales Director</p>
                <p className="text-gray-600 mb-4">
                  Swaminathan oversees our customer relations and sales, ensuring every customer 
                  finds the perfect saree for their needs.
                </p>
                <p className="text-gray-700 font-medium">
                  Contact: 9944424063
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src="https://randomuser.me/api/portraits/women/65.jpg" 
                alt="Lakshmi Devi" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair font-semibold text-gray-800 mb-1">Lakshmi Devi</h3>
                <p className="text-saree-600 mb-4">Design Consultant</p>
                <p className="text-gray-600 mb-4">
                  With an eye for detail and deep knowledge of traditional designs, Lakshmi helps 
                  curate our exclusive collection.
                </p>
                <p className="text-gray-700 font-medium">
                  Design Expert
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-saree-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-saree-700 mb-6">
                Why Choose Sivaprakasam Sarees?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle size={24} className="text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Authentic Handcrafted Sarees</h3>
                    <p className="text-gray-600">
                      Our sarees are sourced directly from skilled artisans and weavers, ensuring authenticity and 
                      preserving traditional techniques.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle size={24} className="text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Extensive Collection</h3>
                    <p className="text-gray-600">
                      From classic silk sarees to contemporary designs, our diverse collection caters to every 
                      occasion, preference, and budget.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle size={24} className="text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Expert Guidance</h3>
                    <p className="text-gray-600">
                      Our knowledgeable team provides personalized assistance to help you find the perfect saree 
                      that suits your style and occasion.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle size={24} className="text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Quality Assurance</h3>
                    <p className="text-gray-600">
                      Each saree undergoes thorough quality checks before it reaches our store, ensuring you 
                      receive only the finest products.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle size={24} className="text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Customer-Centric Approach</h3>
                    <p className="text-gray-600">
                      From pre-purchase consultation to post-purchase support, we ensure a seamless and 
                      satisfying shopping experience.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/collections">
                  <Button className="bg-saree-500 hover:bg-saree-600 text-white">
                    Explore Our Collection
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=987&auto=format&fit=crop" 
                alt="Saree Display" 
                className="rounded-lg shadow-md h-48 object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1608731267455-725a9de5dfce?q=80&w=987&auto=format&fit=crop" 
                alt="Silk Saree" 
                className="rounded-lg shadow-md h-48 object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1610416869940-ac77c33c1ab9?q=80&w=987&auto=format&fit=crop" 
                alt="Wedding Saree" 
                className="rounded-lg shadow-md h-48 object-cover w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=987&auto=format&fit=crop" 
                alt="Traditional Saree" 
                className="rounded-lg shadow-md h-48 object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-saree-600 to-saree-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-6">
            Experience the Beauty of Traditional Sarees
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Visit our store in Erode or browse our online collection to discover the perfect 
            saree for your special occasions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/collections">
              <Button className="bg-white text-saree-700 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
