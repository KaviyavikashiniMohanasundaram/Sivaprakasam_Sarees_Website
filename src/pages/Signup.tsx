
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';

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

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
    // This would typically handle API signup
    toast({
      title: "Account created successfully",
      description: "Welcome to Sivaprakasam Sarees!",
    });
    navigate('/login');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-playfair text-center text-saree-700">Create an Account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    Create Account
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-saree-600 hover:text-saree-800 transition-colors"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Signup;
