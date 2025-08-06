import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-soft">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
          {getInitial(testimonial.customerName)}
        </div>
        <div className="ml-3">
          <h4 className="font-semibold">{testimonial.customerName}</h4>
          <div className="flex text-yellow-400">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{testimonial.comment}</p>
    </div>
  );
}