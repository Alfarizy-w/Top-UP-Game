import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Copy, MessageSquare, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PAYMENT_METHODS } from "@/lib/constants";
import type { Order, Game, Package } from "@shared/schema";

export default function Checkout() {
  const { orderId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
    enabled: !!orderId,
  });

  const { data: game } = useQuery<Game>({
    queryKey: ["/api/games", order?.gameId],
    enabled: !!order?.gameId,
  });

  const { data: selectedPackage } = useQuery<Package>({
    queryKey: ["/api/packages", order?.packageId],
    enabled: !!order?.packageId,
  });

  const getPaymentMethodName = (paymentMethod: string) => {
    const method = PAYMENT_METHODS.find(m => m.id === paymentMethod);
    return method?.name || paymentMethod;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Payment details copied successfully",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleTrackOrder = () => {
    setLocation(`/order-status?orderId=${order?.orderId}`);
  };

  const handleContactSupport = () => {
    const message = encodeURIComponent(`Hello! I need help with order ${order?.orderId}`);
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
            <p className="text-gray-600">The order you're looking for doesn't exist.</p>
            <Button onClick={() => setLocation('/')} className="mt-4">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-bold text-3xl text-gray-800 mb-2 font-['Poppins']">Order Confirmed!</h1>
            <p className="text-gray-600">Your order has been successfully placed</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Order Details</h3>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Processing
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold">#{order.orderId}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(order.orderId)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
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
                  <span className="text-gray-600">Payment:</span>
                  <span>{getPaymentMethodName(order.paymentMethod)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h4 className="font-semibold text-blue-800 mb-3">Payment Instructions</h4>
              <div className="space-y-2 text-blue-700">
                {order.paymentMethod === 'bank_transfer' && (
                  <>
                    <p className="font-semibold">Bank Transfer Details:</p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between">
                        <span>Bank:</span>
                        <span className="font-semibold">Bank Mandiri</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Account:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">123-456-789-0</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard('1234567890')}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span className="font-semibold">TopZoneID</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{formatPrice(order.totalAmount)}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(order.totalAmount.toString())}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {order.paymentMethod === 'qris' && (
                  <>
                    <p className="font-semibold">QRIS Payment:</p>
                    <p>Scan the QR code with your banking app or e-wallet</p>
                    <p>Amount: <span className="font-semibold">{formatPrice(order.totalAmount)}</span></p>
                  </>
                )}
                {(order.paymentMethod === 'dana' || order.paymentMethod === 'ovo') && (
                  <>
                    <p className="font-semibold">{getPaymentMethodName(order.paymentMethod)} Payment:</p>
                    <p>You will receive a payment notification in your {getPaymentMethodName(order.paymentMethod)} app</p>
                    <p>Amount: <span className="font-semibold">{formatPrice(order.totalAmount)}</span></p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={handleTrackOrder} className="py-6">
              <Search className="w-4 h-4 mr-2" />
              Track Order
            </Button>
            <Button variant="outline" onClick={handleContactSupport} className="py-6">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
