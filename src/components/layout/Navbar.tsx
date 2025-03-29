
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-saree-600 font-medium"
      : "text-gray-700 hover:text-saree-600";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <span className="text-xl font-playfair font-bold text-saree-700">
                Sivaprakasam Sarees
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`text-sm ${isActive("/")}`}>
              Home
            </Link>
            <Link to="/collections" className={`text-sm ${isActive("/collections")}`}>
              Collections
            </Link>
            <Link to="/bulk-purchase" className={`text-sm ${isActive("/bulk-purchase")}`}>
              Bulk Purchase
            </Link>
            <Link to="/about" className={`text-sm ${isActive("/about")}`}>
              About
            </Link>
            <Link to="/contact" className={`text-sm ${isActive("/contact")}`}>
              Contact
            </Link>
          </nav>

          {/* User and Cart Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/welcome" className="hidden md:flex">
              <Button variant="ghost" size="icon" className="relative" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Shopping Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-saree-500 text-[10px] font-medium text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16">
          <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6 text-center">
            <Link to="/" className="text-lg font-medium" onClick={closeMobileMenu}>
              Home
            </Link>
            <Link to="/collections" className="text-lg font-medium" onClick={closeMobileMenu}>
              Collections
            </Link>
            <Link to="/bulk-purchase" className="text-lg font-medium" onClick={closeMobileMenu}>
              Bulk Purchase
            </Link>
            <Link to="/about" className="text-lg font-medium" onClick={closeMobileMenu}>
              About
            </Link>
            <Link to="/contact" className="text-lg font-medium" onClick={closeMobileMenu}>
              Contact
            </Link>
            <div className="border-t border-gray-200 my-4 pt-4 flex justify-center space-x-8">
              <Link to="/welcome" className="flex items-center" onClick={closeMobileMenu}>
                <Button variant="outline">Login / Signup</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
