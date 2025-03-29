
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { User, Store, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LogoLoading from '@/components/auth/LogoLoading';

const Welcome = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Show logo loading screen for 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleSelectRole = (role: 'buyer' | 'seller') => {
    navigate(`/login?role=${role}`);
  };

  if (loading) {
    return <LogoLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-playfair text-saree-700">Welcome to Sivaprakasam Sarees</CardTitle>
          <CardDescription>Choose how you'd like to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-36 flex flex-col items-center justify-center gap-2 hover:bg-saree-50 hover:border-saree-200"
              onClick={() => handleSelectRole('buyer')}
            >
              <User size={32} className="text-saree-600" />
              <span className="text-base">I'm a Buyer</span>
              <span className="text-xs text-muted-foreground">Shop for sarees</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-36 flex flex-col items-center justify-center gap-2 hover:bg-saree-50 hover:border-saree-200"
              onClick={() => handleSelectRole('seller')}
            >
              <Store size={32} className="text-saree-600" />
              <span className="text-base">I'm a Seller</span>
              <span className="text-xs text-muted-foreground">Sell your products</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between flex-col items-center space-y-4">
          <Button 
            variant="ghost" 
            className="w-full flex justify-between items-center"
            onClick={() => navigate('/')}
          >
            <span>Continue as Guest</span>
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Welcome;
