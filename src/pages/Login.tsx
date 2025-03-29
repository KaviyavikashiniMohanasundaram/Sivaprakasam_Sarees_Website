
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    // This would typically handle API login
    toast({
      title: "Login Successful",
      description: "Welcome back to Sivaprakasam Sarees!",
    });
    navigate('/');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-playfair text-center text-saree-700">Login to Your Account</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                      control={form.control}
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
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Continue as Guest
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="font-medium text-saree-600 hover:text-saree-800 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
