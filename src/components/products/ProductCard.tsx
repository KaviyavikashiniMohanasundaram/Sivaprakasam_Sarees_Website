
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="product-card group">
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Discount Tag */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-saree-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          
          {/* Quick Action Buttons */}
          <div className="absolute inset-0 bg-black/30 opacity-0 flex items-center justify-center gap-2 transition-opacity group-hover:opacity-100">
            <Button 
              size="icon" 
              onClick={handleAddToCart}
              className="bg-white text-saree-600 hover:bg-saree-50 hover:text-saree-700 rounded-full w-10 h-10"
            >
              <ShoppingCart size={18} />
            </Button>
            <Button 
              size="icon" 
              onClick={handleWishlist}
              className="bg-white text-saree-600 hover:bg-saree-50 hover:text-saree-700 rounded-full w-10 h-10"
            >
              <Heart size={18} />
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1 transition-colors group-hover:text-saree-600">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-semibold text-saree-600">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 capitalize">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
