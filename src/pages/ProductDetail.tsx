
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, Share, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/products/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allProducts } from '@/data/products';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Find the product based on the productId
    const foundProduct = allProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
      
      // Get related products (same category, excluding current product)
      const related = allProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [productId]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product?.name} has been added to your wishlist`,
    });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse">
              <p className="text-gray-400">Loading product details...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/collections">
              <Button className="bg-saree-500 hover:bg-saree-600 text-white">
                Back to Collections
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-saree-500">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collections" className="hover:text-saree-500">Collections</Link>
            <span className="mx-2">/</span>
            <Link to={`/collections/${product.category}`} className="hover:text-saree-500 capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="lg:w-1/2">
              {/* Main Image */}
              <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-[500px] object-cover object-center"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                <div 
                  className={`border rounded-md overflow-hidden cursor-pointer ${mainImage === product.image ? 'border-saree-500' : 'border-gray-200'}`}
                  onClick={() => setMainImage(product.image)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-24 object-cover object-center"
                  />
                </div>
                {product.additionalImages?.map((img: string, idx: number) => (
                  <div 
                    key={idx}
                    className={`border rounded-md overflow-hidden cursor-pointer ${mainImage === img ? 'border-saree-500' : 'border-gray-200'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - View ${idx + 1}`} 
                      className="w-full h-24 object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="mb-2 flex items-center">
                <Link to="/collections" className="text-saree-500 hover:text-saree-600 flex items-center text-sm font-medium">
                  <ArrowLeft size={16} className="mr-1" /> Back to Collections
                </Link>
              </div>
              <h1 className="text-3xl font-playfair font-semibold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Price */}
              <div className="flex items-center mb-4">
                <span className="text-2xl font-semibold text-saree-600">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-400 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="ml-2 bg-saree-100 text-saree-700 text-xs font-medium px-2 py-0.5 rounded">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-gold-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  4.9 (42 reviews)
                </span>
              </div>
              
              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Handcrafted with premium quality fabric</li>
                  <li>Intricate traditional designs</li>
                  <li>Vibrant and long-lasting colors</li>
                  <li>Comfortable to wear for extended periods</li>
                </ul>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity:</h3>
                <div className="flex items-center">
                  <button 
                    className="border border-gray-300 rounded-l-md p-2 text-gray-600 hover:bg-gray-100"
                    onClick={decrementQuantity}
                  >
                    <Minus size={18} />
                  </button>
                  <div className="border-t border-b border-gray-300 w-12 text-center py-2">
                    {quantity}
                  </div>
                  <button 
                    className="border border-gray-300 rounded-r-md p-2 text-gray-600 hover:bg-gray-100"
                    onClick={incrementQuantity}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart & Wishlist Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="bg-saree-500 hover:bg-saree-600 text-white flex-1 gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="border-saree-200 text-saree-600 hover:bg-saree-50 gap-2"
                  onClick={handleWishlist}
                >
                  <Heart size={18} />
                  Add to Wishlist
                </Button>
              </div>
              
              {/* Additional Info */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-start">
                  <Truck className="w-5 h-5 text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-500">Free shipping on orders over ₹2,000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-saree-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Quality Guarantee</h4>
                    <p className="text-sm text-gray-500">30-day return policy for unworn items</p>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-6 flex items-center">
                <span className="text-gray-600 mr-3">Share:</span>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-saree-500 transition-colors">
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-saree-500 transition-colors">
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-saree-500 transition-colors">
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-saree-500 transition-colors">
                    <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M0 0v24h24v-24h-24zm18.862 9.237c.208 4.617-3.235 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.079-4.03 3.198-4.03.944 0 1.797.398 2.396 1.037.748-.147 1.451-.42 2.085-.796-.245.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.44.656-.997 1.234-1.638 1.697z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Details Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-playfair font-semibold mb-4">Product Description</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  This exquisite {product.name} is a true masterpiece from our collection. Handcrafted 
                  by skilled artisans from Erode, Tamil Nadu, each saree showcases the rich heritage 
                  and traditional craftsmanship that has been passed down through generations.
                </p>
                <p>
                  The intricate patterns and vibrant colors are achieved using natural dyes and 
                  traditional weaving techniques. The attention to detail in every thread makes this 
                  saree not just a garment, but a work of art that symbolizes elegance and grace.
                </p>
                <p>
                  Perfect for special occasions, weddings, or cultural celebrations, this saree will 
                  ensure you stand out with its timeless beauty and unmatched quality. Each piece is 
                  unique, with slight variations that add to its authentic charm.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-playfair font-semibold mb-4">Product Specifications</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Material</td>
                      <td className="px-4 py-3">Premium {product.category === 'silk' ? 'Pure Silk' : product.category === 'cotton' ? 'Handloom Cotton' : 'Blended Fabric'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Origin</td>
                      <td className="px-4 py-3">Erode, Tamil Nadu</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Length</td>
                      <td className="px-4 py-3">5.5 meters (with blouse piece)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Width</td>
                      <td className="px-4 py-3">1.15 meters</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Weight</td>
                      <td className="px-4 py-3">{product.category === 'silk' ? '650-750 grams' : '450-550 grams'}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Weaving Technique</td>
                      <td className="px-4 py-3">Traditional Handloom</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium bg-gray-50">Design</td>
                      <td className="px-4 py-3">Traditional {product.category === 'wedding' ? 'Bridal' : 'Classic'} Patterns</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium bg-gray-50">Care Instructions</td>
                      <td className="px-4 py-3">Dry clean only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-playfair font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {/* Review 1 */}
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/women/32.jpg" 
                        alt="Reviewer" 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">Priya Sharma</h4>
                        <div className="flex text-gold-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">2 months ago</span>
                  </div>
                  <p className="text-gray-700">
                    Absolutely beautiful saree! The craftsmanship is exceptional, and the colors are vibrant. 
                    I received so many compliments when I wore it to my sister's wedding. The fabric quality 
                    is excellent, and the blouse piece matched perfectly. Highly recommend!
                  </p>
                </div>
                
                {/* Review 2 */}
                <div className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/women/44.jpg" 
                        alt="Reviewer" 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">Lakshmi Venkat</h4>
                        <div className="flex text-gold-500">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">3 months ago</span>
                  </div>
                  <p className="text-gray-700">
                    I've been a loyal customer of Sivaprakasam Sarees for years, and they never disappoint. 
                    This saree is another testament to their commitment to quality. The material is soft 
                    and comfortable to wear for extended periods. The packaging was secure, and delivery was prompt.
                  </p>
                </div>
                
                {/* Review 3 */}
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <img 
                        src="https://randomuser.me/api/portraits/women/68.jpg" 
                        alt="Reviewer" 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">Anjali Desai</h4>
                        <div className="flex text-gold-500">
                          {[...Array(4)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <span className="text-gray-500 text-sm">4 months ago</span>
                  </div>
                  <p className="text-gray-700">
                    The saree design and color are gorgeous, exactly as shown in the pictures. The only 
                    reason I'm giving 4 stars instead of 5 is that the blouse piece was slightly different 
                    in shade from what I expected. Otherwise, the quality is excellent, and I love wearing it.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ProductDetail;
