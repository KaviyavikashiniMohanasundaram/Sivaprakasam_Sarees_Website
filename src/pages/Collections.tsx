
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { allProducts } from '@/data/products';

const Collections = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Get category from URL if present
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const category = pathParts[pathParts.length - 1];
    
    if (category && category !== 'collections') {
      setSelectedCategories([category]);
    }
  }, [location.pathname]);
  
  // Apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = allProducts;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategories, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 50000]);
    setSelectedCategories([]);
    navigate('/collections');
  };

  const categories = [
    { id: 'silk', label: 'Silk Sarees' },
    { id: 'cotton', label: 'Cotton Sarees' },
    { id: 'wedding', label: 'Wedding Collection' },
    { id: 'casual', label: 'Casual Wear' },
  ];

  return (
    <PageLayout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-saree-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-saree-700">
            Our Saree Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Browse our extensive collection of handcrafted sarees for every occasion
          </p>
        </div>
      </section>
      
      {/* Collection Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full border-saree-200 text-saree-700 flex items-center justify-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Filters - Hidden on mobile by default */}
            <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-playfair font-semibold text-xl text-saree-700">Filters</h3>
                  {(searchTerm || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 50000) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-sm text-saree-600 hover:text-saree-700"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
                
                {/* Search Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Search</h4>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search sarees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    {searchTerm && (
                      <button 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setSearchTerm('')}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                        />
                        <Label 
                          htmlFor={`category-${category.id}`}
                          className="ml-2 cursor-pointer"
                        >
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <Slider
                    defaultValue={[0, 50000]}
                    max={50000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">{filteredProducts.length} products</p>
                    <div className="hidden md:block">
                      <select 
                        className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-saree-500"
                        defaultValue="featured"
                      >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="No Results" 
                    className="w-32 h-32 mb-4 opacity-30"
                  />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any products that match your current filters.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={clearFilters}
                    className="border-saree-200 text-saree-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Collections;
