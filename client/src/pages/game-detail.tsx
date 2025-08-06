import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { Game, Package } from "@shared/schema";

export default function GameDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const { toast } = useToast();

  const { data: game, isLoading: gameLoading } = useQuery<Game>({
    queryKey: ["/api/games", slug],
    enabled: !!slug,
  });

  const { data: packages, isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ["/api/games", game?.id, "packages"],
    enabled: !!game?.id,
  });

  useEffect(() => {
    // Auto-select most popular package
    if (packages && packages.length > 0 && !selectedPackage) {
      const popularPackage = packages.find(pkg => pkg.isPopular === 1) || packages[0];
      setSelectedPackage(popularPackage.id);
    }
  }, [packages, selectedPackage]);

  const handleBuyNow = () => {
    if (!selectedPackage) {
      toast({
        title: "Please select a package",
        description: "Choose a package before proceeding to order",
        variant: "destructive",
      });
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('userId') || '';
    const serverId = searchParams.get('serverId') || '';
    
    setLocation(`/order?gameId=${game?.id}&packageId=${selectedPackage}&userId=${userId}&serverId=${serverId}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (gameLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="w-full h-64 rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="space-y-3 mt-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Game Not Found</h1>
        <p className="text-gray-600">The game you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img 
                src={game.imageUrl} 
                alt={`${game.name} Top-Up`} 
                className="w-full rounded-xl shadow-soft"
              />
            </div>
            
            <div>
              <h1 className="font-bold text-3xl text-gray-800 mb-4 font-['Poppins']">
                {game.name} {game.currency}
              </h1>
              <p className="text-gray-600 mb-6">{game.description}</p>
              
              {/* Package Selection */}
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Select Package</h3>
                
                {packagesLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : (
                  packages?.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`cursor-pointer smooth-transition ${
                        selectedPackage === pkg.id
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-primary"
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div>
                              <span className="font-semibold text-lg">{pkg.name}</span>
                              {pkg.isPopular === 1 && (
                                <Badge className="ml-2 bg-green-100 text-green-800">
                                  Most Popular!
                                </Badge>
                              )}
                            </div>
                          </div>
                          <span className="font-bold text-primary text-xl">
                            {formatPrice(pkg.price)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              <Button 
                className="w-full py-6 text-lg font-semibold" 
                onClick={handleBuyNow}
                disabled={!selectedPackage}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
