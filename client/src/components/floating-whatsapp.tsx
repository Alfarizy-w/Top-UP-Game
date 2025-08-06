import { MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I need help with TopZoneID.");
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="floating-whatsapp bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 smooth-transition"
      aria-label="Contact WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}