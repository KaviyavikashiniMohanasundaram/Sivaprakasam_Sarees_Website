
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { useCart } from '@/hooks/use-cart';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  
  const handleQuantityChange = (id: string, type: 'increment' | 'decrement') => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;
    
    const newQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-saree-50 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-saree-700">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            Review your items before proceeding to checkout
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b p-4 bg-gray-50">
                  <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map(item => (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <div className="sm:w-1/4 mb-4 sm:mb-0">
                        <Link to={`/product/${item.id}`}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </Link>
                      </div>
                      
                      {/* Product Details */}
                      <div className="sm:w-3/4 sm:pl-4 flex flex-col justify-between">
                        <div>
                          <Link to={`/product/${item.id}`} className="block mb-1 text-lg font-semibold text-gray-800 hover:text-saree-600">
                            {item.name}
                          </Link>
                          <p className="text-gray-500 text-sm mb-4">Product ID: {item.id}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="flex items-center mb-4 sm:mb-0">
                            <button 
                              className="border border-gray-300 rounded-l-md p-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, 'decrement')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <div className="border-t border-b border-gray-300 w-10 text-center py-1">
                              {item.quantity}
                            </div>
                            <button 
                              className="border border-gray-300 rounded-r-md p-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, 'increment')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-saree-600 font-semibold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <button 
                              className="ml-4 text-gray-400 hover:text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <Link to="/collections">
                  <Button variant="outline" className="border-saree-200 text-saree-700">
                    <ShoppingBag size={16} className="mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{totalPrice > 2000 ? 'Free' : '₹100'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span>₹{Math.round(totalPrice * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-saree-600">
                        ₹{(totalPrice + (totalPrice > 2000 ? 0 : 100) + Math.round(totalPrice * 0.05)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full bg-saree-500 hover:bg-saree-600 text-white">
                    Proceed to Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p className="mb-2">We accept:</p>
                  <div className="flex space-x-2">
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-visa">
                        <title id="pi-visa">Visa</title>
                        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                        <path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path>
                      </svg>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-master">
                        <title id="pi-master">Mastercard</title>
                        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                        <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                        <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                        <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
                      </svg>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-amex">
                        <title id="pi-amex">American Express</title>
                        <g fill="none">
                          <path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07"></path>
                          <path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"></path>
                          <path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-md">
                      <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-paypal">
                        <title id="pi-paypal">PayPal</title>
                        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                        <path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"></path>
                        <path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"></path>
                        <path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag size={36} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-playfair font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/collections">
              <Button className="bg-saree-500 hover:bg-saree-600 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Cart;
