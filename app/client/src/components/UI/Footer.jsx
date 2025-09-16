import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Column 1: Brand Info and Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-2xl font-bold mb-2 text-blue-400">SafVoy</h4>
          <p className="text-sm text-gray-300 mb-4 max-w-xs">
            Empowering tourists and protecting communities through innovative, privacy-first technology.
          </p>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-bold mb-4 text-gray-200">Quick Links</h5>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Home</a>
            <a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">About Us</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Features</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Blog</a>
          </nav>
        </div>

        {/* Column 3: Support & Legal */}
        <div className="text-center md:text-left">
          <h5 className="text-lg font-bold mb-4 text-gray-200">Support</h5>
          <nav className="flex flex-col space-y-2 mb-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Contact</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">FAQ</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Support Center</a>
          </nav>
          <h5 className="text-lg font-bold mb-4 text-gray-200">Legal</h5>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
          </nav>
        </div>

        {/* Column 4: Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h5 className="text-lg font-bold mb-4 text-gray-200">Connect with Us</h5>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Facebook">
              <Facebook size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
