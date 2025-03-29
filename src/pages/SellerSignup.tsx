
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Mail, Lock, User, Phone, Eye, EyeOff, Store, Building, 
  Upload, FileText, CreditCard, MapPin 
} from 'lucide-react';

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
  FormDescription,
} from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const basicInfoSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessType: z.string().min(2, "Business type must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const businessDetailsSchema = z.object({
  businessAddress: z.string().min(10, "Please enter your complete business address"),
  gstNumber: z.string().optional(),
  panNumber: z.string().min(10, "PAN number must be at least 10 characters").optional(),
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  accountNumber: z.string().min(8, "Account number must be at least 8 digits"),
  ifscCode: z.string().min(11, "IFSC code must be 11 characters"),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
type BusinessDetailsFormValues = z.infer<typeof businessDetailsSchema>;

const SellerSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState<"basicInfo" | "businessDetails">("basicInfo");
  const [basicInfo, setBasicInfo] = useState<BasicInfoFormValues | null>(null);
  const navigate = useNavigate();

  const basicInfoForm = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const businessDetailsForm = useForm<BusinessDetailsFormValues>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      businessAddress: "",
      gstNumber: "",
      panNumber: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      termsAccepted: false,
    },
  });

  const onBasicInfoSubmit = (data: BasicInfoFormValues) => {
    console.log("Basic Info:", data);
    setBasicInfo(data);
    setActiveStep("businessDetails");
  };

  const onBusinessDetailsSubmit = (data: BusinessDetailsFormValues) => {
    console.log("Business Details:", data);
    console.log("Complete Form Data:", { ...basicInfo, ...data });
    
    // This would typically handle API signup
    toast({
      title: "Seller Account created successfully",
      description: "Your account is pending verification. We'll contact you soon!",
    });
    navigate('/seller/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-4 py-10">
      <Card className="w-full max-w-xl shadow-lg animate-fade-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-playfair text-center text-saree-700">Become a Seller</CardTitle>
          <CardDescription className="text-center">
            Join our marketplace and start selling your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full mb-6">
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className={`flex-1 ${activeStep === "basicInfo" ? "text-saree-700 font-medium" : "text-gray-500"}`}>
                  <div className="relative flex flex-col items-center">
                    <div className={`rounded-full flex items-center justify-center w-8 h-8 text-white ${activeStep === "basicInfo" ? "bg-saree-600" : "bg-gray-300"}`}>
                      1
                    </div>
                    <span className="text-xs mt-1">Basic Info</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-1 bg-gray-200 mx-2">
                    <div className={`h-1 ${activeStep === "businessDetails" ? "bg-saree-600" : "bg-gray-200"}`}></div>
                  </div>
                </div>
                <div className={`flex-1 ${activeStep === "businessDetails" ? "text-saree-700 font-medium" : "text-gray-500"}`}>
                  <div className="relative flex flex-col items-center">
                    <div className={`rounded-full flex items-center justify-center w-8 h-8 text-white ${activeStep === "businessDetails" ? "bg-saree-600" : "bg-gray-300"}`}>
                      2
                    </div>
                    <span className="text-xs mt-1">Business Details</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            {activeStep === "basicInfo" ? (
              <Form {...basicInfoForm}>
                <form onSubmit={basicInfoForm.handleSubmit(onBasicInfoSubmit)} className="space-y-4">
                  <FormField
                    control={basicInfoForm.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="Your store name" 
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
                    control={basicInfoForm.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="Retail / Wholesale / Manufacturer" 
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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
                    control={basicInfoForm.control}
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

                  <div className="pt-4 flex justify-end">
                    <Button type="submit" className="w-1/3">
                      Next
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <Form {...businessDetailsForm}>
                <form onSubmit={businessDetailsForm.handleSubmit(onBusinessDetailsSubmit)} className="space-y-4">
                  <FormField
                    control={businessDetailsForm.control}
                    name="businessAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="Your complete business address" 
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={businessDetailsForm.control}
                      name="gstNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST Number (Optional)</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Your GST number" 
                                {...field} 
                                className="pl-10" 
                              />
                            </FormControl>
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={businessDetailsForm.control}
                      name="panNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PAN Number</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Your PAN number" 
                                {...field} 
                                className="pl-10" 
                              />
                            </FormControl>
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormDescription className="text-sm">
                    Bank Details for Payments
                  </FormDescription>
                  
                  <FormField
                    control={businessDetailsForm.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="Your bank name" 
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={businessDetailsForm.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Your account number" 
                                {...field} 
                                className="pl-10" 
                              />
                            </FormControl>
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={businessDetailsForm.control}
                      name="ifscCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IFSC Code</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Your IFSC code" 
                                {...field} 
                                className="pl-10" 
                              />
                            </FormControl>
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={businessDetailsForm.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0 mt-6">
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

                  <div className="pt-4 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-1/3"
                      onClick={() => setActiveStep("basicInfo")}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-1/3">
                      Create Account
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            Already have a seller account?{" "}
            <Link 
              to="/seller/login" 
              className="font-medium text-saree-600 hover:text-saree-800 transition-colors"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SellerSignup;
