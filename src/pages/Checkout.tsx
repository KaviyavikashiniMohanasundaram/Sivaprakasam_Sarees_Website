
import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/use-toast';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your order. We'll send you a confirmation email shortly.",
    });
    clearCart();
    // In a real application, you would redirect to a success page or order confirmation page
  };

  if (cartItems.length === 0) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
            <h2 className="text-2xl font-playfair font-semibold mb-4">Order Placed Successfully</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. We have sent an order confirmation email with details of your order.
            </p>
            <Link to="/">
              <Button className="bg-saree-500 hover:bg-saree-600 text-white">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-saree-50 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-saree-700">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your purchase securely
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          {/* Customer Information */}
          <div className="lg:w-2/3 space-y-8">
            <div className="flex items-center mb-6">
              <Link to="/cart" className="flex items-center text-saree-600 hover:text-saree-700">
                <ArrowLeft size={18} className="mr-2" />
                <span>Back to Cart</span>
              </Link>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="India" required className="mt-1" />
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
              
              <RadioGroup defaultValue="card" className="space-y-4">
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-grow cursor-pointer">
                    <div className="flex items-center">
                      <CreditCard size={20} className="mr-2 text-saree-500" />
                      <span>Credit / Debit Card</span>
                    </div>
                  </Label>
                </div>
                
                <div className="border rounded-lg p-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryMonth">Expiry Month</Label>
                      <Input id="expiryMonth" placeholder="MM" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="expiryYear">Expiry Year</Label>
                      <Input id="expiryYear" placeholder="YY" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input id="nameOnCard" required className="mt-1" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-4 opacity-50">
                  <RadioGroupItem value="upi" id="upi" disabled />
                  <Label htmlFor="upi" className="flex-grow cursor-not-allowed">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.5 14.5L9 22L19 2L9 14.5H3L13 22L11.5 14.5Z" fill="#097ADF" />
                      </svg>
                      <span>UPI (Coming Soon)</span>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-lg p-4 opacity-50">
                  <RadioGroupItem value="cod" id="cod" disabled />
                  <Label htmlFor="cod" className="flex-grow cursor-not-allowed">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4L9 9M20 20L15 15M15 9L20 4M4 20L9 15M3 9H7M12 3V7M17 9H21M12 17V21" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>Cash on Delivery (Coming Soon)</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 py-3 border-b">
                    <div className="w-16 h-16">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
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
                    <span className="text-saree-600 text-xl">
                      ₹{(totalPrice + (totalPrice > 2000 ? 0 : 100) + Math.round(totalPrice * 0.05)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-saree-500 hover:bg-saree-600 text-white">
                Place Order
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                By placing an order, you agree to our Terms and Conditions and Privacy Policy.
              </p>
            </div>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default Checkout;
