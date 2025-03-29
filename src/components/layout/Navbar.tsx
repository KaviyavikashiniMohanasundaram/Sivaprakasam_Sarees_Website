
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-playfair font-bold text-saree-700">
              Sivaprakasam <span className="text-saree-500">Sarees</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-medium hover:text-saree-500 transition-colors",
                  location.pathname === item.path ? "text-saree-500" : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-saree-500">
              <Search size={20} />
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-saree-500">
                <ShoppingCart size={20} />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-saree-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <Button variant="ghost" size="icon" className="text-gray-700">
                <ShoppingCart size={20} />
              </Button>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-saree-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "py-2 px-4 font-medium rounded-md hover:bg-saree-50 hover:text-saree-500 transition-colors",
                  location.pathname === item.path ? "bg-saree-50 text-saree-500" : "text-gray-700"
                )}
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t">
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                <Search size={18} className="mr-2" />
                Search
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
