
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-prepace-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and short description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">PrepAce Academy</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Helping students ace their tests with comprehensive prep materials and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-white">Courses</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white">Log In</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white">Sign Up</Link></li>
            </ul>
          </div>

          {/* Test Prep */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Test Prep</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">SAT Prep</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">ACT Prep</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">AP Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">PSAT Prep</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">GRE Prep</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-gray-300">support@prepace.com</span>
              </li>
              <li className="text-gray-300">
                123 Education Ave<br />
                Learning City, ED 54321<br />
                United States
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PrepAce Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 text-sm hover:text-white">Terms of Service</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
