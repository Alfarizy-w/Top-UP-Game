import { Link } from "wouter";
import { Gamepad2, Mail, Phone, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl font-['Poppins']">TopZoneID</span>
            </div>
            <p className="text-gray-300 mb-4">
              Indonesia's most trusted gaming top-up platform. Fast, secure, and reliable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Poppins']">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-primary smooth-transition">Home</Link></li>
              <li><Link href="/#games" className="text-gray-300 hover:text-primary smooth-transition">Games</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-primary smooth-transition">About Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-primary smooth-transition">FAQ</Link></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary smooth-transition">Contact</a></li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Poppins']">Popular Games</h4>
            <ul className="space-y-2">
              <li><Link href="/game/mobile-legends" className="text-gray-300 hover:text-primary smooth-transition">Mobile Legends</Link></li>
              <li><Link href="/game/free-fire" className="text-gray-300 hover:text-primary smooth-transition">Free Fire</Link></li>
              <li><Link href="/game/pubg-mobile" className="text-gray-300 hover:text-primary smooth-transition">PUBG Mobile</Link></li>
              <li><Link href="/game/genshin-impact" className="text-gray-300 hover:text-primary smooth-transition">Genshin Impact</Link></li>
              <li><a href="#games" className="text-gray-300 hover:text-primary smooth-transition">View All Games</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Poppins']">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="text-primary mr-3 w-5 h-5" />
                <span className="text-gray-300">support@topzoneid.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-primary mr-3 w-5 h-5" />
                <span className="text-gray-300">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-primary mr-3 w-5 h-5" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0">
              © 2024 TopZoneID. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition text-sm">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-primary smooth-transition text-sm">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}