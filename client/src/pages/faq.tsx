import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MessageSquare, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Faq } from "@shared/schema";

export default function FAQ() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const { data: faqs, isLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleContactSupport = () => {
    const message = encodeURIComponent("Hello! I have a question about TopZoneID.");
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-bold text-3xl lg:text-4xl text-gray-800 mb-4 font-['Poppins']">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">Find answers to common questions about our service</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {faqs?.map((faq) => (
                <Card key={faq.id} className="shadow-soft">
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 smooth-transition rounded-xl"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="font-semibold text-gray-800 text-left">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </Button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <Card className="mt-12 bg-primary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-bold text-2xl mb-4 font-['Poppins']">Still Have Questions?</h3>
              <p className="text-blue-100 mb-6">
                Our support team is available 24/7 to help you with any questions or issues
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  onClick={handleContactSupport}
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
