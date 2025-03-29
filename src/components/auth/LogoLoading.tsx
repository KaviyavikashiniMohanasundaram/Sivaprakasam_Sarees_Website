
import React from 'react';

const LogoLoading = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-32 h-32 mb-6 relative animate-scale-in">
        <div className="absolute inset-0 border-2 border-saree-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-playfair font-bold text-saree-700">
          SS
        </div>
      </div>
      <h1 className="text-2xl font-playfair font-bold text-saree-700 mb-2">Sivaprakasam Sarees</h1>
      <p className="text-sm text-gray-500">Connecting Tradition & Elegance Seamlessly</p>
    </div>
  );
};

export default LogoLoading;
