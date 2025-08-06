import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertOrderSchema } from "@shared/schema";
import { PAYMENT_METHODS } from "@/lib/constants";
import type { Game, Package } from "@shared/schema";
import { z } from "zod";

const orderFormSchema = insertOrderSchema.extend({
  whatsappNumber: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export default function Order() {
  const [, setLocation] = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const { toast } = useToast();

  // Get URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const gameId = searchParams.get('gameId') || '';
  const packageId = searchParams.get('packageId') || '';
  const urlUserId = searchParams.get('userId') || '';
  const urlServerId = searchParams.get('serverId') || '';

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      gameId,
      packageId,
      userId: urlUserId,
      serverId: urlServerId,
      paymentMethod: '',
      totalAmount: 0,
      whatsappNumber: '',
    },
  });

  const { data: game } = useQuery<Game>({
    queryKey: ["/api/games", gameId],
    enabled: !!gameId,
  });

  const { data: selectedPackage } = useQuery<Package>({
    queryKey: ["/api/packages", packageId],
    enabled: !!packageId,
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: OrderFormData) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order created successfully!",
        description: `Order ID: ${order.orderId}`,
      });
      setLocation(`/checkout/${order.orderId}`);
    },
    onError: (error) => {
      toast({
        title: "Error creating order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (selectedPackage) {
      form.setValue('totalAmount', selectedPackage.price);
    }
  }, [selectedPackage, form]);

  const onSubmit = (data: OrderFormData) => {
    if (!selectedPayment) {
      toast({
        title: "Please select a payment method",
        description: "Choose how you want to pay for your order",
        variant: "destructive",
      });
      return;
    }

    createOrderMutation.mutate({
      ...data,
      paymentMethod: selectedPayment,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!gameId || !packageId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Order</h1>
        <p className="text-gray-600">Please select a game and package first.</p>
        <Button onClick={() => setLocation('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 lg:p-8">
              <h1 className="font-bold text-2xl text-gray-800 mb-2 font-['Poppins']">Complete Your Order</h1>
              <p className="text-gray-600 mb-8">Fill in the details below to complete your purchase</p>

              {/* Progress Indicator */}
              <div className="flex items-center mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <span className="ml-2 text-primary font-medium">Details</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm">2</div>
                  <span className="ml-2 text-gray-500">Payment</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm">3</div>
                  <span className="ml-2 text-gray-500">Complete</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Game Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Selected Game & Package</h3>
                    <div className="space-y-1">
                      <p><span className="text-gray-600">Game:</span> {game?.name}</p>
                      <p><span className="text-gray-600">Package:</span> {selectedPackage?.name}</p>
                      <p><span className="text-gray-600">Price:</span> {selectedPackage && formatPrice(selectedPackage.price)}</p>
                    </div>
                  </div>

                  {/* User ID and Server */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User ID *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your User ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="serverId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Server ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Server ID" {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label className="text-gray-700 font-medium mb-3 block">Payment Method</Label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {PAYMENT_METHODS.map((method) => (
                        <Card
                          key={method.id}
                          className={`cursor-pointer smooth-transition ${
                            selectedPayment === method.id
                              ? "border-primary bg-blue-50"
                              : "border-gray-200 hover:border-primary"
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <CardContent className="p-3 text-center">
                            <div className="text-2xl mb-2">{method.icon}</div>
                            <p className="text-sm font-medium">{method.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+62 812-3456-7890" {...field} />
                        </FormControl>
                        <p className="text-gray-500 text-sm">We'll send you order updates via WhatsApp</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{selectedPackage?.name} - {game?.name}</span>
                        <span>{selectedPackage && formatPrice(selectedPackage.price)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Processing Fee</span>
                        <span>Free</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{selectedPackage && formatPrice(selectedPackage.price)}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-semibold"
                    disabled={createOrderMutation.isPending}
                  >
                    {createOrderMutation.isPending ? "Creating Order..." : "Proceed to Payment"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
