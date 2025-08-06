import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Headphones, Users, Award, Clock } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average delivery time under 5 minutes",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Bank-level security for all transactions",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help when you need us",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Award, value: "99.9%", label: "Success Rate" },
    { icon: Clock, value: "< 5 min", label: "Average Delivery" },
    { icon: Shield, value: "100%", label: "Secure Payments" },
  ];

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-6 font-['Poppins']">
            About TopZoneID
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            TopZoneID is Indonesia's leading game top-up platform, serving over 50,000 happy gamers since 2020. 
            We're committed to providing fast, secure, and affordable gaming credit top-ups for all your favorite games.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2 font-['Poppins']">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gray-50">
            <CardContent className="p-8 text-center">
              <h3 className="font-semibold text-2xl mb-4 font-['Poppins']">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To make gaming more accessible and enjoyable for everyone by providing the most reliable, 
                fastest, and most affordable top-up service in Indonesia. We believe that every gamer 
                deserves a seamless experience when purchasing in-game credits.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center shadow-soft">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-bold text-2xl lg:text-3xl text-primary mb-2 font-['Poppins']">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-bold text-2xl lg:text-3xl text-gray-800 mb-8 text-center font-['Poppins']">
            Why Choose TopZoneID?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3 font-['Poppins']">Instant Delivery</h4>
                <p className="text-gray-600">
                  Our automated system ensures that your gaming credits are delivered within minutes of payment confirmation. 
                  No waiting, no delays - just instant gaming enjoyment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3 font-['Poppins']">Competitive Prices</h4>
                <p className="text-gray-600">
                  We offer the most competitive prices in the market without compromising on service quality. 
                  Get more value for your money with our special deals and promotions.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3 font-['Poppins']">Wide Game Selection</h4>
                <p className="text-gray-600">
                  From Mobile Legends to PUBG Mobile, Free Fire to Genshin Impact - we support all the popular games 
                  that Indonesian gamers love to play.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3 font-['Poppins']">Trusted & Reliable</h4>
                <p className="text-gray-600">
                  With over 50,000 satisfied customers and a 99.9% success rate, TopZoneID has earned the trust 
                  of gamers across Indonesia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-primary text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="font-bold text-2xl mb-4 font-['Poppins']">Ready to Start Gaming?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of satisfied gamers who trust TopZoneID for their gaming needs
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => window.location.href = '/'}
              >
                Start Top-Up Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
