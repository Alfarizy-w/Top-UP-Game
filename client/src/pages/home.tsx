import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import GameCard from "@/components/game-card";
import TestimonialCard from "@/components/testimonial-card";
import { Zap, Shield, Headphones, Check } from "lucide-react";
import type { Game, Testimonial } from "@shared/schema";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedGame, setSelectedGame] = useState("");
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");

  const { data: games, isLoading: gamesLoading } = useQuery<Game[]>({
    queryKey: ["/api/games"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const handleQuickTopup = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGame && userId) {
      const game = games?.find(g => g.id === selectedGame);
      if (game) {
        setLocation(`/game/${game.slug}?userId=${userId}&serverId=${serverId}`);
      }
    }
  };

  const stats = [
    { icon: "50K+", label: "Happy Customers" },
    { icon: "99.9%", label: "Success Rate" },
    { icon: "24/7", label: "Support" },
    { icon: "< 5 min", label: "Delivery Time" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-bold text-4xl lg:text-6xl mb-6 font-['Poppins']">
                Top-Up Games <span className="text-yellow-300">Instantly</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                Fast, secure, and reliable game credit top-up for all your favorite games
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Instant Delivery
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  24/7 Support
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Best Prices
                </span>
              </div>
            </div>

            {/* Quick Top-Up Form */}
            <Card className="bg-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-2xl text-gray-800 mb-6 font-['Poppins']">Quick Top-Up</h3>
                <form onSubmit={handleQuickTopup} className="space-y-4">
                  <div>
                    <Label className="text-gray-700 font-medium">Select Game</Label>
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your game..." />
                      </SelectTrigger>
                      <SelectContent>
                        {games?.map((game) => (
                          <SelectItem key={game.id} value={game.id}>
                            {game.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 font-medium">User ID</Label>
                      <Input
                        type="text"
                        placeholder="Enter User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 font-medium">Server ID</Label>
                      <Input
                        type="text"
                        placeholder="Server ID"
                        value={serverId}
                        onChange={(e) => setServerId(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full py-6 text-lg font-semibold" disabled={!selectedGame || !userId}>
                    Top-Up Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Game Catalog */}
      <section id="games" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-4 font-['Poppins']">Popular Games</h2>
            <p className="text-gray-600 text-lg">Choose from our wide selection of popular games</p>
          </div>

          {gamesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {games?.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-4 font-['Poppins']">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Trusted by thousands of gamers across Indonesia</p>
          </div>

          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials?.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-bold text-3xl lg:text-4xl text-primary mb-2 font-['Poppins']">{stat.icon}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2 font-['Poppins']">Lightning Fast</h3>
              <p className="text-gray-600">Average delivery time under 5 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2 font-['Poppins']">100% Secure</h3>
              <p className="text-gray-600">Bank-level security for all transactions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2 font-['Poppins']">24/7 Support</h3>
              <p className="text-gray-600">Always here to help when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-3xl lg:text-4xl mb-4 font-['Poppins']">Need Help?</h2>
          <p className="text-xl mb-8 opacity-90">Our support team is available 24/7 to assist you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
