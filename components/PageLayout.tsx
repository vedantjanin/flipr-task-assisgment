import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-brand-blue flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-orange rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white font-bold">Z</span>
              ZenithHomes
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-orange transition font-medium">Home</Link>
            <a href="#services" className="text-gray-700 hover:text-brand-orange transition font-medium">Services</a>
            <a href="#projects" className="text-gray-700 hover:text-brand-orange transition font-medium">Projects</a>
            <a href="#testimonials" className="text-gray-700 hover:text-brand-orange transition font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-brand-orange transition font-medium">Contact</a>
            <Link 
              to="/admin" 
              className="px-4 py-2 rounded-full bg-brand-blue text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-orange focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50">Home</Link>
            <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50">Projects</a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-orange hover:bg-gray-50">Contact</a>
            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-brand-blue font-bold hover:bg-gray-50">Admin Panel</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-blue text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
               <span className="w-8 h-8 bg-brand-orange rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white text-sm font-bold">Z</span>
               ZenithHomes
            </h3>
            <p className="text-gray-400 max-w-xs">
              Providing top-tier real estate consultation, design, and marketing services to help you find or build your dream space.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-brand-orange transition">Home</Link></li>
              <li><a href="#services" className="hover:text-brand-orange transition">Services</a></li>
              <li><a href="#projects" className="hover:text-brand-orange transition">Projects</a></li>
              <li><a href="#contact" className="hover:text-brand-orange transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 ZenithHomes. All rights reserved.</p>
          <p className="text-gray-600 text-xs mt-2 md:mt-0">Designed for You</p>
        </div>
      </div>
    </footer>
  );
};