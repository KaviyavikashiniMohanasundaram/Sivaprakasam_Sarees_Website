
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Package, FileText, Download, Trash2, Plus } from 'lucide-react';
import * as XLSX from 'xlsx';

import PageLayout from '@/components/layout/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define schema for bulk order item
const orderItemSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  productCode: z.string().optional(),
  quantity: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    { message: 'Quantity must be a positive number' }
  ),
});

// Define schema for entire bulk order form
const bulkOrderSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Delivery address is required'),
  items: z.array(orderItemSchema).min(1, 'Add at least one product'),
  additionalNotes: z.string().optional(),
});

type OrderItem = z.infer<typeof orderItemSchema>;
type BulkOrderFormValues = z.infer<typeof bulkOrderSchema>;

const BulkPurchase = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { productName: '', productCode: '', quantity: '1' },
  ]);

  const form = useForm<BulkOrderFormValues>({
    resolver: zodResolver(bulkOrderSchema),
    defaultValues: {
      company: '',
      contactName: '',
      email: '',
      phone: '',
      address: '',
      items: orderItems,
      additionalNotes: '',
    },
  });

  const addItem = () => {
    const newItems = [...orderItems, { productName: '', productCode: '', quantity: '1' }];
    setOrderItems(newItems);
    form.setValue('items', newItems);
  };

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      const newItems = [...orderItems];
      newItems.splice(index, 1);
      setOrderItems(newItems);
      form.setValue('items', newItems);
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You need at least one product',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = (data: BulkOrderFormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: 'Order Submitted',
      description: 'Your bulk order has been received. We will contact you shortly.',
    });
    // In a real app, you would send this data to your backend
  };

  const exportToExcel = () => {
    const formData = form.getValues();
    if (!formData.items?.length || !formData.items[0].productName) {
      toast({
        title: 'Cannot export',
        description: 'Please add at least one product with a name',
        variant: 'destructive',
      });
      return;
    }

    // Create worksheet with order data
    const ws = XLSX.utils.json_to_sheet(
      formData.items.map((item, index) => ({
        'No.': index + 1,
        'Product Name': item.productName,
        'Product Code': item.productCode || 'N/A',
        'Quantity': item.quantity,
      }))
    );

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bulk Order');

    // Generate file and trigger download
    XLSX.writeFile(wb, 'Sivaprakasam_Sarees_Bulk_Order.xlsx');

    toast({
      title: 'Export Successful',
      description: 'Your order list has been exported to Excel',
    });
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-center mb-8 text-saree-700">
            Bulk Purchase & Export
          </h1>
          
          <Alert className="mb-8 bg-saree-50 border-saree-200">
            <Package className="h-5 w-5" />
            <AlertTitle className="font-playfair text-saree-800">Special Discounts for Bulk Orders</AlertTitle>
            <AlertDescription>
              Enjoy special wholesale pricing for bulk purchases. Orders over 20 pieces receive 15% discount, 
              and orders over 50 pieces receive 25% discount.
            </AlertDescription>
          </Alert>
          
          <Card className="shadow-lg animate-fade-in">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl font-playfair text-saree-700">Bulk Order Form</CardTitle>
              <CardDescription>
                Fill out this form to place a wholesale order or request a quote for bulk purchases
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company/Business Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input type="email" placeholder="email@example.com" {...field} />
                          </FormControl>
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
                          <FormControl>
                            <Input type="tel" placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Full shipping address"
                            className="min-h-[80px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-lg">Products</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addItem}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" /> Add Product
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {orderItems.map((_, index) => (
                        <div 
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-md border"
                        >
                          <div className="md:col-span-5">
                            <FormField
                              control={form.control}
                              name={`items.${index}.productName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Silk Saree"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const updatedItems = [...orderItems];
                                        updatedItems[index].productName = e.target.value;
                                        setOrderItems(updatedItems);
                                      }} 
                                      value={field.value}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="md:col-span-4">
                            <FormField
                              control={form.control}
                              name={`items.${index}.productCode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Product Code (Optional)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="SKU or Code"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const updatedItems = [...orderItems];
                                        updatedItems[index].productCode = e.target.value;
                                        setOrderItems(updatedItems);
                                      }} 
                                      value={field.value || ''}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="number"
                                      min="1"
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const updatedItems = [...orderItems];
                                        updatedItems[index].quantity = e.target.value;
                                        setOrderItems(updatedItems);
                                      }} 
                                      value={field.value}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="md:col-span-1 flex items-end justify-center pb-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(index)}
                              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special requirements or instructions"
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={exportToExcel}
                    >
                      <Download className="h-4 w-4" />
                      Export to Excel
                    </Button>
                    
                    <Button type="submit" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" /> Submit Bulk Order
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-playfair font-semibold mb-4 text-saree-700">
              Need Custom Wholesale Options?
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              For special requirements, custom designs, or to discuss specific bulk order arrangements,
              please contact our wholesale team directly.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="bg-white shadow-md rounded-md px-6 py-4 border border-saree-100">
                <p className="font-medium text-saree-700">V. Siddhanathan</p>
                <p className="text-saree-600">+91 9003330044</p>
              </div>
              <div className="bg-white shadow-md rounded-md px-6 py-4 border border-saree-100">
                <p className="font-medium text-saree-700">V. Swaminathan</p>
                <p className="text-saree-600">+91 9944424063</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BulkPurchase;
