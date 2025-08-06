import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Order, Game, Package } from "@shared/schema";

export default function OrderStatus() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");
  const { toast } = useToast();

  // Get order ID from URL if present
  const searchParams = new URLSearchParams(window.location.search);
  const urlOrderId = searchParams.get('orderId');

  // Use URL order ID if available, otherwise use searched order ID
  const currentOrderId = urlOrderId || searchOrderId;

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ["/api/orders", currentOrderId],
    enabled: !!currentOrderId,
  });

  const { data: game } = useQuery<Game>({
    queryKey: ["/api/games", order?.gameId],
    enabled: !!order?.gameId,
  });

  const { data: selectedPackage } = useQuery<Package>({
    queryKey: ["/api/packages", order?.packageId],
    enabled: !!order?.packageId,
  });

  const handleSearch = () => {
    if (!orderIdInput.trim()) {
      toast({
        title: "Please enter an Order ID",
        description: "Order ID is required to check status",
        variant: "destructive",
      });
      return;
    }

    setSearchOrderId(orderIdInput.trim());
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
        };
      case 'processing':
        return {
          label: 'Processing',
          color: 'bg-blue-100 text-blue-800',
          icon: Clock,
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle,
        };
      case 'failed':
        return {
          label: 'Failed',
          color: 'bg-red-100 text-red-800',
          icon: AlertCircle,
        };
      default:
        return {
          label: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
          icon: AlertCircle,
        };
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 lg:p-8">
              <h1 className="font-bold text-2xl text-gray-800 mb-2 font-['Poppins']">Check Order Status</h1>
              <p className="text-gray-600 mb-6">Enter your order ID to check the current status</p>

              <div className="flex gap-4 mb-8">
                <Input
                  type="text"
                  placeholder="Enter Order ID (e.g., TZ123456789)"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  <Search className="w-4 h-4 mr-2" />
                  {isLoading ? "Checking..." : "Check Status"}
                </Button>
              </div>

              {/* Order Status Result */}
              {error && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-red-800">Order not found. Please check your Order ID.</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {order && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg">Order #{order.orderId}</h4>
                      <Badge className={getStatusInfo(order.status).color}>
                        {getStatusInfo(order.status).label}
                      </Badge>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Game:</span>
                        <span>{game?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span>{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">User ID:</span>
                        <span>{order.userId}</span>
                      </div>
                      {order.serverId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Server ID:</span>
                          <span>{order.serverId}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold">{formatPrice(order.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="space-y-4">
                      <h5 className="font-semibold text-gray-800">Order Progress</h5>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-green-500 rounded-full mr-4"></div>
                          <div>
                            <p className="font-medium">Order Placed</p>
                            <p className="text-gray-600 text-sm">{formatDate(order.createdAt)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-4 ${
                            ['processing', 'completed'].includes(order.status) 
                              ? 'bg-green-500' 
                              : 'bg-gray-300'
                          }`}></div>
                          <div>
                            <p className="font-medium">Payment Confirmed</p>
                            <p className="text-gray-600 text-sm">
                              {['processing', 'completed'].includes(order.status) 
                                ? formatDate(order.updatedAt)
                                : 'Waiting for payment...'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-4 ${
                            order.status === 'processing' 
                              ? 'bg-yellow-500' 
                              : order.status === 'completed'
                              ? 'bg-green-500'
                              : 'bg-gray-300'
                          }`}></div>
                          <div>
                            <p className="font-medium">Processing Order</p>
                            <p className="text-gray-600 text-sm">
                              {order.status === 'processing' 
                                ? 'In progress...'
                                : order.status === 'completed'
                                ? formatDate(order.updatedAt)
                                : 'Pending...'}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`flex items-center ${order.status !== 'completed' ? 'opacity-50' : ''}`}>
                          <div className={`w-4 h-4 rounded-full mr-4 ${
                            order.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <div>
                            <p className="font-medium">Completed</p>
                            <p className="text-gray-600 text-sm">
                              {order.status === 'completed' 
                                ? formatDate(order.updatedAt)
                                : 'Pending...'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.status === 'processing' && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 font-medium">Estimated completion: 5-10 minutes</p>
                        <p className="text-blue-700 text-sm mt-1">
                          We'll send you a notification once your order is complete.
                        </p>
                      </div>
                    )}

                    {order.status === 'completed' && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <p className="text-green-800 font-medium">Order completed successfully!</p>
                        <p className="text-green-700 text-sm mt-1">
                          Your {selectedPackage?.name} has been delivered to your game account.
                        </p>
                      </div>
                    )}

                    {order.status === 'failed' && (
                      <div className="mt-6 p-4 bg-red-50 rounded-lg">
                        <p className="text-red-800 font-medium">Order failed</p>
                        <p className="text-red-700 text-sm mt-1">
                          Please contact our support team for assistance.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
