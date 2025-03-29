
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff, User, Phone, Store, Building, MapPin } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

const buyerSignupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  address: z.string().min(10, "Please enter your complete address"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const sellerSignupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessAddress: z.string().min(10, "Please enter your complete business address"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type BuyerSignupFormValues = z.infer<typeof buyerSignupSchema>;
type SellerSignupFormValues = z.infer<typeof sellerSignupSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the role from URL query parameter
  const query = new URLSearchParams(location.search);
  const role = query.get('role') as 'buyer' | 'seller' || 'buyer';

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const buyerSignupForm = useForm<BuyerSignupFormValues>({
    resolver: zodResolver(buyerSignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      termsAccepted: false,
    },
  });

  const sellerSignupForm = useForm<SellerSignupFormValues>({
    resolver: zodResolver(sellerSignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      businessAddress: "",
      termsAccepted: false,
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    console.log(data);
    // This would typically handle API login
    toast({
      title: `${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful`,
      description: "Welcome back to Sivaprakasam Sarees!",
    });
    navigate('/');
  };

  const onBuyerSignupSubmit = (data: BuyerSignupFormValues) => {
    console.log(data);
    toast({
      title: "Buyer Account created successfully",
      description: "Welcome to Sivaprakasam Sarees!",
    });
    setActiveTab("login");
  };

  const onSellerSignupSubmit = (data: SellerSignupFormValues) => {
    console.log(data);
    toast({
      title: "Seller Account created successfully",
      description: "Your account is pending verification. We'll contact you soon!",
    });
    setActiveTab("login");
  };

  const roleTitle = role === 'buyer' ? 'Buyer' : 'Seller';

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-playfair text-center text-saree-700">
                {roleTitle} Account
              </CardTitle>
              <CardDescription className="text-center">
                {role === 'buyer' ? 'Shop for the finest silk sarees' : 'Sell your premium saree collections'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  placeholder="email@example.com" 
                                  {...field} 
                                  className="pl-10" 
                                />
                              </FormControl>
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  type={showPassword ? "text" : "password"} 
                                  placeholder="••••••••" 
                                  {...field} 
                                  className="pl-10" 
                                />
                              </FormControl>
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center justify-between">
                        <FormField
                          control={loginForm.control}
                          name="rememberMe"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                Remember me
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <Link 
                          to="/forgot-password" 
                          className="text-sm font-medium text-saree-600 hover:text-saree-800 transition-colors"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                      
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-card text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <Button variant="outline" type="button" className="w-full">
                          Google
                        </Button>
                        <Button variant="outline" type="button" className="w-full">
                          Facebook
                        </Button>
                        <Button variant="outline" type="button" className="w-full">
                          Apple
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="signup">
                  {role === 'buyer' ? (
                    <Form {...buyerSignupForm}>
                      <form onSubmit={buyerSignupForm.handleSubmit(onBuyerSignupSubmit)} className="space-y-4">
                        <FormField
                          control={buyerSignupForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={buyerSignupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="email@example.com" 
                                    type="email"
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={buyerSignupForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="1234567890" 
                                    type="tel"
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={buyerSignupForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Delivery Address</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="Your full address" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={buyerSignupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <button 
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={buyerSignupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <button 
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={buyerSignupForm.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  I agree to the{' '}
                                  <Link to="/terms" className="text-saree-600 hover:text-saree-800 transition-colors">
                                    terms of service
                                  </Link>{' '}
                                  and{' '}
                                  <Link to="/privacy" className="text-saree-600 hover:text-saree-800 transition-colors">
                                    privacy policy
                                  </Link>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Create Buyer Account
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <Form {...sellerSignupForm}>
                      <form onSubmit={sellerSignupForm.handleSubmit(onSellerSignupSubmit)} className="space-y-4">
                        <FormField
                          control={sellerSignupForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="email@example.com" 
                                    type="email"
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="1234567890" 
                                    type="tel"
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="businessName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Name</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="Your business name" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="businessAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Business Address</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    placeholder="Your business address" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <button 
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <div className="relative">
                                <FormControl>
                                  <Input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    {...field} 
                                    className="pl-10" 
                                  />
                                </FormControl>
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <button 
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={sellerSignupForm.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value} 
                                  onCheckedChange={field.onChange} 
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal cursor-pointer">
                                  I agree to the{' '}
                                  <Link to="/terms" className="text-saree-600 hover:text-saree-800 transition-colors">
                                    terms of service
                                  </Link>{' '}
                                  and{' '}
                                  <Link to="/privacy" className="text-saree-600 hover:text-saree-800 transition-colors">
                                    privacy policy
                                  </Link>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Create Seller Account
                        </Button>
                      </form>
                    </Form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                {activeTab === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("signup")}
                      className="font-medium text-saree-600 hover:text-saree-800 transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("login")}
                      className="font-medium text-saree-600 hover:text-saree-800 transition-colors"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-saree-600"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
