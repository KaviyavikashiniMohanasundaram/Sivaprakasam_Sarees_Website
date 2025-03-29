
import React from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, ArrowLeft } from 'lucide-react';

import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log(data);
    // This would typically handle password reset request
    toast({
      title: "Reset Link Sent",
      description: "If an account exists with this email, you will receive a password reset link",
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-playfair text-center text-saree-700">Forgot Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email address and we'll send you a link to reset your password
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
                  <Button type="submit" className="w-full">
                    Send Reset Link
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link 
                to="/login" 
                className="flex items-center text-sm font-medium text-saree-600 hover:text-saree-800 transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default ForgotPassword;
