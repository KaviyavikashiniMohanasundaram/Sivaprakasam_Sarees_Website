
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Package, Users, Settings, 
  LogOut, ChevronDown, ChevronUp, Plus, Search
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your seller account",
    });
    navigate('/seller/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed inset-y-0 z-30 hidden md:flex md:flex-col">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-center flex-shrink-0 px-4">
            <h1 className="text-xl font-playfair font-bold text-saree-700">Seller Dashboard</h1>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              <Button 
                variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('dashboard')}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
              <Button 
                variant={activeSection === 'products' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('products')}
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Products
              </Button>
              <Button 
                variant={activeSection === 'orders' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('orders')}
              >
                <Package className="mr-3 h-5 w-5" />
                Orders
              </Button>
              <Button 
                variant={activeSection === 'customers' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('customers')}
              >
                <Users className="mr-3 h-5 w-5" />
                Customers
              </Button>
              <Button 
                variant={activeSection === 'settings' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('settings')}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
          <div className="p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-20 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-playfair font-bold text-saree-700">Seller Dashboard</h1>
          <Button size="sm" variant="outline" onClick={() => setActiveSection('menu')}>
            {activeSection === 'menu' ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
        {activeSection === 'menu' && (
          <div className="mt-4">
            <nav className="grid gap-2">
              <Button 
                variant={activeSection === 'dashboard' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('dashboard')}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
              <Button 
                variant={activeSection === 'products' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('products')}
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                Products
              </Button>
              <Button 
                variant={activeSection === 'orders' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('orders')}
              >
                <Package className="mr-3 h-5 w-5" />
                Orders
              </Button>
              <Button 
                variant={activeSection === 'customers' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('customers')}
              >
                <Users className="mr-3 h-5 w-5" />
                Customers
              </Button>
              <Button 
                variant={activeSection === 'settings' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveSection('settings')}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 p-6 mt-16 md:mt-0">
          {/* Dashboard Content */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹12,56,340</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">254</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      +4 new this month
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-lg font-semibold mt-8">Recent Orders</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-4 text-sm font-medium text-muted-foreground bg-muted">
                      <div>Order ID</div>
                      <div>Customer</div>
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="grid grid-cols-5 p-4 text-sm">
                          <div>ORD-{1000 + i}</div>
                          <div>Customer {i}</div>
                          <div>{new Date().toLocaleDateString()}</div>
                          <div>₹{2000 + i * 1000}</div>
                          <div>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Completed
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Products Content */}
          {activeSection === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Products</h2>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
              
              <div className="flex">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8"
                  />
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 p-4 text-sm font-medium text-muted-foreground bg-muted">
                      <div>ID</div>
                      <div>Name</div>
                      <div>Category</div>
                      <div>Price</div>
                      <div>Stock</div>
                      <div>Action</div>
                    </div>
                    <div className="divide-y">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="grid grid-cols-6 p-4 text-sm">
                          <div>PRD-{100 + i}</div>
                          <div>Silk Saree {i}</div>
                          <div>Kanchipuram</div>
                          <div>₹{10000 + i * 1500}</div>
                          <div>{10 + i}</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Simple placeholders for other sections */}
          {activeSection === 'orders' && (
            <div>
              <h2 className="text-2xl font-semibold">Orders</h2>
              <p className="text-muted-foreground mt-2">Manage your orders here</p>
            </div>
          )}
          
          {activeSection === 'customers' && (
            <div>
              <h2 className="text-2xl font-semibold">Customers</h2>
              <p className="text-muted-foreground mt-2">View and manage your customers</p>
            </div>
          )}
          
          {activeSection === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-muted-foreground mt-2">Configure your seller account</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
